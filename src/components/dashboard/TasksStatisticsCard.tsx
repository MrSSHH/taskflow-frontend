import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  useIonViewDidEnter,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getOverdueTasksAmt, getTasks } from "../../services/api";

type Props = {
  statsOfTasks: Record<"Completed" | "Overdue" | "tasksLeft", number>;
};

const TasksStatisticsChart: React.FC<Props> = ({ statsOfTasks }) => {
  Chart.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: ["Completed", "Overdue", "Tasks left"],
    datasets: [
      {
        label: "# of tasks",
        data: [
          statsOfTasks.Completed,
          statsOfTasks.Overdue,
          statsOfTasks.tasksLeft,
        ],
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
  const [stats, setStats] =
    useState<Record<"Completed" | "Overdue" | "tasksLeft", number>>();
  useIonViewDidEnter(() => {
    const fetchStats = async () => {
      const overdue = await getOverdueTasksAmt();
      const tasksLeft = await getTasks();
      console.log(overdue);
      setStats({
        // TODO: Once user authentication is implemented, retrieve and set the user's actual completed task count.
        Completed: 0,
        Overdue: overdue,
        tasksLeft: tasksLeft.data.length,
      });
    };
    fetchStats();
  }, []);
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
          <TasksStatisticsChart
            statsOfTasks={
              stats ?? {
                Completed: 5,
                Overdue: 2,
                tasksLeft: 8,
              }
            }
          />
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default TasksStatisticsCard;
