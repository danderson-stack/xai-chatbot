// Discriminator
// type FileOrFolderType = "file" | "folder";

// Leaf/file node: may NOT have `children`
export type FileNode = {
  id: string;
  type: "file";
  name: string;
  content: string;
  children?: never;
};

// Folder node: may NOT have `content`
export type FolderNode = {
  id: string;
  type: "folder";
  name: string;
  children: Node[];
  content?: never;
};

// The union
export type Node = FileNode | FolderNode;
