import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const Tasks: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"secondary"}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Tasks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">Tasks</IonContent>
    </IonPage>
  );
};

export default Tasks;
