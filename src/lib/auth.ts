import { getToken } from "./auth-stroage";

export async function isUserLoggedIn(): Promise<boolean> {
  const token = await getToken();
  console.log("ERROR:" + token);
  if (token === null) {
    return false;
  }
  return true;
}
