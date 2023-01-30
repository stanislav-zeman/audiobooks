import type { BookView } from "@utils/bookView";
import {
  Component,
  createComputed,
  createSignal,
  Match,
  Switch,
} from "solid-js";
import { Cover } from "./steps/Cover";
import { Meta } from "./steps/Meta";
import { newBookStore, newBookStep } from "./state";
import { AudioFile } from "./steps/AudioFile";
import { Review } from "./steps/Review";

export type BookUploaderProps = {
  categories: string[];
};
export type BookUploaderType = Component<BookUploaderProps>;

export const BookUploader: BookUploaderType = ({ categories }) => {
  const [step] = newBookStep;

  return (
    <Switch>
      <Match when={step() === 0}>
        <h1 class="text-center mb-14 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Fill in the metadata
        </h1>
        <Meta categories={categories} />
      </Match>
      <Match when={step() === 1}>
        <h1 class="text-center mb-14 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Select a cover image
        </h1>
        <Cover />
      </Match>
      <Match when={step() === 2}>
        <h1 class="text-center mb-14 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Upload chapter files
        </h1>
        <AudioFile />
      </Match>
      <Match when={step() === 3}>
        <h1 class="text-center mb-14 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Review
        </h1>
        <Review />
      </Match>
    </Switch>
  );
};
