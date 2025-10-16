
export interface TaskData {
    id: string;
    content: string;
}

export type ColumnType = "not-started" | "in-progress" | "blocked" | "in-qa" | "completed";

export const ColumnTypes: ColumnType[] = ["not-started", "in-progress", "blocked", "in-qa", "completed"];

export interface ColumnData {
    id: string;
    title: string;
    tasks: TaskData[];
    type: ColumnType;
}

export interface TaskBoardData {
    columns: ColumnData[];
}
