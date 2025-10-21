import type { FolderNode, FileNode, Node } from "./types";
import { isFile } from "./typeUtils";
import { folder, file } from "./typeUtils";


/** Used to make sure the first file provided is preSelected by the builder */
export const getFirstFile = (folder: FolderNode): FileNode | null => {
    const children = folder.children;
    for (const child of children) {
      if (isFile(child)) {
        return child;
      }
    }
    if (children.length > 0) {
      return getFirstFile(children[0] as FolderNode);
    } else {
      return null;
    }
  };


// ===== Public API =====
/**
 * Build a folder tree from a list of file paths.
 * - All paths must share a single root segment.
 * - Throws on path conflicts (file↔folder) or duplicate files.
 */
// export function getFolderStructureFromFiles(files: string[]): FolderNode {
//   if(files.length === 0) {
//     throw new Error(
//       "We must have at least 1 file in the project directory"
//     )
//   }
//   const roots: string[] = files.map(p=>split(p)[0])
//   if(roots.length !== 1) {
//     throw new Error(
//       `There must be only 1 root in the array. Roots: ${roots.join(', ')}`
//     )
//   }
//   const rootName = roots[0];


//   // TODO: initialize root FolderNode
//   const rootFolder = folder(rootName, [])

//   // Internal indices (you fill how they’re used):
//   // - Map from FULL folder path -> FolderNode (prevents collisions)
//   // - Map from FolderNode -> Map<childName, Node> (fast child lookup)
//   const folderByFullPath = new Map<string, FolderNode>();
//   const childIndex = new Map<FolderNode, Map<string, Node>>();

//   // TODO: register root in both maps
//   folderByFullPath.set(rootName, rootFolder);
//   childIndex.set(rootFolder, new Map<string, Node>())

//   // Helpers you’ll implement (below)
//   const split = (p: string) => p.split('/').filter(Boolean);

//   const ensureFolder = (
//     parent: FolderNode,
//     parentFullPath: string,
//     segment: string
//   ): FolderNode => {
//     // - look up child by name via childIndex.get(parent)
//     const index = childIndex.get(parent);

//     const idx = index?.get(parentFullPath);
//     // - if exists:
//     if(idx) {
//       if(isFile(idx)) {
//         throw new Error("This folder is already saved as a file!")
//       } else {
//         return idx;
//       }
//     } else {
//       const newFolder = folder(segment, []);
//       parent.children.push(newFolder);
//       index?.set(parentFullPath, newFolder)
//       folderByFullPath.set(parentFullPath, newFolder);
//       return newFolder;
//     }
//   };

//   const addPath = (filePath: string, rootName: string, root: FolderNode) => {
//     // TODO:
//     const segments = filePath.split('/').filter(Boolean);

//     if(segments[0] !== rootName) {
//       throw new Error("Root does not match!")
//     }
//     let currSegment = rootName;
//     let currParent = rootFolder;
//     for(let i = 1; i<segments.length-2; i++) {
//       currSegment = currSegment.concat(segments[i])
//       const nextFolder = ensureFolder(currParent, currSegment, segments[i])
//       currParent = nextFolder;
//     }

//     const newFile = file(segments[segments.length-1], "")
//     // if(childIdx.get(newFile,))
//     currParent.children.push(newFile);
//     // folderByFullPath.set(newFile.name, )
//     // - split segments
//     // - verify first segment === rootName (throw if mismatch)
//     // - walk intermediate segments with ensureFolder(...)
//     // - finally add file leaf:
//     //    - if name already exists and is folder -> throw
//     //    - if name already exists and is file  -> throw duplicate
//     //    - else create file node, push, index in childIndex
//   };

//   // TODO: loop over files and call addPath
//   for(const file of files) {
//     addPath(file, rootName, rootFolder);
//   }
//   // TODO: return root
//   return rootFolder;
// }



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

      for(let i = 1; i<parts.length-2; i++) {
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

