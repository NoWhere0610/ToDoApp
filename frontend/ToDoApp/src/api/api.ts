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

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const taskApi = {
  getAllTasks: async (): Promise<TaskItem[]> => {
    const response = await apiClient.get<TaskItem[]>("/task");
    return response.data;
  },
  getTaskById: async (id: number): Promise<TaskItem> => {
    const response = await apiClient.get<TaskItem>(`/task/${id}`);
    return response.data;
  },
  createTask: async (taskData: Partial<TaskItem>): Promise<TaskItem> => {
    const response = await apiClient.post<TaskItem>("/task", taskData);
    return response.data;
  }
};

export const categoryApi = {
  getAllCategories: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>("/category");
    return response.data;
  },
};

export default apiClient;
