import "./App.css";
import NiceModal from "@ebay/nice-modal-react";
import TaskBoard from "./components/TaskBoard";
import CreateTaskModal from "./components/CreateTaskModal";
import { useModal } from "@ebay/nice-modal-react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { TaskBoardProvider } from "./hooks/TaskBoardProvider";

NiceModal.register("create-task-modal", NiceModal.create(CreateTaskModal));

const Header = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  margin: auto;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
`;

function App() {
  const modal = useModal("create-task-modal");

  return (
    <TaskBoardProvider>
      <NiceModal.Provider>
        <Header>
          <Title>Drag and Drop</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              modal.show();
            }}
          />
        </Header>
        <TaskBoard />
      </NiceModal.Provider>
    </TaskBoardProvider>
  );
}

export default App;
