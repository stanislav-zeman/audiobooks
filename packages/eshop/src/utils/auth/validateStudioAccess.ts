import { decodeJwt } from "jose";
import type { IdToken } from "./Token";
import { validateJwt } from "./validateJwt";

export const validateStudioAccess = async (token: string | undefined) => {
    let isLoggedIn = false;
    let parsed: IdToken | undefined;
    if (token) {
        isLoggedIn = await validateJwt(token);
        parsed = decodeJwt(token) as IdToken;
    };

    return isLoggedIn && parsed?.app_permissions && parsed.app_permissions.includes("author");
}