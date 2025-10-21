import type { FolderNode, FileNode, Node } from "./types";
import { isFile, isFolder } from "./typeUtils";
import { folder, file } from "./typeUtils";


/** Used to make sure the first file provided is preSelected by the builder */
export const getFirstFile = (folder: FolderNode): FileNode | null => {
    const children = folder.children;
    let firstFile = null;
    for (const child of children) {
      if (isFile(child)) {
        firstFile = child;
        break;
      }
    }
    if (children.length > 0 && firstFile === null) {
      for(const child of children) {
        if(isFolder(child)) {
          getFirstFile(child as FolderNode);
        }
        if(firstFile !== null) {
          break;
        }
      }
    }
    return firstFile;
  };


export function getFolderStructureFromFiles(files: string[]): FolderNode {
    if (!files.length) {
      throw new Error("Expected at least one file path.");
    }

    const split = (p: string) => p.split('/').filter(Boolean);
    const roots = new Set(files.map((p)=>split(p)[0]))
    if(roots.size !== 1) {
      throw new Error(
        `All Files must exactly have 1 root. Rootes found: ${[...roots].join(', ')}`
      )
    }
    const [rootName] = [...roots];
    const root = folder(rootName, []);

    //root the full path src/components to the folderName (src/components/utils)
    const folderByFullPath = new Map<string, Node>([[rootName, root]]);

    //per-folder child-name index (fast lookup while building)
    const childIndex = new Map<FolderNode, Map<string, Node>>([[root, new Map()]]);


    // ensure that the parent folder already exists
    const ensureFolder = (fullPath: string, name: string, parent: FolderNode): FolderNode =>{
      const idx = childIndex.get(parent);

      const existing = idx?.get(name);

      if(existing) {
        if(existing.type !== "folder") {
          throw new Error(
            `Path conflict: attempted to create afolder at ${fullPath}, but a File Already exists there`
          )
        }
        return existing  
      }
      //else create a new folder there
      const newFolder = folder(name, []);
      //once we create a new folder, we want to return that folder pretty much
      folderByFullPath.set(fullPath, newFolder);
      parent.children.push(newFolder);
      idx?.set(name, newFolder);
      childIndex.set(newFolder, new Map());
      return newFolder;
    }

    const addPath = (filePath: string)=>{
      //double check that the root matches the rootName, otherwise throw an error
      const parts = filePath.split('/');
      if (parts[0] !== rootName) {
        throw new Error(
          `Mismatched root for "${filePath}". Expected root "${rootName}", got "${parts[0]}".`
        );
      }

      // Walk/create folders for all segments except the last (the file)
      let current = root;
      let currentFull = rootName;

      for(let i = 1; i<parts.length-1; i++) {
        const segment = parts[i];
        currentFull = `${currentFull}/${segment}`;
        current = ensureFolder(currentFull, segment, current)
      }

      //add the file!
      const leaf = parts[parts.length-1];
      const idx = childIndex.get(current);

      const newFile = file(leaf, "");
      current.children.push(newFile);
      idx?.set(leaf, newFile);
    }

    for(const p of files) addPath(p)

    console.log(childIndex, folderByFullPath)

    return root;
}


// Given a large list (10 000+ items), how would you efficiently render it in React?
// – Hint: virtualized lists (react-window, react-virtualized).

// I would use a virtualized list to render the large list.
// I would use the react-window library to render the list.
// I would use the react-virtualized library to render the list.
// I would use the react-window library to render the list.

