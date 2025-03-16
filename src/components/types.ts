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

export type Store = {
  value: number;
};

export type SvelteComp<
  P extends Record<string, any>,
  E extends Record<string, any>,
  S extends Record<string, any>,
  T = string
> = __sveltets_2_IsomorphicComponent<P, E, S, {}, T>;

export type RevealComponent = SvelteComp<
  { canReveal?: boolean },
  { [evt: string]: CustomEvent<any> },
  {}
>;

export type RevealMap = Map<(store: Store) => boolean, RevealComponent>;