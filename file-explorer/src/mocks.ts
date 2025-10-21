import { folder, file } from "./typeUtils.ts";
import type { FolderNode } from "./types";

export const mockFolder: FolderNode = folder("root", [
    folder("folder1", [
      file("file3", "file3 content"),
      file(
        "file1",
        `<div>Hello, world!
    <p>This is a paragraph 123.</p>
    </div>`
      ),
      file(
        "file2",
        `<div>Hello, world!
    <p>This is a paragraph 234.</p>
    </div>`
      ),
    ]),
  ]);


export const mockFiles = [
    "src/components/utils/FileTree.tsx",
    "src/components/FileDetails.tsx",
    "src/components/FileExplorer.tsx",
    "src/types.ts",
    "src/typeUtils.ts",
    "src/folderUtils.ts",
    "src/mocks.ts",
    "src/App.tsx",
    "src/index.tsx",
    // For Testing...
    // 'notSrc/index.tsx',
    // '/src/EmptyFile.tsx',
]