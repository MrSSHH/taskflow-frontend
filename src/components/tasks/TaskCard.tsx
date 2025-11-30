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
const TIMEOUT_ANIMATION = 400; // 400 ms

const TaskCard: React.FC<Props> = ({
  task,
  selectedTaskIds,
  toEdit,
  toDelete,
  setSelectedTaskIds,
}) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTouchPress = (task: Task) => {
    if (selectedTaskIds.length > 0) {
      // 👉 Already in selection mode — toggle immediately
      setSelectedTaskIds((prev) =>
        prev.includes(task.id!)
          ? prev.filter((currentId) => currentId !== task.id)
          : [...prev, task.id!]
      );
    } else {
      // 👉 Not in selection mode — wait for long-press
      timeoutRef.current = setTimeout(() => {
        setSelectedTaskIds((prev) =>
          prev.includes(task.id!)
            ? prev.filter((currentId) => currentId !== task.id)
            : [...prev, task.id!]
        );
      }, TIMEOUT_ANIMATION);
    }
  };
  const handleTouchEnd = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleTouchMove = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
  const handleTouchCancel = handleTouchEnd;

  const isSelected = selectedTaskIds.includes(task.id!);
  return (
    <>
      <IonCard
        key={task.id}
        onTouchStart={
          selectedTaskIds.length === 0
            ? (event) => handleTouchPress(task)
            : undefined
        }
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
        onTouchMove={handleTouchMove}
        style={{
          transform: isSelected ? "scale(0.95)" : "scale(1)",
          transition: "all 0.3s ease-in-out",
          opacity: isSelected ? 0.8 : 1,
          ...(isSelected && { border: "2px solid #3880ff" }),
        }}
      >
        <IonCardHeader>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IonCardTitle>{task.title}</IonCardTitle>
            {selectedTaskIds.length > 0 && (
              <IonCheckbox
                checked={isSelected}
                onIonChange={() => handleTouchPress(task)}
              />
            )}
          </div>
          <IonCardSubtitle>Closest due date: {task.dueDate}</IonCardSubtitle>
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
            disabled={selectedTaskIds.length > 0 ? true : false}
          >
            Edit
          </IonButton>

          <IonButton
            size="default"
            fill="clear"
            color="success"
            slot="end"
            disabled={selectedTaskIds.length > 0 ? true : false}
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
