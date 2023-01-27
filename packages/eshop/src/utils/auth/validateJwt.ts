// import jwt from "jose";

export const validateJwt = async (token: string) => {
  // TODO: cryptographically validate the JWT using jwt keychain
  //   try {
  //     const decoded = await jwt.jwtVerify(token, );
  //     return decoded;
  //   } catch (err) {
  //     return null;
  //   }

  return !!token;
};
