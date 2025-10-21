import { useState } from "react";
import type { FolderNode, FileNode } from "../types";
import { isFolder, isFile } from "../typeUtils";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import File from "./File";
import styled from "styled-components";
import { StyledNode, StyledIcon } from "./sharedStyles";

const StyledFolder = styled(StyledNode)<{ depth?: number }>`
  padding-left: ${(props) => (props.depth ? `${props.depth * 10}px` : "0")};
`;

interface FolderProps {
  folder: FolderNode;
  onFileClick: (fileNode: FileNode) => void;
  isRoot?: boolean;
  selectedFileId: string | null;
  depth?: number;
}

export default function Folder({
  folder,
  isRoot = false,
  onFileClick,
  selectedFileId,
  depth = 0,
}: FolderProps) {
  const [isExpanded, setIsExpanded] = useState(isRoot ? true : false);

  return (
    <div>
      <StyledFolder depth={depth} onClick={() => setIsExpanded(!isExpanded)}>
        <StyledIcon>
          {isExpanded ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
        </StyledIcon>
        {folder.name}
      </StyledFolder>
      {isExpanded &&
        folder.children.map((child) => {
          if (isFolder(child)) {
            return (
              <Folder
                selectedFileId={selectedFileId}
                key={child.name}
                folder={child}
                onFileClick={onFileClick}
                depth={depth + 1}
              />
            );
          } else if (isFile(child)) {
            return (
              <File
                selectedFileId={selectedFileId}
                key={child.name}
                file={child}
                onFileClick={onFileClick}
                depth={depth + 1}
              />
            );
          }
          return null;
        })}
    </div>
  );
}
