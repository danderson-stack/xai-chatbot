import Column from "./Column";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { useTaskBoard } from "../hooks/TaskBoardContext";
import styled from "styled-components";

const StyledLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-size: 24px;
  font-weight: 600;
`;

export default function TaskBoard() {
  const { board, updateTask, isLoading } = useTaskBoard();

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const sourceColumn = board.columns.find(
      (column) => column.id === source.droppableId
    );
    const destinationColumn = board.columns.find(
      (column) => column.id === destination.droppableId
    );
    if (!sourceColumn || !destinationColumn) {
      return;
    }
    updateTask(source, destination);
  };

  return (
    <div className="task-board">
      {isLoading ? (
        <StyledLoadingContainer>
          <span>Loading...</span>
        </StyledLoadingContainer>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          {board.columns.map((column) => {
            return <Column key={column.id} column={column} />;
          })}
        </DragDropContext>
      )}
    </div>
  );
}
