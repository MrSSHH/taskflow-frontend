import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
} from "@ionic/react";
import React from "react";
import { Task } from "../types/task";

type Props = {
  task: Task;
  onEdit: (t: Task) => void;
  onComplete: (t: Task) => void;
};

const TaskCard: React.FC<Props> = ({ task, onEdit, onComplete }) => {
  return (
    <IonCard key={task.id}>
      <IonCardHeader>
        <IonCardSubtitle>
          Closest due date: {task.dueDate ?? "-"}
        </IonCardSubtitle>
        <IonCardTitle>{task.title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>{task.body}</IonCardContent>
      <IonItem
        lines="none"
        style={{
          // Ionic respects CSS vars via inline style too
          ["--background"]: "transparent",
          ["--ion-item-background"]: "transparent",
        }}
      >
        <IonButton
          size="default"
          fill="clear"
          onClick={() => {
            onEdit(task);
          }}
        >
          Edit
        </IonButton>

        <IonButton
          size="default"
          fill="clear"
          color="success"
          slot="end"
          onClick={() => {
            onComplete(task);
          }}
        >
          Mark completed
        </IonButton>
      </IonItem>
    </IonCard>
  );
};

export default TaskCard;
