import axios from "axios";
import { Task } from "../types/task";

const api = axios.create({
  baseURL: "http://192.168.50.52:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export function deleteTask(taskIdOrIds: number): Promise<any>;
export function deleteTask(taskIdOrIds: number[]): Promise<any[]>;

export function deleteTask(taskIdOrIds: number | number[]) {
  if (Array.isArray(taskIdOrIds)) {
    return Promise.all(
      taskIdOrIds.map((taskId) => api.delete(`/tasks/${taskId}`))
    );
  }

  return api.delete(`/tasks/${taskIdOrIds}`);
}

export const getTasks = async () => {
  return await api.get<Task[]>("/tasks");
};

export const editTask = async (task: Task) => {
  const taskJson = JSON.stringify(task, ["title", "body", "dueDates"], 2);
  console.log(taskJson);
  return await api.patch(`/tasks/${task.id}`, taskJson);
};

export const addTask = async (task: Task) => {
  const taskJson = JSON.stringify(task, ["title", "body", "dueDates"], 2);
  console.log(taskJson);
  return await api.post(`/tasks`, taskJson);
};
