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
  IonItem,
  IonList,
  IonMenuButton,
  IonPage,
  IonProgressBar,
  IonSearchbar,
  IonText,
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
      const res = await fetch("http://192.168.60.22:3000/api/tasks?limit=10");
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
        <IonToolbar color={"secondary"} >
          <IonSearchbar className="ion-margin-top" />
        {loading && <IonProgressBar type="indeterminate" />}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {loading ? (
          <IonText>
            Loading...
          </IonText>
        ) : (
          tasks.map((task, index) => (
            <IonCard key={task.id}>
              <IonCardHeader>
              <IonCardSubtitle>
                Nearest due date: {task.dueDates[0].dueDates}
               </IonCardSubtitle>
   
                <IonCardTitle>
                  {task.title}
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                {task.body}
              </IonCardContent>
              <IonButton fill="clear">Edit</IonButton>
              <IonButton fill="clear">Delete</IonButton>

            </IonCard>
          ))
  
        )}
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
