import {
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import TasksStatisticsCard from "../components/dashboard/TasksStatisticsCard";
import UpcomingTasksCard from "../components/dashboard/UpcomingTasksCard";

const Dashboard: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-title-dashboard">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="content-darkmode">
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeMd="6">
              <TasksStatisticsCard />
            </IonCol>
            <IonCol size="12" sizeMd="6">
              <UpcomingTasksCard />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
