import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonItem,
} from "@ionic/react";
import React, { useRef, useState } from "react";
import { Task } from "../../types/task";

type Props = {
  task: Task;
  toEdit: (t: Task) => void;
  toDelete: (t: Task) => void;
  setSelectedTaskIds: React.Dispatch<React.SetStateAction<number[]>>;
  selectedTaskIds: number[];
};

const TaskCard: React.FC<Props> = ({
  task,
  selectedTaskIds,
  toEdit,
  toDelete,
  setSelectedTaskIds,
}) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTouchPress = (task: Task) => {
    console.log(selectedTaskIds);
    if (selectedTaskIds.length > 0) {
      setSelectedTaskIds((prev) =>
        prev.includes(task.id)
          ? prev.filter((currentId) => currentId !== task.id)
          : [...prev, task.id]
      );
    }
    timeoutRef.current = setTimeout(() => {
      setSelectedTaskIds((prev) =>
        prev.includes(task.id)
          ? prev.filter((currentId) => currentId !== task.id)
          : [...prev, task.id]
      );
    }, 600);
  };
  const handleTouchEnd = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
  const isSelected = selectedTaskIds.includes(task.id);

  return (
    <>
      <IonCard
        key={task.id}
        onTouchStart={(event) => handleTouchPress(task)}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        style={{
          transform: isSelected ? "scale(0.95)" : "scale(1)",
          transition: "all 0.3s ease-in-out",
          opacity: isSelected ? 0.8 : 1,
          ...(isSelected && { border: "2px solid #3880ff" }),
        }}
      >
        <IonCardHeader>
          <IonCardSubtitle>
            Closest due date: {task.dueDates[0].dueDates ?? "-"}
          </IonCardSubtitle>

          <IonCardTitle>
            {isSelected && (
              <IonCheckbox
                onClick={(e) => e.preventDefault()}
                style={{ pointerEvents: "none", opacity: 1}}
                checked={true}
                justify="end"
              />
            )}

            {task.title}
          </IonCardTitle>
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
    </>
  );
};

export default TaskCard;
