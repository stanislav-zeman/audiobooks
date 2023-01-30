use anyhow::{bail, Result};
use jsonwebtoken::jwk::AlgorithmParameters;
use jsonwebtoken::{decode, decode_header, jwk, Algorithm, DecodingKey, Validation};
use serde::{Deserialize, Serialize};

use tonic::metadata::MetadataMap;

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub aud: String,
    pub sub: String,
    pub exp: usize,
    pub iat: usize,
    pub iss: String,
    pub sid: String,
    pub updated_at: String,
    pub name: String,
    pub picture: String,
    pub email: String,
    pub nickname: String,
    pub app_permissions: Vec<String>,
}

pub async fn validate(metadata: &MetadataMap) -> Result<Claims> {
    let token: String = match metadata.get("authorization".to_string()) {
        None => bail!("Authorization not received."),
        Some(token) => match token.to_str()?.to_string().split_whitespace().last() {
            None => bail!("Error parsing authorization."),
            Some(token) => token.to_string(),
        },
    };

    let jwks = reqwest::get("https://audiobooks-dev.eu.auth0.com/.well-known/jwks.json")
        .await?
        .text()
        .await?;

    let mut validation = Validation::new(Algorithm::RS256);
    validation.validate_exp = true;
    validation.set_issuer(&["https://audiobooks-dev.eu.auth0.com/"]);
    validation.set_audience(&["Jdr2hHjLKjN2as1BceKk5Y8UOqseFD4l"]);

    let header = decode_header(&token)?;
    let kid = match header.kid {
        Some(k) => k,
        None => bail!("Token doesn't have a `kid` header field"),
    };

    let jwks: jwk::JwkSet = serde_json::from_str(&jwks)?;

    if let Some(j) = jwks.find(&kid) {
        match &j.algorithm {
            AlgorithmParameters::RSA(rsa) => {
                let decoding_key = DecodingKey::from_rsa_components(&rsa.n, &rsa.e).unwrap();
                let mut validation = Validation::new(j.common.algorithm.unwrap());
                validation.validate_exp = true;
                validation.set_issuer(&["https://audiobooks-dev.eu.auth0.com/"]);
                validation.set_audience(&["Jdr2hHjLKjN2as1BceKk5Y8UOqseFD4l"]);
                let decoded_token = decode::<Claims>(&token, &decoding_key, &validation)?;
                Ok(decoded_token.claims)
            }
            _ => unreachable!("this should be a RSA"),
        }
    } else {
        bail!("No matching JWK found for the given kid");
    }
}
