import { normalize } from "../utils";

interface TrieNode {
  children: Record<string, TrieNode>;
  isWord: boolean;
  original?: string;
}

class Trie {
  root: TrieNode;
  constructor() {
    this.root = { children: {}, isWord: false };
  }

  insert(word: string): void {
    const norm = normalize(word);
    let node = this.root;
    for (const ch of norm) {
      node.children[ch] ??= { children: {}, isWord: false };
      node = node.children[ch];
    }
    node.isWord = true;
    node.original = word; // store the display label
  }

  getWordsWithPrefix(prefix: string, limit?: number): string[] {
    const q = normalize(prefix);
    if (!q) return []; // keep your “empty → no suggestions” behavior

    // Walk down to the node matching the prefix
    let node: TrieNode | undefined = this.root;
    for (const ch of q) {
      node = node.children[ch];
      if (!node) return [];
    }

    // DFS from there, collecting originals
    const out: string[] = [];
    const stack: Array<[TrieNode]> = [[node]];
    while (stack.length) {
      const [n] = stack.pop()!;
      if (n.isWord && n.original) {
        out.push(n.original);
        if (limit && out.length >= limit) break;
      }
      // deterministic-ish order: a..z then space/apostrophe/hyphen
      for (const [, child] of Object.entries(n.children).sort()) {
        stack.push([child]);
      }
    }
    return out;
  }
}

export function buildTrie(countries: string[]) {
  const trie = new Trie();
  for (const c of countries) trie.insert(c);
  return trie;
}
