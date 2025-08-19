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
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
  RefresherCustomEvent,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useState } from "react";

const Tasks: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<any[]>([]);

  const fetchTasks = async () => {
    const res = await fetch("http://192.168.50.52:3000/api/tasks?limit=10");
    const data = await res.json();
    console.log("* ~ Tasks.tsx ~ getTasks ~ tasks:", data);
    setTasks(data);
  };

  useIonViewWillEnter(async () => {
    setLoading(true);
    await fetchTasks();
    setLoading(false);
  });

  async function handleRefresh(event: RefresherCustomEvent) {
    await fetchTasks();
    event.detail.complete();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"secondary"}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Tasks</IonTitle>
        </IonToolbar>
        <IonToolbar color={"secondary"}>
          <IonSearchbar />
          {loading && <IonProgressBar type="indeterminate" />}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        {loading ? (
          <IonText>Loading...</IonText>
        ) : (
          tasks.map((task) => (
            <IonCard key={task.id}>
              <IonCardHeader>
                <IonCardSubtitle>
                  Nearest due date: {task.dueDates[0]?.dueDates}
                </IonCardSubtitle>

                <IonCardTitle>{task.title}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>{task.body}</IonCardContent>
              <IonButton fill="clear">Edit</IonButton>
              <IonButton fill="clear">Delete</IonButton>
            </IonCard>
          ))
        )}
      </IonContent>
    </IonPage>
  );
};
export default Tasks;
