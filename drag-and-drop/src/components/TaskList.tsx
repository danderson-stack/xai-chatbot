import { Droppable, type DroppableProvided } from "@hello-pangea/dnd";
import type { TaskData } from "../types";
import Task from "./Task";

export default function TaskList({
  tasks,
  id,
}: {
  tasks: TaskData[];
  id: string;
}) {
  return (
    <Droppable droppableId={id}>
      {(provided: DroppableProvided) => (
        <div
          className="task-list"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
