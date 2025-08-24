import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonSkeletonText,
} from "@ionic/react";
import React from "react";

const TaskSkeletonText: React.FC = () => {
  return [...Array(10)].map((_, i) => (
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
  ));
};

export default TaskSkeletonText;
