import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonFab,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonMenuButton,
  IonModal,
  IonPage,
  IonProgressBar,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSearchbar,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
  RefresherCustomEvent,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useRef, useState } from "react";
import { getTasks, deleteTask, editTask } from "../services/api";
import { addOutline, logInOutline } from "ionicons/icons";

import { Task } from "../types/task";
import TaskCard from "../components/tasks/TaskCard";
import TaskSkeletonText from "../components/tasks/TaskSkeletonText";
import TaskEditModal from "../components/tasks/TaskEditModal";
import TaskDeleteConfirmation from "../components/tasks/TaskDeleteConfirmation";

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
      }, 500)
    );
    const res = await getTasks();
    console.log("* ~ Tasks.tsx ~ getTasks ~ tasks:", res.data);
    setTasks(res.data);
  };

  useIonViewWillEnter(() => {
    const run = async () => {
      try {
        setLoading(true);
        await fetchTasks();
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    run();
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
            <TaskSkeletonText />
          </>
        )}

        {loading ? (
          <IonText></IonText>
        ) : (
          tasks.map((task) => (
            <TaskCard
              task={task}
              toDelete={() => {
                setTaskToDelete(task);
                setShowAlert(true);
              }}
              toEdit={() => {
                setTaskToEdit(task);
                setShowEditModal(true);
              }}
            ></TaskCard>
          ))
        )}
        <TaskDeleteConfirmation
          showAlert={showAlert}
          taskToDelete={taskToDelete}
          setLoading={setLoading}
          setShowAlert={setShowAlert}
          fetchTasks={fetchTasks}
        />
        <TaskEditModal
          modal={modal}
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          setLoading={setLoading}
          fetchTasks={fetchTasks}
          taskSelected={taskToEdit}
        />
        <IonFab
          className="ion-padding"
          slot="fixed"
          vertical="bottom"
          horizontal="end"
        >
          <IonButton size="large" color="success">
            <IonIcon slot="icon-only" icon={addOutline}></IonIcon>
          </IonButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};
export default Tasks;
