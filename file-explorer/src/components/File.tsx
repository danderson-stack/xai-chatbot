import type { FileNode } from "../types";
import styled from "styled-components";
import { FaFile, FaCheck } from "react-icons/fa";
import { StyledNode, StyledIcon } from "./sharedStyles";

const StyledFile = styled(StyledNode)<{ depth?: number }>`
  padding-left: ${(props) => `${((props.depth ?? 0) + 1) * 10}px`};
`;

interface FileProps {
  file: FileNode;
  onFileClick: (fileNode: FileNode) => void;
  selectedFileId: string | null;
  depth: number;
}

export default function File({
  file,
  onFileClick,
  selectedFileId,
  depth,
}: FileProps) {
  return (
    <StyledFile depth={depth} key={file.name} onClick={() => onFileClick(file)}>
      <StyledIcon>
        <FaFile size={16} />
      </StyledIcon>
      {file.name}
      {selectedFileId === file.id && (
        <StyledIcon>
          <FaCheck size={16} />
        </StyledIcon>
      )}
    </StyledFile>
  );
}
