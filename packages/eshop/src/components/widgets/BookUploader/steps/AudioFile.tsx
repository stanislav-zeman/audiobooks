import { Component, createSignal } from "solid-js";
import { newBookStep, newBookStore } from "../state";

export interface AudioFileProps {}
export type AudioFileType = Component<AudioFileProps>;

export const AudioFile: AudioFileType = () => {
  const [book, setBook] = newBookStore;
  const [, setStep] = newBookStep;

  const [chapters, setChapters] = createSignal<File[]>([]);

  const handleInput = (e: InputEvent) => {
    const files = (e.currentTarget as HTMLInputElement).files;

    if (!files) return;

    for (const file of files) {
      setChapters((c) => [...c, file]);
    }
  };

  const removeChapter = (chapter: File) => {
    setChapters((c) => c.filter((c) => c !== chapter));
  };

  const handleSubmit = (_: Event) => {
    setBook((b) => ({ ...b, files: chapters() }));
    setStep((s) => s + 1);
  };

  return (
    <>
      <div class="flex gap-5 flex-wrap">
        {chapters().map((chapter) => (
          <div
            class="flex items-center p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
            role="alert"
          >
            <div class="ml-3 text-sm font-normal">
              {chapter.name} ({Math.round(chapter.size / 1000)} kB)
            </div>
            <button
              onClick={() => removeChapter(chapter)}
              type="button"
              class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              data-dismiss-target="#toast-success"
              aria-label="Close"
            >
              <span class="sr-only">Close</span>
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        ))}
      </div>
      <div class="flex items-center justify-center w-full">
        <label
          for="dropzone-file"
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
              <span class="font-semibold">Click to upload</span> a book chapter
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Only .mp3 files are supported, the filename will be used as the
              chapter title.
            </p>
          </div>
          <input
            onInput={handleInput}
            id="dropzone-file"
            type="file"
            multiple
            accept=".mp3,audio/*"
            class="sr-only"
            required
          />
        </label>
      </div>
      <button
        onClick={handleSubmit}
        class="mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Confirm selection
      </button>
    </>
  );
};
