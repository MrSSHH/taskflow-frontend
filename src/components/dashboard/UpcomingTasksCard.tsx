import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useState } from "react";
import { getTasks } from "../../services/api";
import { Task } from "../../types/task";

const DISPLAY_AMT_UPCOMING_TASKS = 5; // Display AMT of tasks on board

const UpcomingTasksCard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useIonViewWillEnter(() => {
    const run = async () => {
      try {
        const upcomingTasks = await getTasks(DISPLAY_AMT_UPCOMING_TASKS);
        setTasks(upcomingTasks.data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      }
    };
    run();
  });

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
          {tasks.map((task) => (
            <IonRow className="outlined-table">
              <IonCol>{task.title}</IonCol>
              <IonCol>{task.dueDates[0].dueDates}</IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default UpcomingTasksCard;
