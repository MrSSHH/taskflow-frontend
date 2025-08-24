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
import { Task } from "../../types/task";

type Props = {
  task: Task;
  toEdit: (t: Task) => void;
  toDelete: (t: Task) => void;
};

const TaskCard: React.FC<Props> = ({ task, toEdit, toDelete }) => {
  return (
    <IonCard key={task.id}>
      <IonCardHeader>
        <IonCardSubtitle>
          Closest due date: {task.dueDates[0].dueDates ?? "-"}
        </IonCardSubtitle>
        <IonCardTitle>{task.title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>{task.body}</IonCardContent>
      <IonItem
        lines="none"
        style={{
          ["--background"]: "transparent",
          ["--ion-item-background"]: "transparent",
        }}
      >
        <IonButton
          size="default"
          fill="clear"
          onClick={() => {
            toEdit(task);
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
            toDelete(task);
          }}
        >
          Mark completed
        </IonButton>
      </IonItem>
    </IonCard>
  );
};

export default TaskCard;
