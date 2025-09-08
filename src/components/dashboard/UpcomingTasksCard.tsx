import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import React from "react";

const UpcomingTasksCard: React.FC = () => {
  return (
    <IonCard className="custom-card">
      <IonCardHeader>
        <div className="card-header-row">
          <div>
            <IonCardSubtitle className="card-subtitle">
              📅 Stay ahead of your deadlines
            </IonCardSubtitle>
            <IonCardTitle className="card-title">Upcoming tasks</IonCardTitle>{" "}
          </div>
        </div>
      </IonCardHeader>
      <IonCardContent>
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
      </IonCardContent>
    </IonCard>
  );
};

export default UpcomingTasksCard;
