import { getToken } from "../lib/auth-stroage";

export async function isUserLoggedIn(): Promise<boolean> {
  const token = await getToken();
  if (token === null) {
    return false;
  }
  return true;
}
