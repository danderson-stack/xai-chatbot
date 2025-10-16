import type { ColumnData } from "../types";
import TaskList from "./TaskList";

export default function Column({ column }: { column: ColumnData }) {
  return (
    <div className={`column-container column-${column.type}`}>
      <h3>{column.title}</h3>
      <TaskList id={column.id} tasks={column.tasks} />
    </div>
  );
}
