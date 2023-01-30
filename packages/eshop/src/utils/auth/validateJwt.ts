import jose from "jose";

export const validateJwt = async (token?: string) => {
  // TODO: cryptographically validate the JWT using jwt keychain
  if (token === null) {
    return false;
  }

  const JWKS = jose.createRemoteJWKSet(new URL('https://audiobooks-dev.eu.auth0.com/.well-known/jwks.json'));

  const { payload, protectedHeader } = await jose.jwtVerify(token as string, JWKS, {
    issuer: 'https://audiobooks-dev.eu.auth0.com/',
    audience: 'Jdr2hHjLKjN2as1BceKk5Y8UOqseFD4l',
  })

  console.log(protectedHeader)
  console.log(payload)
  
  return !!token;
};
