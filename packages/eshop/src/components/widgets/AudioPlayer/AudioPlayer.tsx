import type { BookView, ChapterView } from "@utils/bookView";
import { Component, createSignal, Show } from "solid-js";

export type AudioPlayerProps = {
  book: BookView;
  chapters: ChapterView[];
};

export type AudioPlayerType = Component<AudioPlayerProps>;

export const AudioPlayer: AudioPlayerType = ({ book, chapters, ..._slots }) => {
  const [currectSource, setCurrentSource] = createSignal(
    chapters[0]?.url || ""
  );

  return (
    <div class="min-h-screen flex flex-col items-center justify-center p-8">
      <div class="max-w-xl bg-white rounded-lg shadow-lg overflow-hidden w-full">
        <div class="relative">
          <img
            src={book.cover_url}
            class="object-cover w-full aspect-auto max-h-44"
          />
          <div class="absolute p-4 inset-0 flex flex-col justify-end bg-gradient-to-b from-transparent to-gray-900 backdrop backdrop-blur-5 text-white">
            <h3 class="font-bold">{book.authors}</h3>
            <span class="opacity-70">{book.name}</span>
          </div>
        </div>
        <div class="flex justify-between text-xs font-semibold text-gray-500 px-4 py-2">
          <video
            autoplay
            controls
            class="w-full h-10"
            src={currectSource()}
          ></video>
        </div>
        <ul class="text-xs sm:text-base divide-y border-t cursor-default text-gray-500">
          {chapters.map((chapter) => (
            <li class="flex items-center space-x-3 hover:bg-gray-100">
              <button
                class="p-3 hover:bg-blue-500 group focus:outline-none hover:text-white"
                onClick={() => setCurrentSource(chapter.url)}
              >
                <Show
                  when={currectSource() === chapter.url}
                  fallback={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M7 4v16l13 -8z"></path>
                    </svg>
                  }
                >
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 text-gray-200 animate-spin fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      ></path>
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>
                </Show>
              </button>
              <div class="flex-1">{chapter.name}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
