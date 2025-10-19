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

const INTRO_KEY = "intro-seen";

const Login: React.FC = () => {
  const [introSeen, setIntroSeen] = useState(false);
  const router = useIonRouter();
  const [present, dismiss] = useIonLoading();
  const init = async () => {
    await SocialLogin.initialize({
      google: {
        iOSClientId:
          "789609970397-gjhov389ke7vcnl1nqec28soeb5m7olk.apps.googleusercontent.com", // for iOS
        webClientId:
          "789609970397-i7sf5ucvrf2ba1dmecnoh56mom2kpelg.apps.googleusercontent.com", // for Web/Android
      },
    });
  };
  init();
  useEffect(() => {
    const checkStorage = async () => {
      const seen = await Preferences.get({ key: INTRO_KEY });
      console.log("~ file: Login.tsx:17 ~ checkStorage seen: ", seen);
      setIntroSeen(seen.value === "true");
    };
    checkStorage();
  }, []);

  const doLogin = async (event: any) => {
    event.preventDefault();
    await present("Logging in...");
    setTimeout(() => {
      dismiss();
      router.push("/app", "root");
    }, 2000);
  };

  const finishIntro = async () => {
    await Preferences.set({ key: INTRO_KEY, value: "true" });
    setIntroSeen(true);
  };

  const watchIntroAgain = async () => {
    setIntroSeen(false);
    await Preferences.remove({ key: INTRO_KEY });
  };

  return (
    <>
      {!introSeen ? (
        <Intro onFinish={finishIntro} />
      ) : (
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
                  {/* Logo Section */}
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

                  {/* Login Card */}
                  <IonCard className="login-card">
                    <IonCardContent className="card-content">
                      <form onSubmit={doLogin} className="login-form">
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

                        <IonButton
                          className="login-button"
                          type="submit"
                          expand="block"
                          size="large"
                        >
                          Sign In
                          <IonIcon icon={logInOutline} slot="end" />
                        </IonButton>

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
                        <GoogleAuthBtn />

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
