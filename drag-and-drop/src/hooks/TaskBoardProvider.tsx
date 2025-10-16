import { TaskBoardContext } from "./TaskBoardContext";
import { useTaskBoardData } from "./useTaskBoardData";

export function TaskBoardProvider({ children }: { children: React.ReactNode }) {
  const value = useTaskBoardData();
  return (
    <TaskBoardContext.Provider value={value}>
      {children}
    </TaskBoardContext.Provider>
  );
}
