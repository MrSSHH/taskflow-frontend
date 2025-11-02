import { SecureStoragePlugin } from "capacitor-secure-storage-plugin";
import { setSession, tokenStruct } from "../utils/session-store";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

/**
 * Save tokens securely and update session
 */
export async function saveToken(token: tokenStruct) {
  await setSession(token);
  try {
    const access = await SecureStoragePlugin.set({
      key: ACCESS_TOKEN_KEY,
      value: token.accessToken,
    });
    const refresh = await SecureStoragePlugin.set({
      key: REFRESH_TOKEN_KEY,
      value: token.refreshToken,
    });
    return {
      accessToken: access.value,
      refreshToken: refresh.value,
    };
  } catch (error) {
    console.error("Failed to save tokens:", error);
  }
}

/**
 * Safely retrieve stored tokens (returns null if not found)
 */
export async function getToken(): Promise<tokenStruct | null> {
  try {
    const access = await SecureStoragePlugin.get({ key: ACCESS_TOKEN_KEY });
    const refresh = await SecureStoragePlugin.get({ key: REFRESH_TOKEN_KEY });

    return {
      accessToken: access.value,
      refreshToken: refresh.value,
    };
  } catch (error: any) {
    if (error.message?.includes("Item with given key does not exist")) {
      console.warn("No tokens found in secure storage yet.");
      return null;
    }
    console.error("Error retrieving tokens:", error);
    return null;
  }
}

/**
 * Remove tokens safely (ignore missing key errors)
 */
export async function removeToken() {
  try {
    await SecureStoragePlugin.remove({ key: ACCESS_TOKEN_KEY });

    await SecureStoragePlugin.remove({ key: REFRESH_TOKEN_KEY });
  } catch (err) {
    if (!String(err).includes("Item with given key does not exist"))
      console.warn("Error removing refresh token:", err);
  }
}
