import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonHeader,
  IonIcon,
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
import React, { useEffect, useRef, useState } from "react";
import { getTasks, deleteTask, editTask } from "../services/api";
import { addOutline, logInOutline, trashBinOutline } from "ionicons/icons";

import { Task } from "../types/task";
import TaskCard from "../components/tasks/TaskCard";
import TaskSkeletonText from "../components/tasks/TaskSkeletonText";
import TaskEditModal from "../components/tasks/TaskEditModal";
import TaskDeleteConfirmation from "../components/tasks/TaskDeleteConfirmation";
import TaskAddNew from "../components/tasks/TaskAddNew";
import TasksNotFound from "../components/errors/TasksNotFound";

const TIMEOUT_ANIMATION = 400; // 400 ms

const Tasks: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [taskToDelete, setTaskToDelete] = useState<Task | number[] | null>(
    null
  );
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const [taskToAddModal, setTaskToAddModal] = useState<boolean>(false);
  const [selectedTaskIds, setSelectedTaskIds] = useState<number[]>([]);
  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);
  const page = useRef(null);

  const modal = useRef<HTMLIonModalElement>(null);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);
  const fetchTasks = async () => {
    await new Promise((resolve) =>
      setTimeout(() => {
        console.log(
          "⏳ [Tasks.tsx:48] Simulating 1s delay before fetching tasks..."
        );
        resolve(null); // or just resolve();
      }, TIMEOUT_ANIMATION)
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
    <IonPage ref={page}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {selectedTaskIds.length > 0 ? (
              <>
                <IonButton
                  color="danger"
                  fill="solid"
                  shape="round"
                  size="default"
                  onClick={async () => {
                    setTaskToDelete(selectedTaskIds);
                    setShowAlert(true);
                  }}
                >
                  <IonIcon slot="start" icon={trashBinOutline} />
                  Delete ({selectedTaskIds.length})
                </IonButton>
              </>
            ) : (
              <IonMenuButton />
            )}
          </IonButtons>

          <IonTitle>Tasks</IonTitle>

          <IonButtons slot="end">
            {selectedTaskIds.length > 0 && (
              <IonButton
                color="light"
                fill="solid"
                shape="round"
                size="default"
                onClick={() => setSelectedTaskIds([])}
              >
                Cancel
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar />
        </IonToolbar>
      </IonHeader>
      <IonContent className="content-darkmode">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        {loading && (
          <>
            <IonProgressBar type="indeterminate" />
            <TaskSkeletonText />
          </>
        )}

        {tasks.length == 0 && <TasksNotFound />}
        {loading ? (
          <IonText></IonText>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              toDelete={() => {
                setTaskToDelete(task);
                setShowAlert(true);
              }}
              toEdit={() => {
                setTaskToEdit(task);
                setShowEditModal(true);
              }}
              selectedTaskIds={selectedTaskIds}
              setSelectedTaskIds={setSelectedTaskIds}
            ></TaskCard>
          ))
        )}
        <TaskDeleteConfirmation
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          taskToDelete={
            selectedTaskIds.length > 0 ? selectedTaskIds : taskToDelete
          }
          setLoading={setLoading}
          setSelectedTaskIds={setSelectedTaskIds}
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
          <IonButton
            size="large"
            color="success"
            disabled={selectedTaskIds.length > 0}
            onClick={() => setTaskToAddModal(true)}
          >
            <IonIcon slot="icon-only" icon={addOutline}></IonIcon>
          </IonButton>
        </IonFab>

        <TaskAddNew
          presentingElement={presentingElement!}
          modal={modal}
          setShowAddModal={setTaskToAddModal}
          fetchTasks={fetchTasks}
          setLoading={setLoading}
          showAddModal={taskToAddModal}
        />
      </IonContent>
    </IonPage>
  );
};
export default Tasks;
