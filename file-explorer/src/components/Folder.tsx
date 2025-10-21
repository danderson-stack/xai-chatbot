import { useState } from "react";
import type { FolderNode, FileNode } from "../types";
import { isFolder, isFile } from "../typeUtils";
import { FaChevronUp, FaChevronDown, FaFile, FaCheck } from "react-icons/fa";
import styled from "styled-components";

const StyledFolder = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 2px;
  border: 1px solid #ccc;
  cursor: pointer;
`;

const StyledIcon = styled.div`
  display: flex;
  margin-right: 10px;
  margin-left: 10px;
  align-items: center;
  justify-content: center;
`;

export default function Folder({
  folder,
  isRoot = false,
  onFileClick,
  selectedFileId,
}: {
  folder: FolderNode;
  onFileClick: (fileNode: FileNode) => void;
  isRoot?: boolean;
  selectedFileId: string | null;
}) {
  const [isExpanded, setIsExpanded] = useState(isRoot ? true : false);

  return (
    <div>
      <StyledFolder onClick={() => setIsExpanded(!isExpanded)}>
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
              />
            );
          } else if (isFile(child)) {
            return (
              <StyledFolder key={child.name} onClick={() => onFileClick(child)}>
                <StyledIcon>
                  <FaFile size={16} />
                </StyledIcon>
                {child.name}
                {selectedFileId === child.id && (
                  <StyledIcon>
                    <FaCheck size={16} />
                  </StyledIcon>
                )}
              </StyledFolder>
            );
          }
          return null;
        })}
    </div>
  );
}
