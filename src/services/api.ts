import axios from "axios";
import { Task } from "../types/task";
export interface AuthGoogleResponse {
  accessToken: string;
  user: {
    id: number;
    googleId: string;
    email: string;
    name: string;
    picture: string;
    createdAt: string; // ISO date string
  };
}

export const api = axios.create({
  baseURL: "http://192.168.50.52:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export function deleteTask(taskIdOrIds: number): Promise<any>;
export function deleteTask(taskIdOrIds: number[]): Promise<any[]>;

// TODO: make this deleteTask function async
export function deleteTask(taskIdOrIds: number | number[]) {
  if (Array.isArray(taskIdOrIds)) {
    return Promise.all(
      taskIdOrIds.map((taskId) => api.delete(`/tasks/${taskId}`))
    );
  }

  return api.delete(`/tasks/${taskIdOrIds}`);
}

export const getTasks = async (fetchAmtTasks?: number) => {
  return await (fetchAmtTasks
    ? api.get<Task[]>(`/tasks?limit=${fetchAmtTasks}`)
    : api.get<Task[]>(`/tasks`));
};

export const getOverdueTasksAmt = async () => {
  const totalOverdue = await api.get(`/tasks/overdue`);
  return totalOverdue.data.Overdue;
};

export const editTask = async (task: Task) => {
  const taskJson = JSON.stringify(task, ["title", "body", "dueDate"], 2);
  console.log(taskJson);
  return await api.patch(`/tasks/${task.id}`, taskJson);
};

export const addTask = async (task: Task) => {
  const taskJson = JSON.stringify(task, ["title", "body", "dueDate"], 2);
  return await api.post(`/tasks`, taskJson);
};

export const loginWithGoogle = async (idToken: string) => {
  console.log("Sending API the google token !");
  const res = await api.post("/auth/google/", { idToken });
  return res.data as Promise<AuthGoogleResponse>;
};

// export const validateJwtToken = async (jwtToken: string): Promise<boolean> => {
//   console.log("Starting to validate the JWT token with the backend");
//   try {
//     const res = await api.get("/auth/validate-token", {
//       headers: { Authorization: jwtToken },
//     });
//     console.log(res.data);
//   } catch (error: any) {
//     if (axios.isAxiosError(error)) {
//       if (error.response?.status == 401) {
//         console.warn("Unauthorized — token might be invalid or expired.");
//         return false;
//       }
//     }
//   }

//   return true;
// };
