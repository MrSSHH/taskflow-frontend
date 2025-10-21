import { getToken } from "../lib/auth-stroage";

export function isUserLoggedIn(): boolean {
  if (getToken() === null) {
    return false;
  }
  return true;
}
