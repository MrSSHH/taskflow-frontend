import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useState } from "react";

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<any[]>([]);

  const getTasks = async () => {
    try {
      const res = await fetch("http://192.168.50.52:3000/api/tasks?limit=10");
      const data = await res.json();
      console.log("* ~ Dashboard ~ getTasks ~ tasks:", data);
      return data;
    } catch (err) {
      console.error("Error fetching tasks:", err);
      return [];
    }
  };

  useIonViewWillEnter(async () => {
    setLoading(true);
    const tasksData = await getTasks();
    setTasks(tasksData);
    setLoading(false);
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"secondary"}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
        <IonToolbar color={"secondary"}>
          <IonSearchbar />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {tasks.map((task, index) => (
          <IonCard key={task.id}>
            <IonCardHeader>
              <IonCardTitle>{task.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{task.body}</IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
