import { Status, Task } from "@prisma/client";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ObjectId } from "bson";
import React, { useState } from "react";

import { Header } from "~/components/Header";
import { Sidebar } from "~/components/Sidebar";
import { Tasks } from "~/components/Tasks";
import {
  addDefaultTasks,
  addTask,
  createTaskBoard,
  deleteTask,
  getTaskBoard,
  updateTask,
  updateTaskBoard,
} from "~/utils/task.server";
import { validateInput, validateSelectOption } from "~/utils/validate.server";

export const meta: MetaFunction = () => {
  return [
    { title: "My Task Board" },
    { name: "description", content: "Tasks to keep organised" },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const boardId = params.boardId;

  if (!ObjectId.isValid(boardId!)) {
    const taskBoard = await createTaskBoard();
    return redirect(`/${taskBoard.id}`);
  }

  const taskBoard = await getTaskBoard(boardId!);

  if (!taskBoard) {
    const newTaskBoard = await createTaskBoard();
    return redirect(`/${newTaskBoard.id}`);
  }

  if (taskBoard?.tasks.length === 0) {
    await addDefaultTasks(boardId!);
    return await getTaskBoard(boardId!);
  }
  return taskBoard;
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const boardId = params.boardId as string;

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const iconPath = formData.get("iconPath") as string;
  const status = formData.get("status") as Status;
  const taskId = formData.get("taskId") as string;

  const action = formData.get("_action");

  switch (action) {
    case "updateTaskBoard":
      await updateTaskBoard(boardId, { title, description });
      return redirect(`/${boardId}`);

    case "create":
      if (
        typeof title !== "string" ||
        typeof iconPath !== "string" ||
        typeof status !== "string"
      ) {
        return json({ error: "Invalid Form Data" }, { status: 400 });
      }

      const errors = {
        title: validateInput(title),
        iconPath: validateSelectOption(iconPath, "an icon"),
        status: validateSelectOption(status, "a status"),
      };

      if (Object.values(errors).some(Boolean)) {
        return json(
          { errors, fields: { title, description, iconPath, status } },
          { status: 400 }
        );
      }

      await addTask({
        title,
        description,
        iconPath,
        status,
        taskBoardId: boardId,
      });
      return redirect(`/${boardId}`);

    case "updateTask":
      await updateTask(taskId, {
        title,
        description,
        iconPath,
        status,
        taskBoardId: boardId,
      });
      return redirect(`/${boardId}`);

    case "deleteTask":
      await deleteTask(taskId);
      return redirect(`/${boardId}`);

    default:
      return json({ error: `Invalid Form Data` }, { status: 400 });
  }
};

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();

  const [taskBoardData, setTaskBoardData] = useState({
    title: loaderData?.title || "",
    description: loaderData?.description || "",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaskBoardData({
      ...taskBoardData,
      [name]: value,
    });
  };

  return (
    <div className="w-2/4 m-auto py-6">
      <Header
        title={taskBoardData.title}
        description={taskBoardData.description}
        onChangeHandler={onChangeHandler}
      />
      <Tasks tasks={loaderData?.tasks as Task[]} />
      <div
        className="flex items-center gap-4 p-4 rounded-xl cursor-pointer bg-[#F5E8D5] mt-4"
        onClick={toggleSidebar}
      >
        <div className="w-12 h-12 bg-[#E9A23B] flex justify-center items-center rounded-xl">
          <img
            src={`/assets/Add_round_duotone.svg`}
            alt={"add-task-icon"}
            className="w-1/2 h-1/2"
          />
        </div>
        <h2 className="text-xl font-semibold flex-1">Add new task</h2>
      </div>

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </div>
  );
}
