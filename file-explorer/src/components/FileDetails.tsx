import styled from "styled-components";
import type { FileNode } from "../types";

const NoFileSelected = styled.div`
  display: flex;
  flex-grow: 1;
  height: 100%;
  border: 1px solid #ccc;
  justify-content: center;
  align-items: center;
`;

const StyledFileDetails = styled.div`
  display: flex;
  flex-grow: 1;
  height: 100%;
  border: 1px solid #ccc;
`;

interface FileDetailsProps {
  selectedFile: FileNode | null;
}

export default function FileDetails({ selectedFile }: FileDetailsProps) {
  if (selectedFile === null) {
    return <NoFileSelected>No file selected</NoFileSelected>;
  }
  return (
    <StyledFileDetails>
      <pre>{selectedFile.content}</pre>
    </StyledFileDetails>
  );
}
