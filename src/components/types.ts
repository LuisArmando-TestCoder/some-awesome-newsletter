import type { SvelteComponent } from "svelte";

export type TextType =
  | "paragraph"
  | "sub-italic"
  | "sub-highlight-italic"
  | "highlight"
  | "title"
  | "subtitle";

export type TextNode = {
  text: string;
  type: TextType;
};

export type Block = {
  header: boolean;
  type?: TextType;
  text?: string;
  segments?: TextNode[];
};

export type Store = { [index: string]: any };

export type RevealMap = Map<(store: Store) => boolean, typeof SvelteComponent>;

export interface Country {
  code: string;
  name: string;
  flag: string;
}

export type Language = {
  code: string;
  name: string;
};

export interface Card {
  id: string;
  title: string;
  description?: string;
  selected: boolean;
}

export type ComponentSteps = [(store: Store) => boolean, SvelteComponent][];
