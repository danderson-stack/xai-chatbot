import type { FileNode, FolderNode, FileOrFolder } from "./types";

// ------- Type guards -------
export const isFile = (n: FileOrFolder): n is FileNode => n.type === "file";
export const isFolder = (n: FileOrFolder): n is FolderNode => n.type === "folder";


// -------- Safe factories --------
export function file(name: string, content: string): FileNode {
    return { type: "file", name, content, id: crypto.randomUUID() };
}
  
export function folder(
    name: string,
    children: FileOrFolder[] = []
): FolderNode {
    return { type: "folder", name, children, id: crypto.randomUUID() };
}
