import axios, { AxiosResponse } from "axios";
import { Task } from "../types/task";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
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

export const getTasks = async (fetchAmtTasks?: number) => {
  return await (fetchAmtTasks
    ? api.get<Task[]>(`/tasks?limit=${fetchAmtTasks}`)
    : api.get<Task[]>(`/tasks`));
};

export const editTask = async (task: Task) => {
  const taskJson = JSON.stringify(task, ["title", "body", "dueDate"], 2);
  console.log(taskJson);
  return await api.patch(`/tasks/${task.id}`, taskJson);
};

export const addTask = async (task: Task) => {
  const taskJson = JSON.stringify(task, ["title", "body", "dueDate"], 2);
  console.log(taskJson);
  return await api.post(`/tasks`, taskJson);
};
