use anyhow::{bail, Result};
use jsonwebtoken::jwk::AlgorithmParameters;
use jsonwebtoken::{decode, decode_header, jwk, Algorithm, DecodingKey, Validation};
use serde::{Deserialize, Serialize};

use tonic::metadata::MetadataMap;

const JWKS: &str = r#"
{"keys":[{"alg":"RS256","kty":"RSA","use":"sig","n":"ulgjCKAgzh8yu8QLiIJ9-9Y3aRptzbq3N6a8RBajK9ST-HsemQGlzSQcSVRKeVOUkQoxbSEgafyPNayKcmK0Ct8Vo_W2GbLB35m_gO46u1buP_AeockCC1C-4-T38SbOB4oeHWjyz4EKPAA1pjg9CXKX2Jvy_x20DxBeU4FAcCEQjaSBqQ2pNlzpDxuvu_CMbNK0YyDhd6-MIY1sqccL22zdQUeynjEsk1HFh3yX6XB2dT8TqVj8yoyfG8KhC6OTMxRTLB0jZOeiH9kRN49UZGCDSvz7J77E2v9SH7btb9K6j_va_eTV_vLuFrCu-sRFg-_HCGVWyaI-LI4st6kg3w","e":"AQAB","kid":"QES8Rd-0P1sorPHWMEEMr","x5t":"pu4VoMRL8IArb772EG7vT5ptNkk","x5c":["MIIDETCCAfmgAwIBAgIJLOwRkTJGxFl9MA0GCSqGSIb3DQEBCwUAMCYxJDAiBgNVBAMTG2F1ZGlvYm9va3MtZGV2LmV1LmF1dGgwLmNvbTAeFw0yMzAxMjcwODA4NDdaFw0zNjEwMDUwODA4NDdaMCYxJDAiBgNVBAMTG2F1ZGlvYm9va3MtZGV2LmV1LmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALpYIwigIM4fMrvEC4iCffvWN2kabc26tzemvEQWoyvUk/h7HpkBpc0kHElUSnlTlJEKMW0hIGn8jzWsinJitArfFaP1thmywd+Zv4DuOrtW7j/wHqHJAgtQvuPk9/EmzgeKHh1o8s+BCjwANaY4PQlyl9ib8v8dtA8QXlOBQHAhEI2kgakNqTZc6Q8br7vwjGzStGMg4XevjCGNbKnHC9ts3UFHsp4xLJNRxYd8l+lwdnU/E6lY/MqMnxvCoQujkzMUUywdI2Tnoh/ZETePVGRgg0r8+ye+xNr/Uh+27W/Suo/72v3k1f7y7hawrvrERYPvxwhlVsmiPiyOLLepIN8CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUSe8EO9VLcWXGpxBu8fV1WIAiBOwwDgYDVR0PAQH/BAQDAgKEMA0GCSqGSIb3DQEBCwUAA4IBAQBK5Co5YQ5ZBsT3thivJGonQH/91VnGC2fVETiwg4jQbmHG38XtsxONPvStQgGmByV6wdJeEskhQEnapSPLIdswN1YbDIDKFANPznbvcCx0u0DTgS9JF00QxssJhe2DJbr9tG9iuOZ56xTiyUvCdB1Vd34BxsJpit33W4mCbQmpj5h35DMA3diOXjAjYe1nYvYHoWNhnb4AYD1JV1bciZQRx3Dzpm/fNJ2aYGxPTJdULCa+V2gvbOvxzNTme5zIyls1MRovlWQpImae8ul4aPUNGMsSYvRfmfEolXbNgSxPkHoJDf/IvbS4pwyIOlZFt50Em04AHe76hDo/WB+h4IdD"]},{"alg":"RS256","kty":"RSA","use":"sig","n":"v9Lh7aC30MSNC5vqnQTR-uCUS4k_N8bp0V2d4psE1wxt5t5SfW6FsRy1s4hTjgAKqhfr0F9nfrHOFNn9_wKT5l8EBG5_1lm5MfRSRRqj55Apk0Bbctjev8u27vtygQKXuKJnRAjObS76yPiLqBhIABqOiA5WLAMykK78I1ApEwxlvawi4W9M-UPWwbnjtNklRDJn5hWd_9agOmpE0wWoNh1CFPUkq_iUdAdXC81jHjOfB2El2gslw8_YO9oiHjwPWzd7hfVF_onWVwjUniPBQiYL8ewIIOnyppdyGzSTxRaIFT11rsxvIKXUOGRX36Zgg5Gyj0SIJ8jMINCguhD4iw","e":"AQAB","kid":"_D_hcq1PeN6l6hJXUpCTf","x5t":"Vcz5bjBaXS6VwvEBvQUil-p8M7o","x5c":["MIIDETCCAfmgAwIBAgIJI7+oQcRmjBihMA0GCSqGSIb3DQEBCwUAMCYxJDAiBgNVBAMTG2F1ZGlvYm9va3MtZGV2LmV1LmF1dGgwLmNvbTAeFw0yMzAxMjcwODA4NDdaFw0zNjEwMDUwODA4NDdaMCYxJDAiBgNVBAMTG2F1ZGlvYm9va3MtZGV2LmV1LmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAL/S4e2gt9DEjQub6p0E0frglEuJPzfG6dFdneKbBNcMbebeUn1uhbEctbOIU44ACqoX69BfZ36xzhTZ/f8Ck+ZfBARuf9ZZuTH0UkUao+eQKZNAW3LY3r/Ltu77coECl7iiZ0QIzm0u+sj4i6gYSAAajogOViwDMpCu/CNQKRMMZb2sIuFvTPlD1sG547TZJUQyZ+YVnf/WoDpqRNMFqDYdQhT1JKv4lHQHVwvNYx4znwdhJdoLJcPP2DvaIh48D1s3e4X1Rf6J1lcI1J4jwUImC/HsCCDp8qaXchs0k8UWiBU9da7MbyCl1DhkV9+mYIORso9EiCfIzCDQoLoQ+IsCAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUXahkiFvJpaf5+MzST+7fwpviTUswDgYDVR0PAQH/BAQDAgKEMA0GCSqGSIb3DQEBCwUAA4IBAQC2o/Ll8E+aCGCpCvYsjSp51cTYGUsGXKrNoGXPtL3ArM2annTdQAbF5rQzV2jC5ef4cPRBzc7jz16qTX3+9XzWwXolAKIVLpnPOyXZ3Q2+gtm0Qxos4wEKuGNh+Od+X+BVF55VOC8pzrT7TB6CHB2zJJWjDLcGCQ/n2iRRp4OqZXNcKZNidwoJ6WnwGBgo5QQaK/8bZn67Y/9xnA6LkBubGGbZrmErwWfhtQQaGvP3Neb6BkNsDMzVGZvuLbkZ0ztsGKnl+Yx1nlPNQiwoS6CIOsearA/+7NiB4gW8gNjGWdP/XmoCiSaAiz/a+7qGXsh9RwcS6/6Tg1zYYdiaWj8u"]}]}
"#;

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
}

pub fn validate(metadata: &MetadataMap) -> Result<Claims> {
    let token: String = match metadata.get("authorization".to_string()) {
        None => bail!("Authorization not received."),
        Some(token) => match token.to_str()?.to_string().split_whitespace().last() {
            None => bail!("Error parsing authorization."),
            Some(token) => token.to_string(),
        },
    };

    let mut validation = Validation::new(Algorithm::RS256);
    validation.validate_exp = true;
    validation.set_issuer(&["https://audiobooks-dev.eu.auth0.com/"]);
    validation.set_audience(&["Jdr2hHjLKjN2as1BceKk5Y8UOqseFD4l"]);

    let header = decode_header(&token)?;
    let kid = match header.kid {
        Some(k) => k,
        None => bail!("Token doesn't have a `kid` header field"),
    };

    let jwks: jwk::JwkSet = serde_json::from_str(JWKS)?;

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
