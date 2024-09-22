import { redirect } from "@remix-run/node";

import { createTaskBoard } from "~/utils/task.server";

export const loader = async () => {
  const response = await createTaskBoard();
  return redirect(`/${response?.id}`)
}
