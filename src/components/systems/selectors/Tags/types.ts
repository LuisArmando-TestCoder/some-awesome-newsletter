/** A topic in the tag tree. Leaves have no children. */
export type TagTreeNode = { name: string; children?: TagTreeNode[] };
