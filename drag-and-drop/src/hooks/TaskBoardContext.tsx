import { createContext, useContext } from "react";
import type { useTaskBoardData } from "./useTaskBoardData";

type TaskBoardContextValue = ReturnType<typeof useTaskBoardData>;

export const TaskBoardContext = createContext<TaskBoardContextValue | null>(
  null
);

export function useTaskBoard() {
  const ctx = useContext(TaskBoardContext);
  if (!ctx)
    throw new Error("useTaskBoard must be used within TaskBoardProvider");
  return ctx;
}
