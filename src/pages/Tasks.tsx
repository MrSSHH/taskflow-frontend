import {
  IonAlert,
  IonBadge,
  IonButton,
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
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonModal,
  IonPage,
  IonProgressBar,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSearchbar,
  IonSkeletonText,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
  RefresherCustomEvent,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useRef, useState } from "react";
import { getTasks, deleteTask, editTask } from "../services/api";
import {
  logInOutline,
  personCircleOutline,
  repeatOutline,
} from "ionicons/icons";

import { Task } from "../types/task";

const Tasks: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const modal = useRef<HTMLIonModalElement>(null);

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
                  Closest due date: {task.dueDates[0].dueDates}
                </IonCardSubtitle>
                <IonCardTitle>{task.title}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>{task.body}</IonCardContent>
              <IonButton
                fill="clear"
                onClick={() => {
                  setTaskToEdit(task);
                  setShowEditModal(true);
                }}
              >
                Edit
              </IonButton>

              <IonButton
                fill="clear"
                color="danger"
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
                if (taskToDelete) {
                  deleteTask(taskToDelete.id);
                }
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

        <IonModal
          isOpen={showEditModal}
          ref={modal}
          initialBreakpoint={0.5}
          breakpoints={[0, 0.25, 0.5, 0.75, 1]}
          onDidDismiss={({ detail }) => {
            setShowEditModal(false);
            console.log(`Dismissed with role: ${detail.role}`);
          }}
        >
          <IonContent scrollY={false}>
            <IonGrid fixed>
              <IonRow class="ion-justify-content-center">
                <IonCol size="12">
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>Edit your task</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          if (taskToEdit) {
                            e.preventDefault();
                            const fd = new FormData(e.currentTarget);
                            const updatedTask = {
                              ...taskToEdit,
                              title: String(
                                fd.get("title") ?? taskToEdit.title
                              ),
                              body: String(fd.get("body") ?? taskToEdit.body),
                              dueDates: taskToEdit.dueDates.map(
                                (d) => d.dueDates
                              ),
                            };
                            await editTask(updatedTask);
                            setShowEditModal(false);
                            setLoading(true);
                            await fetchTasks();
                            setLoading(false);
                          }
                        }}
                      >
                        <IonInput
                          fill="outline"
                          labelPlacement="floating"
                          label="Title"
                          name="title"
                          type="text"
                          placeholder="Title"
                          value={taskToEdit?.title}
                        />

                        <IonTextarea
                          className="ion-margin-top"
                          label="Describe task"
                          labelPlacement="floating"
                          name="body"
                          fill="outline"
                          placeholder="Enter text"
                          value={taskToEdit?.body}
                          autoGrow={true}
                        ></IonTextarea>

                        <IonButton
                          className="ion-margin-top"
                          type="submit"
                          expand="block"
                          color="success"
                        >
                          Edit
                          <IonIcon icon={logInOutline} slot="end" />
                        </IonButton>
                      </form>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};
export default Tasks;
