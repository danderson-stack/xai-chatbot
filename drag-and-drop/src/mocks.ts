import type { TaskBoardData } from "./types";

export const initialBoard = {
    columns: [
      {
        id: 'column-1',
        title: "Not Started",
        type: "not-started",
        tasks: [
          {
            id: crypto.randomUUID(),
            content: "Take out the trash",
          },
          {
            id: crypto.randomUUID(),
            content: "Buy groceries",
          },
          {
            id: crypto.randomUUID(),
            content: "Clean the house",
          },
        ],
      },
      {
        id: 'column-2',
        title: "In Progress",
        type: "in-progress",
        tasks: [
          {
            id: crypto.randomUUID(),
            content: "Write a blog post",
          },
        ],
      },
      {
        id: 'column-3',
        title: "Completed",
        type: "completed",
        tasks: [
          {
            id: crypto.randomUUID(),
            content: "Finish the project",
          },
        ],
      },
    ],
  } satisfies TaskBoardData;