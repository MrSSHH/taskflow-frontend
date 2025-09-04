import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import TasksStatisticsChart from "../components/dashboard/TasksStatisticsChart";
import { Icon } from "ionicons/dist/types/components/icon/icon";
import { reorderThreeOutline } from "ionicons/icons";
import UpcomingTasksGrid from "../components/dashboard/UpcomingTasksGrid";

const Dashboard: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"secondary"}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard className="custom-card">
          <IonCardHeader>
            <div className="card-header-row">
              <div>
                <IonCardSubtitle className="card-subtitle">
                  📊 Statistics
                </IonCardSubtitle>
                <IonCardTitle className="card-title">
                  Tasks Overview
                </IonCardTitle>{" "}
              </div>
              <IonButton fill="clear" className="header-button">
                <IonIcon icon={reorderThreeOutline} />
              </IonButton>
            </div>
          </IonCardHeader>
          <IonCardContent>
            <div className="chart-container">
              <TasksStatisticsChart />
            </div>
          </IonCardContent>
        </IonCard>

        <IonCard className="custom-card">
          <IonCardHeader>
            <div className="card-header-row">
              <div>
                <IonCardSubtitle className="card-subtitle">
                  📅 Stay ahead of your deadlines
                </IonCardSubtitle>
                <IonCardTitle className="card-title">
                  Upcoming tasks
                </IonCardTitle>{" "}
              </div>
            </div>
          </IonCardHeader>
          <IonCardContent>
            <UpcomingTasksGrid></UpcomingTasksGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
