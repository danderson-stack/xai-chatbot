import styled from "styled-components";
import type { FolderNode, FileNode } from "../types";
import Folder from "./Folder";

const StyledFileTree = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  gap: 2px;
`;

interface FileTreeProps {
  onFileClick: (fileNode: FileNode) => void;
  rootFolder: FolderNode;
  selectedFileId: string | null;
}

export default function FileTree({
  onFileClick,
  rootFolder,
  selectedFileId,
}: FileTreeProps) {
  return (
    <StyledFileTree>
      <Folder
        folder={rootFolder}
        isRoot={true}
        onFileClick={onFileClick}
        selectedFileId={selectedFileId}
      />
    </StyledFileTree>
  );
}
