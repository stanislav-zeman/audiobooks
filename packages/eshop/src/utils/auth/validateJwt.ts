import { createRemoteJWKSet, jwtVerify } from "jose";
const JWKS = createRemoteJWKSet(
  new URL("https://audiobooks-dev.eu.auth0.com/.well-known/jwks.json")
);

export const validateJwt = async (token?: string) => {
  if (token === null) {
    return false;
  }
  try {
    await jwtVerify(token as string, JWKS, {
      issuer: "https://audiobooks-dev.eu.auth0.com/",
      audience: "Jdr2hHjLKjN2as1BceKk5Y8UOqseFD4l",
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
