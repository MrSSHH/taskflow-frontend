import axios from "axios";
import { Task } from "../types/task";
import { getToken, removeToken, saveToken } from "../lib/auth-stroage";
import { remove } from "ionicons/icons";

export interface AuthGoogleResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    googleId: string;
    email: string;
    name: string;
    picture: string;
    createdAt: string; // ISO date string
  };
}

// ========== GLOBAL FLAGS ==========
let isRefreshingToken: boolean = false;
let subscribersList: ((newToken: string) => void)[] = [];

// Push waiting request callbacks to queue
const addSubscriber = (callback: (newToken: string) => void) => {
  subscribersList.push(callback);
};

// Call all queued requests once refresh finishes
const notifySubscribers = (newToken: string) => {
  subscribersList.forEach((cb) => cb(newToken));
  subscribersList = [];
};

// ========== AXIOS INSTANCES ==========
export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshApi = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ========== API METHODS ==========
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

// ========== INTERCEPTORS ==========
export const setupInterceptors = async () => {
  api.interceptors.request.use(
    async (config) => {
      const tokens = await getToken();
      if (tokens?.accessToken) {
        config.headers.Authorization = `Bearer ${tokens.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      // Handle only 401 errors
      if (error.response?.status === 401 && !originalRequest._retry) {
        // If we’re already refreshing, queue this request
        if (isRefreshingToken) {
          return new Promise((resolve) => {
            addSubscriber((newToken) => {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              resolve(api(originalRequest)); // retry original request
            });
          });
        }

        // Start refresh process
        isRefreshingToken = true;
        originalRequest._retry = true;

        console.log("⛔️ Interceptor triggered for:", error.config.url);
        console.log("Status:", error.response?.status);

        try {
          const tokens = await getToken();
          if (!tokens?.refreshToken) {
            isRefreshingToken = false;
            return Promise.reject(error);
          }

          const res = await refreshApi.post(
            "/auth/refresh-token",
            {},
            {
              headers: { Authorization: `Bearer ${tokens.refreshToken}` },
            }
          );

          const newAccessToken = res.data.accessToken || res.data;
          console.log("New access token received:", newAccessToken);

          await saveToken({
            ...tokens,
            accessToken: newAccessToken,
          });

          console.log(`Tokens updated with new access token`);

          // Update headers globally
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;

          // Notify all waiting requests
          notifySubscribers(newAccessToken);

          // Retry the original failed request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (err) {
          console.error("Failed to refresh access token:", err);
          await removeToken();
          return Promise.reject(err);
        } finally {
          isRefreshingToken = false;
        }
      }

      // For non-401 errors
      return Promise.reject(error);
    }
  );
};
