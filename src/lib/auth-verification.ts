import { validateJwtToken } from "../services/api";
import { getToken } from "./auth-stroage";
import { jwtDecode } from "jwt-decode";

interface Token {
  sub: string; // user id
  email: string;
  exp: number;
}

export async function isUserLoggedIn(): Promise<boolean> {
  const token = await getToken();
  console.log("ERROR:" + token);

  /* 3 Steps checks */

  // 1. Check if the user has a JWT token present in storage
  if (token === null) {
    return false;
  }
  // 2. Check if the current JWT is expired
  if (isValidJwtToken(token) === false) return false;

  // // 3. Check with the backend the JWT is still present in database
  // const isJwtTokenBackendApproved = await validateJwtToken(token);
  // if (isJwtTokenBackendApproved === false) return false;

  return true;
}

function isValidJwtToken(token: string): boolean {
  const decoded = jwtDecode<Token>(token);
  const now = Date.now(); // current time in ms
  const isExpired = decoded.exp * 1000 < now;

  if (isExpired) {
    console.log("Token has expired!");
    return false;
  } else {
    console.log("Token is still valid!");
    return true;
  }
}
