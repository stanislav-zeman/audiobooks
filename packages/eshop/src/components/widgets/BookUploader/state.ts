import type { BookView } from "@utils/bookView";
import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";

export const newBookStore = createStore<
  Omit<Partial<BookView>, "id" | "is_owned"> & {
    cover?: File;
    files?: File[];
  }
>({
  authors: [],
  description: "",
  price: 0,
  chapters: [],
  cover_url: "",
  file_url: "",
  isbn: "",
  name: "",
  tag: "",
  length: 0,
});

export const newBookStep = createSignal(0);
