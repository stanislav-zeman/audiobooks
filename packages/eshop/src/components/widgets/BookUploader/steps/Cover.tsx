import { Component, createSignal, Show } from "solid-js";
import { newBookStep, newBookStore } from "../state";

export interface CoverProps {}
export type CoverType = Component<CoverProps>;

export const Cover: CoverType = () => {
  const [, setBook] = newBookStore;
  const [, setStep] = newBookStep;

  const [coverUrl, setCoverUrl] = createSignal<string | undefined>();

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const data = new FormData(e.target as HTMLFormElement);
    const file = data.get("cover") as File;

    setBook((b) => ({ ...b, cover: file, coverUrl: coverUrl() }));
    setStep((s) => s + 1);
  };
  const handleInput = (e: InputEvent) => {
    const file = (e.target as HTMLInputElement).files?.item(0);

    if (!file) {
      setCoverUrl(undefined);
      return;
    }

    const coverUrl = URL.createObjectURL(file);
    setCoverUrl(coverUrl);
  };

  return (
    <form
      class="flex flex-col justify-center w-full gap-6"
      onsubmit={handleSubmit}
    >
      <Show when={coverUrl()}>
        <img
          class="mx-auto h-auto max-w-xl rounded-lg shadow-xl dark:shadow-gray-800"
          src={coverUrl()!}
          alt="image description"
        />
      </Show>

      <label
        for="cover"
        class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            aria-hidden="true"
            class="w-10 h-10 mb-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span class="font-semibold">Click to upload</span> a cover image
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input
          onInput={handleInput}
          id="cover"
          name="cover"
          type="file"
          class="hidden"
        />
      </label>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Next
      </button>
    </form>
  );
};
