import React, { useEffect, useState } from "react";
import { taskApi, type TaskItem } from "./api/api";

export const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  const fetchTasks = async () => {
    const data = await taskApi.getAllTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const today = new Date().toLocaleDateString();

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-1">Hôm nay</h1>
        <p className="text-sm text-slate-500 font-medium">{today}</p>
      </div>
      <div>
        <div className="mb-3 text-blue-600 font-bold text-xs uppercase">
          <span>Nhiệm vụ hôm nay</span>
        </div>
        <hr className="mb-4"></hr>

        <div className="flex flex-col max-h-50 overflow-y-auto pr-1">
          {tasks
            .filter((task) => !task.status)
            .filter((task) => {
              if (!task.expire_Date) return true;

              const taskDate = new Date(task.expire_Date);
              const today = new Date();

              taskDate.setHours(0, 0, 0, 0);
              today.setHours(0, 0, 0, 0);

              return taskDate <= today;
            })
            .map((task) => {
              let badgeColor = "bg-blue-100 text-blue-700";
              if (task.priority?.toLowerCase() === "high") {
                badgeColor = "bg-red-100 text-red-700 font-bold";
              } else if (task.priority?.toLowerCase() === "medium") {
                badgeColor = "bg-green-100 text-green-700 font-bold";
              }

              return (
                <div
                  key={task.id}
                  className="flex items-center mb-2 gap-4 bg-white border border-slate-200 p-4 rounded-xl shadow-sm transition hover:shadow-md"
                >
                  <div className="w-6 h-6 rounded-full border-2 border-slate-300 shrink-0 cursor-pointer hover:border-blue-500 transition" />

                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-slate-800 text-base">
                      {task.title}
                    </span>

                    <div className="flex items-center gap-3 text-xs text-slate-500 text-center">
                      <span
                        className={`min-w-20 px-2 py-0.5 rounded-md text-[11px] ${badgeColor}`}
                      >
                        {task.priority}
                      </span>
                      <span className="flex items-center gap-1">
                        Hôm nay,{" "}
                        {task.time ? task.time.substring(0, 5) : "17:00"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="mb-3 mt-7 text-blue-600 font-bold text-xs uppercase">
          <span>Sắp tới</span>
        </div>
        <hr className="mb-4"></hr>
        <div className="flex flex-col max-h-50 overflow-y-auto pr-1">
          {tasks
            .filter((task) => !task.status)
            .filter((task) => {
              if (!task.expire_Date) return true;

              const taskDate = new Date(task.expire_Date);
              const today = new Date();

              taskDate.setHours(0, 0, 0, 0);
              today.setHours(0, 0, 0, 0);

              return taskDate >= today;
            })
            .map((task) => {
              let badgeColor = "bg-blue-100 text-blue-700";
              if (task.priority?.toLowerCase() === "high") {
                badgeColor = "bg-red-100 text-red-700 font-bold";
              } else if (task.priority?.toLowerCase() === "medium") {
                badgeColor = "bg-green-100 text-green-700 font-bold";
              }

              return (
                <div
                  key={task.id}
                  className="flex items-center mb-2 gap-4 bg-white border border-slate-200 p-4 rounded-xl shadow-sm transition hover:shadow-md"
                >
                  <div className="w-6 h-6 rounded-full border-2 border-slate-300 shrink-0 cursor-pointer hover:border-blue-500 transition" />

                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-slate-800 text-base">
                      {task.title}
                    </span>

                    <div className="flex items-center gap-3 text-xs text-slate-500 text-center">
                      <span
                        className={`min-w-20 px-2 py-0.5 rounded-md text-[11px] ${badgeColor}`}
                      >
                        {task.priority}
                      </span>
                      <span className="flex items-center gap-1">
                        {task.expire_Date?.slice(0, 10) || "Không có ngày"},{" "}
                        {task.time ? task.time.substring(0, 5) : "17:00"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
