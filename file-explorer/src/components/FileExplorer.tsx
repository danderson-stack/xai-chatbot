import styled from "styled-components";
import FileTree from "./FileTree";
import FileDetails from "./FileDetails";
import { useEffect, useState } from "react";
// import { mockFolder } from "../mocks";
import { getFolderStructureFromFiles } from "../folderUtils";
import { mockFiles } from "../mocks";
import type { FolderNode, FileNode } from "../types";
import { getFirstFile } from "../folderUtils";

const StyledFileExplorer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export default function FileExplorer() {
  const [rootFolder] = useState<FolderNode>(
    getFolderStructureFromFiles(mockFiles)
  );
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);

  useEffect(() => {
    //set the first file as the selected file if no file is selected
    if (selectedFile === null) {
      //find the first file in the root folder
      const firstFile = getFirstFile(rootFolder);
      setSelectedFile(firstFile);
    }
  }, [selectedFile, rootFolder]);

  return (
    <StyledFileExplorer>
      <FileTree
        rootFolder={rootFolder}
        onFileClick={setSelectedFile}
        selectedFileId={selectedFile?.id ?? null}
      />
      <FileDetails selectedFile={selectedFile} />
    </StyledFileExplorer>
  );
}
