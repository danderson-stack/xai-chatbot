import type { ColumnType, TaskBoardData } from "./types";


export const columnTypes = [
    { value: "not-started", label: "Not Started" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "blocked", label: "Blocked" },
    { value: "in-qa", label: "In QA" },
  ] satisfies { value: ColumnType; label: string }[];

export const initialEmptyBoard: TaskBoardData = {
    columns: [
      {
        id: 'column-1',
        title: "Not Started",
        type: "not-started",
        tasks: [],
      },
      {
        id: 'column-2',
        title: "In Progress",
        type: "in-progress",
        tasks: [
        ],
      },
      {
        id: 'column-3',
        title: "Blocked",
        type: "blocked",
        tasks: [],
      },
      {
        id: 'column-4',
        title: "In QA",
        type: "in-qa",
        tasks: [],
      },
      {
        id: 'column-5',
        title: "Completed",
        type: "completed",
        tasks: [],
      },
    ],
  } satisfies TaskBoardData;