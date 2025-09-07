import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
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
import TasksStatisticsChart from "../components/dashboard/TasksStatisticsChart";
import UpcomingTasksGrid from "../components/dashboard/UpcomingTasksGrid";

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
                  </div>
                </IonCardHeader>
                <IonCardContent>
                  <div className="chart-container">
                    <TasksStatisticsChart />
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeMd="6">
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
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
