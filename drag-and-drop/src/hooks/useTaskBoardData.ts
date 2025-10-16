import type { TaskBoardData } from "../types";
import { useState } from "react";
import { initialEmptyBoard } from "../consts";
import { useEffect } from "react";

export function useTaskBoardData() {
    const [board, setBoard] = useState<TaskBoardData>(initialEmptyBoard);
    const [isLoading, setIsLoading] = useState(true);
    
    
    useEffect(() => {
        setTimeout(() => {
            const stored = localStorage.getItem("taskBoard");
            if (stored) {
                try {
                    const parsed: TaskBoardData = JSON.parse(stored);
                    setBoard(parsed);
                } catch (error) {
                    console.error("Error parsing board from localStorage:", error);
                    setBoard(initialEmptyBoard);
                }
            } else {
                setBoard(initialEmptyBoard);
            }
            setIsLoading(false);
        }, 700); // Simulate loading for 700ms so loading UI appears
    }, []);
    
    function loadBoardFromLocalStorage(): TaskBoardData {
        const stored = localStorage.getItem("taskBoard");
        if (!stored) return board ?? initialEmptyBoard;
        try {
            return JSON.parse(stored) as TaskBoardData;
        } catch (error) {
            console.error("Error parsing board from localStorage:", error);
            return board ?? initialEmptyBoard;
        }
    }

    function persistBoard(next: TaskBoardData) {
        try {
            localStorage.setItem("taskBoard", JSON.stringify(next));
        } catch (error) {
            console.error("Error saving board to localStorage:", error);
        }
        setBoard(next);
    }

    function updateTask(
      source: { droppableId: string; index: number },
      destination: { droppableId: string; index: number }
    ) {
      const current = loadBoardFromLocalStorage();
      const columns = current?.columns?.map((col) => ({
          ...col,
          tasks: [...col.tasks],
      }));

      const sourceColumnIndex = columns.findIndex((col) => col.id === source.droppableId);
      const destColumnIndex = columns.findIndex((col) => col.id === destination.droppableId);

      if (sourceColumnIndex === -1 || destColumnIndex === -1) {
          return;
      }

      const sourceTasks = columns[sourceColumnIndex].tasks;
      const destTasks = columns[destColumnIndex].tasks;

      const [movedTask] = sourceTasks.splice(source.index, 1);
      if (!movedTask) {
          return;
      }

      destTasks.splice(destination.index, 0, movedTask);

      columns[sourceColumnIndex].tasks = sourceTasks;
      columns[destColumnIndex].tasks = destTasks;

      const nextBoard: TaskBoardData = { ...current, columns };
      persistBoard(nextBoard);
    }

    /** Add a new task to a specific column */
    function addTask(columnType: string, content: string) {
        const current = loadBoardFromLocalStorage();
        const columns = current?.columns?.map(col => {
            if (col.type === columnType) {
                return { ...col, tasks: [...col.tasks, { id: crypto.randomUUID(), content }] };
            }
            return col;
        });
        const nextBoard: TaskBoardData = { ...current, columns };
        persistBoard(nextBoard);
    }

    return { board, updateTask, addTask, isLoading };
}