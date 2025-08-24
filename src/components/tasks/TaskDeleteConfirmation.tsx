import { IonAlert } from "@ionic/react";
import React from "react";
import { deleteTask } from "../../services/api";
import { Task } from "../../types/task";

type Props = {
  showAlert: boolean;
  taskToDelete: Task | null;
  setLoading: (t: boolean) => void;
  setShowAlert: (t: boolean) => void;
  fetchTasks: () => void;
};

const TaskDeleteConfirmation: React.FC<Props> = ({
  showAlert,
  taskToDelete,
  setLoading,
  fetchTasks,
  setShowAlert,
}) => {
  return (
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
          text: "Confirm",
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
    />
  );
};

export default TaskDeleteConfirmation;
