import { Modal } from "antd";
import { useModal } from "@ebay/nice-modal-react";
import { useTaskBoard } from "../hooks/TaskBoardContext";
import { useState } from "react";
import { columnTypes } from "../consts";
import type { ColumnType } from "../types";

export default function CreateTaskModal() {
  const modal = useModal();

  const [selectedColumnType, setSelectedColumnType] = useState<ColumnType>(
    columnTypes[0].value
  );
  const [taskContent, setTaskContent] = useState("");
  const { addTask } = useTaskBoard();

  function addNewTask(e: React.FormEvent) {
    e.preventDefault();
    setSelectedColumnType(columnTypes[0].value);
    addTask(selectedColumnType, taskContent);
    setTaskContent("");
    modal.hide();
  }

  return (
    <Modal
      title="Hello Antd"
      open={modal.visible}
      okText="Add new task"
      onOk={addNewTask}
      okButtonProps={{ disabled: !taskContent.trim() }}
      onCancel={() => modal.hide()}
      afterClose={() => modal.remove()}
    >
      <label>
        Column:
        <select
          value={selectedColumnType}
          onChange={(e) => setSelectedColumnType(e.target.value as ColumnType)}
          style={{ width: "100%", marginTop: "4px" }}
        >
          {columnTypes.map((col) => (
            <option key={col.value} value={col.value}>
              {col.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        Task Content:
        <input
          type="text"
          value={taskContent}
          onChange={(e) => setTaskContent(e.target.value)}
          placeholder="Enter task details..."
          style={{ width: "100%", marginTop: "4px" }}
        />
      </label>
    </Modal>
  );
}
