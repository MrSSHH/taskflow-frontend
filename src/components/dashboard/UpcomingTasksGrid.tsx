import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const UpcomingTasksGrid: React.FC = () => {
  return (
    <>
      <IonGrid>
        <IonRow className="table-topbar">
          <IonCol>Title</IonCol>
          <IonCol>Due date</IonCol>
        </IonRow>
        <IonRow className="outlined-table">
          <IonCol>Placeholder task</IonCol>
          <IonCol>In 2 days</IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};

export default UpcomingTasksGrid;
