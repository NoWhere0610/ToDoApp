import axios from "axios";

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Category {
  id: number;
  name: string;
  quantity: number;
}

export interface TaskItem {
  id: number;
  title: string;
  description: string | null;
  priority: string;
  expire_Date: string | null;
  time: string | null;
  status: boolean;
  category?: Category;
  user?: User;
}

const API_BASE_URL = "http://localhost:5069/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const taskApi = {
  getAllTasks: async (): Promise<TaskItem[]> => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5069/api/task", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
  getTaskById: async (id: number): Promise<TaskItem> => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5069/api/task", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
  createTask: async (taskData: Partial<TaskItem>): Promise<TaskItem> => {
    const response = await api.post<TaskItem>("/task", taskData);
    return response.data;
  },
};

export const categoryApi = {
  getAllCategories: async (): Promise<Category[]> => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5069/api/category", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
};

export default api;
