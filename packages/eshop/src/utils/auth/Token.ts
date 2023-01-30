export type Token = {
  access_token: string;
  refresh_token: string;
  id_token: string;
  token_type: string;
  expires_in: number;
};

export type IdToken = {
  app_permissions: ("author")[];
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  iss: string;
  aud: string;
  iat: number;
  exp: number;
  sub: string;
  sid: string;
};
