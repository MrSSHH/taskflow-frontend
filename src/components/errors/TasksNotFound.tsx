import { IonContent } from "@ionic/react";
import React from "react";
import Lottie from "lottie-react";
import TasksNoResultsFound from "../../assets/animations/TasksNoResultsFound.json";
import "../../theme/NoTasksFound.css";
const TasksNotFound: React.FC = () => {
  return (
    <IonContent className="no-tasks-content ion-padding">
      <Lottie animationData={TasksNoResultsFound} loop={true} />

      <p className="no-tasks-text">Didn't find any tasks.</p>
    </IonContent>
  );
};

export default TasksNotFound;
