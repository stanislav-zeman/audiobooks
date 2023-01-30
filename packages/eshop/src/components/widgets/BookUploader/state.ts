import type { BookView } from "@utils/bookView";
import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";

export const newBookStore = createStore<
  Omit<Partial<BookView>, "id" | "is_owned" | "cover_url"> & {
    cover?: File;
    files?: File[];
  }
>({
  description: "",
  price: 0,
  isbn: "",
  name: "",
  tag: "",
  authors: "",
});

export const newBookStep = createSignal(0);
