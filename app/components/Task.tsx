import { Task as TaskType } from "@prisma/client";
import { useState } from "react";

import { Sidebar } from "./Sidebar";

interface TaskProps {
  task: TaskType;
}

export const Task: React.FC<TaskProps> = ({ task }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <div
        className={`flex items-center gap-4 ${
          task.status === "IN_PROGRESS"
            ? "bg-[#F5D565]"
            : task.status === "COMPLETED"
            ? "bg-[#A0ECB1]"
            : "bg-[#F7D4D3]"
        } p-4 rounded-xl cursor-pointer`}
        onClick={() => setIsSidebarOpen(true)}
      >
        <div className="w-12 h-12 bg-white flex justify-center items-center rounded-xl">
          <img
            src={`/assets/${task.iconPath}`}
            alt={task.iconPath}
            className="w-1/2 h-1/2"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold">{task.title}</h2>
          <p>{task.description}</p>
        </div>
        <div
          className={`w-12 h-12 flex justify-center items-center rounded-xl ${
            task.status === "IN_PROGRESS"
              ? "bg-[#E9A23B]"
              : task.status === "COMPLETED"
              ? "bg-[#32D657]"
              : "bg-[#DD524C]"
          }`}
        >
          <img
            src={
              task.status === "IN_PROGRESS"
                ? "assets/Time_atack_duotone.svg"
                : task.status === "COMPLETED"
                ? "assets/Done_round_duotone.svg"
                : "assets/close_ring_duotone.svg"
            }
            alt=""
            className="w-1/2 h-1/2"
          />
        </div>
      </div>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        task={task}
      />
    </>
  );
};
