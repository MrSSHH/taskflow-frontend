import { IonButton, IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import React from "react";

type Props = {
  selectedTasksAmt: number;
};

const DeleteSelectedTasksButton: React.FC<Props> = ({ selectedTasksAmt }) => {
  return (
    <IonButton
      fill="clear"
      style={{
        "--color": "#ff0000", // 🔥 pure bright red
      }}
    >
      <IonIcon icon={trashOutline} slot="start" />
      Delete ({selectedTasksAmt})
    </IonButton>
  );
};

export default DeleteSelectedTasksButton;
