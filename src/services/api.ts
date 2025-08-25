import axios from "axios";
import { Task } from "../types/task";

const api = axios.create({
  baseURL: "http://192.168.50.52:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTasks = async () => {
  return await api.get<Task[]>("/tasks");
};

export const deleteTask = (taskId: number) => {
  return api.delete(`/tasks/${taskId}`);
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
