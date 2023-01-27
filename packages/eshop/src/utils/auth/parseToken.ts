export type Auth0Token = {
  token: string;
  expires: string;
  type: string;
};

/**
 * Given a URL object from an url of this shape:
 *
 * `http://localhost:3000/auth/callback#access_token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9hdWRpb2Jvb2tzLWRldi5ldS5hdXRoMC5jb20vIn0..PIi1taAZ5WB_0qSn.FF_26A8ikbxWYrVfI8O-lE4kewyQBXnWME1TVrFMk23Mv9Tjf_UL8mLFaflIezLRZxeiB1EVAm8x5hQW9XADmVV9wm7z9fAj7rWt3NEggnfT9FDeBOskijRVm33GHJ4aWgYflj6orRQrF-l7gjcuI7B728lbIsLSXPa2r4QVqXUF-IRSvvK54QZwpq404dr5pyHGBFF28UOyc8iU4o3_1Nej_fJWFVs4zD0ZGWMEci8OOLvLNn6GCwmpZgv3UAJsypBxOejb9MVbiu0EMeKkFAI.Z1dYEvqkT-5VP-qUsKI0sA&expires_in=7200&token_type=Bearer`
 * @param url URL object
 * @returns parsed Auth0 token
 */
export const parseToken = (url: URL) => {
  const hash = url.hash;
  const params = new URLSearchParams(hash.slice(1));
  const token = params.get("access_token");
  const expires = params.get("expires_in");
  const type = params.get("token_type");
  return {
    token,
    expires,
    type,
  };
};
