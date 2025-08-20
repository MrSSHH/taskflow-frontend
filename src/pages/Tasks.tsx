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
  IonSkeletonText,
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
    await new Promise((resolve) =>
      setTimeout(() => {
        console.log("⏳ [Tasks.tsx:48] Simulating 1s delay before fetching tasks...");
        resolve(null); // or just resolve();
      }, 1000)
    );
    const res = await fetch("http://192.168.60.22:3000/api/tasks?limit=10");
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
    setLoading(true);
    await fetchTasks();
    setLoading(false);
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
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        {loading && (
            <>
              <IonProgressBar type="indeterminate" />
              {[...Array(10)].map((_, i) => (
                <IonCard key={i}>
                  <IonCardHeader>
                    <IonCardSubtitle>
                      <IonSkeletonText />
                    </IonCardSubtitle>

                    <IonSkeletonText animated style={{ width: "150px" }} />
                  </IonCardHeader>
                  <IonCardContent>
                    <IonSkeletonText animated style={{ width: "150px" }} />
                  </IonCardContent>
                  <IonButton fill="clear">
                    {" "}
                    <IonSkeletonText animated style={{ width: "50px" }} />
                  </IonButton>
                  <IonButton fill="clear">
                    {" "}
                    <IonSkeletonText animated style={{ width: "50px" }} />
                  </IonButton>
                </IonCard>
              ))}
            </>
          )}

        {loading ? (
          <IonText></IonText>
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
