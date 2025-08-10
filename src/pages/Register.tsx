import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { createOutline } from "ionicons/icons";
import React from "react";

const Register: React.FC = () => {
  const router = useIonRouter();
  const doRegister = (event: any) => {
    event.preventdefault();
    console.log("doRegister");
    router.goBack();
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Benji's App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid fixed>
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
              <IonCard>
                <IonCardContent>
                  <form onSubmit={doRegister}>
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
                      color="success"
                      className="ion-margin-top"
                      type="submit"
                      expand="block"
                    >
                      Create Account
                      <IonIcon icon={createOutline} slot="end" />
                    </IonButton>
                  </form>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;
