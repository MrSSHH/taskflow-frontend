import {
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonIcon,
  useIonRouter,
  useIonLoading,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import {
  logInOutline,
  personCircleOutline,
  repeatOutline,
} from "ionicons/icons";
import Intro from "../components/intro";
import { Preferences } from "@capacitor/preferences";
import LoginPageIcon from "../assets/icons/login-page-icon.png";
import "../theme/Login.css";
import GoogleAuthBtn from "../components/buttons/GoogleAuthBtn";
import { SocialLogin } from "@capgo/capacitor-social-login";
import { isUserLoggedIn } from "../lib/auth-verification";
import { api, setupInterceptors } from "../services/api";
import { getToken, removeToken, saveToken } from "../lib/auth-stroage";
import { setSession } from "../utils/session-store";

const INTRO_KEY = "intro-seen";

const Login: React.FC = () => {
  // UI and app state
  const [introSeen, setIntroSeen] = useState(false);
  const router = useIonRouter();
  const [present, dismiss] = useIonLoading();
  const [loading, setLoading] = useState(true);

  // Initialize Google login configuration
  const init = async () => {
    await SocialLogin.initialize({
      google: {
        iOSClientId:
          "789609970397-gjhov389ke7vcnl1nqec28soeb5m7olk.apps.googleusercontent.com",
        webClientId:
          "789609970397-i7sf5ucvrf2ba1dmecnoh56mom2kpelg.apps.googleusercontent.com",
      },
    });
  };
  init();

  // Run on mount: check intro, login, and token status
  useEffect(() => {
    const initApp = async () => {
      // Check if intro was previously seen
      const seen = await Preferences.get({ key: INTRO_KEY });
      setIntroSeen(seen.value === "true");

      // Verify login and restore session if valid
      const isUserLoggedin = isUserLoggedIn();
      if (await isUserLoggedin) {
        await setupInterceptors();
        const tokens = await getToken();
        setSession(tokens);

        // Redirect logged-in user to app
        if (router.routeInfo.pathname !== "/app") {
          router.push("/app", "root");
        }
      } else {
        // If not logged in, clear session and return to home
        setSession(null);
        await removeToken();
        if (router.routeInfo.pathname !== "/") {
          router.push("/", "root");
        }
      }
      setLoading(false);
    };
    initApp();
  }, []);

  // Handle manual login button (for email/password)
  const doLogin = async (event: any) => {
    event.preventDefault();
    await present("Logging in...");
    setTimeout(() => {
      dismiss();
      router.push("/app", "root");
    }, 2000);
  };

  // Mark intro as seen
  const finishIntro = async () => {
    await Preferences.set({ key: INTRO_KEY, value: "true" });
    setIntroSeen(true);
  };

  // Allow user to rewatch intro
  const watchIntroAgain = async () => {
    setIntroSeen(false);
    await Preferences.remove({ key: INTRO_KEY });
  };

  // Show nothing until initialization completes
  if (loading) return true;

  return (
    <>
      {!introSeen ? (
        // Intro screen shown if not seen before
        <Intro onFinish={finishIntro} />
      ) : (
        // Login screen
        <IonPage>
          <IonHeader>
            <IonToolbar className="modern-toolbar">
              <IonTitle>Taskflow</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent scrollY={false} className="login-content">
            <div className="login-background"></div>

            <IonGrid fixed>
              <IonRow className="ion-justify-content-center ion-align-items-center min-height">
                <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                  {/* Logo and welcome text */}
                  <div className="logo-section">
                    <div className="logo-container">
                      <img
                        src={LoginPageIcon}
                        alt="Taskflow Logo"
                        className="login-logo"
                      />
                    </div>
                    <h1 className="welcome-text">Welcome back</h1>
                    <p className="subtitle-text">Sign in to your account</p>
                  </div>

                  {/* Login form */}
                  <IonCard className="login-card">
                    <IonCardContent className="card-content">
                      <form onSubmit={doLogin} className="login-form">
                        {/* Email input */}
                        <div className="input-group">
                          <IonInput
                            fill="outline"
                            labelPlacement="floating"
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            className="modern-input"
                          />
                        </div>

                        {/* Password input */}
                        <div className="input-group">
                          <IonInput
                            fill="outline"
                            labelPlacement="floating"
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            className="modern-input"
                          />
                        </div>

                        {/* Login button */}
                        <IonButton
                          className="login-button"
                          type="submit"
                          expand="block"
                          size="large"
                        >
                          Sign In
                          <IonIcon icon={logInOutline} slot="end" />
                        </IonButton>

                        {/* Navigate to register */}
                        <IonButton
                          routerLink="/register"
                          className="register-button"
                          type="button"
                          expand="block"
                          fill="outline"
                          size="large"
                        >
                          Create Account
                          <IonIcon icon={personCircleOutline} slot="end" />
                        </IonButton>

                        {/* Google login button */}
                        <GoogleAuthBtn />

                        {/* Replay intro button */}
                        <IonButton
                          fill="clear"
                          size="small"
                          color="medium"
                          className="intro-button"
                          onClick={watchIntroAgain}
                          type="button"
                          expand="block"
                        >
                          Watch Intro Again
                          <IonIcon icon={repeatOutline} slot="end" />
                        </IonButton>
                      </form>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonPage>
      )}
    </>
  );
};

export default Login;
