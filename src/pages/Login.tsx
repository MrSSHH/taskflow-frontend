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
const INTRO_KEY = "intro-seen";

const Login: React.FC = () => {
  const [introSeen, setIntroSeen] = useState(false);
  const router = useIonRouter();
  const [present, dismiss] = useIonLoading();

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
      router.push("/app/dashboard", "root");
    }, 2000);
  };

  const finishIntro = async () => {
    await Preferences.set({ key: INTRO_KEY, value: "true" });
    setIntroSeen(true);
  };

  const watchIntroAgain = async (event: any) => {
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
            <IonToolbar color="tertiary">
              <IonTitle>Benji's App</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent scrollY={false} className="ion-padding">
            <IonGrid fixed>
              <IonRow class="ion-justify-content-center">
                <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                  <div className="ion-padding ion-text-center">
                    <img
                      src={LoginPageIcon}
                      alt="LoginPageLogo"
                      width="30%"
                    ></img>
                  </div>
                </IonCol>
              </IonRow>

              <IonRow class="ion-justify-content-center">
                <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                  <IonCard>
                    <IonCardContent>
                      <form onSubmit={doLogin}>
                        <IonInput
                          fill="outline"
                          labelPlacement="floating"
                          label="Email"
                          type="email"
                          placeholder="benm@comax.co.il"
                        />
                        <IonInput
                          className="ion-margin-top"
                          fill="outline"
                          labelPlacement="floating"
                          label="Password"
                          type="password"
                        />
                        <IonButton
                          className="ion-margin-top"
                          type="submit"
                          expand="block"
                        >
                          Login
                          <IonIcon icon={logInOutline} slot="end" />
                        </IonButton>

                        <IonButton
                          routerLink="/register"
                          color="secondary"
                          className="ion-margin-top"
                          type="button"
                          expand="block"
                        >
                          Register
                          <IonIcon icon={personCircleOutline} slot="end" />
                        </IonButton>

                        <IonButton
                          fill="clear"
                          size="small"
                          color="medium"
                          className="ion-margin-top"
                          onClick={watchIntroAgain}
                          type="button"
                          expand="block"
                        >
                          Watch Intro
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
