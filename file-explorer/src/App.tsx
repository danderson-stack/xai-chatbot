import "./App.css";
import styled from "styled-components";
import FileExplorer from "./components/FileExplorer";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  margin: auto;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 800;
  margin: 0;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 20px);
  width: calc(100vw - 20px);
  padding: 10px;
`;

function App() {
  return (
    <AppContainer>
      <Header>
        <Title>File Explorer</Title>
      </Header>
      <FileExplorer />
    </AppContainer>
  );
}

export default App;
