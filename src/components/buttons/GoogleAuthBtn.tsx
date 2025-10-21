import React, { useState } from "react";
import {
  IonButton,
  IonIcon,
  IonSpinner,
  useIonRouter,
  useIonViewDidEnter,
} from "@ionic/react";
import { logoGoogle } from "ionicons/icons";
import { SocialLogin } from "@capgo/capacitor-social-login";
import "../../theme/Login.css";
import { loginWithGoogle } from "../../services/api";
import { getToken, saveToken } from "../../lib/auth-stroage";
interface GoogleLoginResponse {
  provider: "google";
  result: {
    accessToken: {
      token: string;
      expires: string;
      // ... other token fields
    } | null;
    idToken: string;
    profile: {
      email: string | null;
      familyName: string | null;
      givenName: string | null;
      id: string | null;
      name: string | null;
      imageUrl: string | null;
    };
  };
}

const GoogleLoginBtn: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useIonRouter();

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const googleResponse = await signIn();
      console.log("User:", googleResponse.result.profile.name);
      console.log("Email:", googleResponse.result.profile.email);
      console.log("ID Token:", googleResponse.result.idToken);
      const authGoogleResponse = await loginWithGoogle(
        googleResponse.result.idToken
      );
      saveToken(authGoogleResponse.accessToken); // Save token on device for next time

      console.log(`Saved token on device: ${getToken()}`);
      // refresh login page to run the UseEffect on the first render
      router.push("/app", "root");
    } catch (err: any) {
      if (err?.message?.includes("canceled")) {
        console.log("User canceled login");
      } else {
        console.error("Login failed: ", err);
      }
    } finally {
      setLoading(false);
    }
  };
  const signIn = async (): Promise<GoogleLoginResponse> => {
    const res = await SocialLogin.login({
      provider: "google",
      options: {
        scopes: ["email", "profile"],
      },
    });

    return res as GoogleLoginResponse;
  };
  return (
    <IonButton
      className={`google-signin-btn ${loading ? "loading" : ""}`}
      expand="block"
      fill="clear"
      size="large"
      onClick={handleGoogleLogin}
    >
      {!loading ? (
        <IonIcon slot="start" icon={logoGoogle} />
      ) : (
        <IonSpinner name="crescent" slot="start" />
      )}
      {loading ? "Signing in..." : "Sign in with Google"}
    </IonButton>
  );
};

export default GoogleLoginBtn;
