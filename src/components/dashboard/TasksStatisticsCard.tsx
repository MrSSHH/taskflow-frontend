import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import React from "react";
import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const TasksStatisticsChart: React.FC = () => {
  Chart.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: ["Completed", "Overdue", "Tasks left"],
    datasets: [
      {
        label: "# of tasks",
        data: [12, 19, 3], // Completed, Overdue, Tasks Left
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // ✅ Green (Completed)
          "rgba(255, 99, 132, 0.6)", // ❌ Red (Overdue)
          "rgba(54, 162, 235, 0.6)", // 🕒 Blue (Tasks Left)
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
};

const TasksStatisticsCard: React.FC = () => {
  return (
    <IonCard className="custom-card">
      <IonCardHeader>
        <div className="card-header-row">
          <div>
            <IonCardSubtitle className="card-subtitle">
              📊 Statistics
            </IonCardSubtitle>
            <IonCardTitle className="card-title">Tasks Overview</IonCardTitle>{" "}
          </div>
        </div>
      </IonCardHeader>
      <IonCardContent>
        <div className="chart-container">
          <TasksStatisticsChart />
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default TasksStatisticsCard;
