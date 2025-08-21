import {
  IonAlert,
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
import { getTasks, deleteTask } from "../services/api";



const Tasks: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<any[]>([]);

  const [taskToDelete, setTaskToDelete] = useState<any>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const fetchTasks = async () => {
    await new Promise((resolve) =>
      setTimeout(() => {
        console.log(
          "⏳ [Tasks.tsx:48] Simulating 1s delay before fetching tasks..."
        );
        resolve(null); // or just resolve();
      }, 1000)
    );
    const res = await getTasks();
    console.log("* ~ Tasks.tsx ~ getTasks ~ tasks:", res.data);
    setTasks(res.data);
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
                    <IonSkeletonText animated style={{ width: "160px" }} />
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
                  Closest due date: {task.dueDates[0]?.dueDates}
                </IonCardSubtitle>

                <IonCardTitle>{task.title}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>{task.body}</IonCardContent>
              <IonButton fill="clear">Edit</IonButton>
              <IonButton
                fill="clear"
                onClick={() => {
                  setTaskToDelete(task);
                  setShowAlert(true);
                }}
              >
                Delete
              </IonButton>
            </IonCard>
          ))
        )}
        <IonAlert
          header="Are you sure?"
          isOpen={showAlert}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              handler: () => {
                console.log("Deletion canceled");
              },
            },
            {
              text: "Delete",
              role: "confirm",
              handler: async () => {
                deleteTask(taskToDelete?.id);
                console.log("Deleted task");
                setLoading(true);
                await fetchTasks();
                setLoading(false);

              },
            },
          ]}
          onDidDismiss={({ detail }) => {
            console.log(`Dismissed with role: ${detail.role}`);
            setShowAlert(false);
          }}
        ></IonAlert>
      </IonContent>
    </IonPage>
  );
};
export default Tasks;
