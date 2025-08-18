import {
  IonContent,
  IonHeader,
  IonPage,
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
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <ul>
            {tasks.map((task, idx) => (
              <li key={idx}>{task.title ?? JSON.stringify(task)}</li>
            ))}
          </ul>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
