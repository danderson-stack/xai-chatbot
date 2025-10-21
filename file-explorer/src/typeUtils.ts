import type { FileNode, FolderNode, Node } from "./types";

// ------- Type guards -------
export const isFile = (n: Node): n is FileNode => n.type === "file";
export const isFolder = (n: Node): n is FolderNode => n.type === "folder";


// -------- Safe factories --------
export function file(name: string, content: string): FileNode {
    return { type: "file", name, content, id: crypto.randomUUID() };
}
  
export function folder(
    name: string,
    children: Node[] = []
): FolderNode {
    return { type: "folder", name, children, id: crypto.randomUUID() };
}
