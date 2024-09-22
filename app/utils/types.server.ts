import { Status } from "@prisma/client";

export interface Task {
  taskBoardId: string;
  title: string;
  description?: string;
  iconPath: string;
  status: Status;
}

export interface TaskBoard {
  title: string;
  description?: string;
}
