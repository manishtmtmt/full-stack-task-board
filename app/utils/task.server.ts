import { db } from "./prisma.server";
import { TaskBoard, type Task } from "./types.server";

export const createTaskBoard = async () => {
  return await db.taskBoard.create({
    data: {
      title: "My Task Board",
      description: "Tasks to keep organised",
    },
  });
};

export const getTaskBoard = async (boardId: string) => {
  return db.taskBoard.findUnique({
    where: {
      id: boardId,
    },
    include: {
      tasks: true,
    },
  });
};

export const updateTaskBoard = async (boardId: string, payload: TaskBoard) => {
  await db.taskBoard.update({
    where: {
      id: boardId,
    },
    data: payload,
  });
};

export const addDefaultTasks = async (boardId: string) => {
  await db.task.createMany({
    data: [
      {
        title: "Task in Progress",
        iconPath: "alarm-clock.png",
        status: "IN_PROGRESS",
        taskBoardId: boardId,
      },
      {
        title: "Task Completed",
        iconPath: "man-lifting-weights.png",
        status: "COMPLETED",
        taskBoardId: boardId,
      },
      {
        title: "Task Won’t Do",
        iconPath: "hot-beverage.png",
        status: "WONT_DO",
        taskBoardId: boardId,
      },
    ],
  });
};

export const addTask = async (task: Task) => {
  await db.task.create({
    data: task,
  });
};

export const deleteTask = async (taskId: string) => {
  await db.task.delete({
    where: {
      id: taskId,
    },
  });
};

export const updateTask = async (taskId: string, data: Task) => {
  await db.task.update({
    where: {
      id: taskId,
    },
    data,
  });
};
