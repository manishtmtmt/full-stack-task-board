import { Task } from "@prisma/client";
import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";

import { Button } from "./Button";
import { Icons } from "./Icons";
import { Status } from "./Status";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  task?: Task;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  task,
}) => {
  const fetcher: any = useFetcher();

  const [formData, setFormData] = useState({
    title: task?.title ? task.title : "",
    description: task?.description ? task.description : "",
    iconPath: task?.iconPath ? task.iconPath : "",
    status: task?.status || "",
  });
  const [errors, setErrors] = useState(fetcher.data?.errors || {});

  const onChandleHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: undefined,
    });
  };

  const onSelectOption = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: undefined,
    });
  };

  useEffect(() => {
    if (fetcher.state === "submitting" && fetcher.data?.errors) {
      setErrors(fetcher.data.errors);
    } else if (fetcher.state === "submitting" && !fetcher.data) {
      setFormData({
        title: "",
        description: "",
        iconPath: "",
        status: "",
      });
      setIsSidebarOpen(false);
    }
  }, [fetcher.state, fetcher.data]);

  useEffect(() => {
    if (task && task?.id) {
      setFormData({
        title: task.title,
        description: task.description!,
        iconPath: task.iconPath,
        status: task.status,
      });
    }
  }, [task, task?.id]);

  return (
    <>
      <div
        className={`z-20 fixed top-0 right-0 h-screen w-2/5 flex items-center transform ${
          isSidebarOpen ? "-translate-x-4" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="w-full h-[96%] rounded-xl shadow-2xl bg-white px-6 py-2 flex flex-col">
          <div className="flex justify-between">
            <h1 className="font-semibold text-lg">
              {task ? "Task Details" : "Create Task"}
            </h1>
            <div
              className="rounded-md border border-gray-300 w-8 h-8 flex items-center justify-center cursor-pointer"
              onClick={() => setIsSidebarOpen(false)}
            >
              <img src="assets/close_ring_duotone-1.svg" alt="close-icon" />
            </div>
          </div>
          <fetcher.Form className="mt-2 flex-1" method="post">
            <div className="h-full flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="title"
                    className="text-sm font-semibold text-[#00000033]"
                  >
                    Task name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter task name"
                    name="title"
                    value={formData.title}
                    onChange={onChandleHandler}
                    className={`border w-full rounded-md p-2 focus:border-2 focus:border-[#3662E3] outline-none ${
                      errors?.title ? "border-red-600" : "border-[#00000033]"
                    }`}
                  />
                  {errors?.title && (
                    <span className="text-xs text-red-600 italic">
                      {errors.title}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="title"
                    className="text-sm font-semibold text-[#00000033]"
                  >
                    Task name
                  </label>
                  <textarea
                    placeholder="Enter a short description"
                    name="description"
                    value={formData.description}
                    onChange={onChandleHandler}
                    className={`border w-full rounded-md p-2 focus:border-2 focus:border-[#3662E3] outline-none ${
                      errors?.description
                        ? "border-red-600"
                        : "border-[#00000033]"
                    }`}
                    rows={4}
                  ></textarea>
                  {errors?.description && (
                    <span className="text-xs text-red-600 italic">
                      {errors.description}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-[#00000033]">
                    Icon
                  </span>
                  <Icons
                    selectedIcon={formData.iconPath}
                    onSelectOption={onSelectOption}
                  />
                  <input
                    type="hidden"
                    name="iconPath"
                    value={formData.iconPath}
                  />
                  {errors?.iconPath && (
                    <span className="text-xs text-red-600 italic">
                      {errors.iconPath}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-[#00000033]">
                    Status
                  </span>
                  <Status
                    selectedStatus={formData.status}
                    onSelectOption={onSelectOption}
                  />
                  <input type="hidden" name="status" value={formData.status} />
                  {errors?.status && (
                    <span className="text-xs text-red-600 italic">
                      {errors.status}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                {task ? (
                  <>
                    <input type="hidden" name="taskId" value={task.id} />
                    <Button
                      action="deleteTask"
                      content="Delete"
                      icon="Trash.svg"
                    />
                    <Button
                      action="updateTask"
                      content="Save"
                      icon="Done_round.svg"
                    />
                  </>
                ) : (
                  <Button
                    action="create"
                    content="Create"
                    icon="Done_round.svg"
                  />
                )}
              </div>
            </div>
          </fetcher.Form>
        </div>
      </div>

      <div
        className={`z-10 fixed top-0 left-0 h-screen w-screen bg-gray-900/30 ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      ></div>
    </>
  );
};
