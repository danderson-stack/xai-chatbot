import type { TaskData } from "../types";
import { Draggable, type DraggableProvided } from "@hello-pangea/dnd";

export default function Task({
  task,
  index,
}: {
  task: TaskData;
  index: number;
}) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided: DraggableProvided) => (
        <div
          className="task"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
}
