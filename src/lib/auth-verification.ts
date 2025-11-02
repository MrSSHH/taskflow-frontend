import { tokenStruct } from "../utils/session-store";
import { getToken } from "./auth-stroage";
import { jwtDecode } from "jwt-decode";

interface Token {
  sub: string; // user id
  email: string;
  exp: number;
}

export async function isUserLoggedIn(): Promise<boolean> {
  const tokens = await getToken();
  // 1. Check presence
  if (!tokens?.accessToken || !tokens?.refreshToken) {
    return false;
  }

  // 2. Check expiry
  if (!isValidJwtToken(tokens)) return false;

  return true;
}

function isValidJwtToken(tokens: tokenStruct): boolean {
  const { accessToken, refreshToken } = tokens;

  try {
    const accessDecoded = jwtDecode<Token>(accessToken); // TODO: need to be removed
    const refreshDecoded = jwtDecode<Token>(refreshToken);

    const now = Date.now();

    if (refreshDecoded.exp * 1000 < now) {
      console.log("Refresh token expired");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return false;
  }
}
