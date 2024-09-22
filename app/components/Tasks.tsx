import { Task as TaskType } from "@prisma/client";

import { Task } from "./Task";

interface TaskProps {
  tasks: TaskType[];
}

export const Tasks: React.FC<TaskProps> = ({ tasks }) => {
  return (
    <div className="mt-6 flex flex-col gap-4">
      {tasks.length
        ? tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
            />
          ))
        : null}
    </div>
  );
};
