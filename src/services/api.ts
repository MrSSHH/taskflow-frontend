import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.60.22:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


export const getTasks = () => {
    return api.get('/tasks')
};


export const deleteTask = (taskId: any) => {
    return api.delete(`/tasks/${taskId}`);
};