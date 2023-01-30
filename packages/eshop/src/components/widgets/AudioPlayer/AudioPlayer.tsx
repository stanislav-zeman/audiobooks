import type { BookView, ChapterView } from "@utils/bookView";
import {
  Component,
  For,
  createSignal,
  JSXElement,
  Match,
  Switch,
  Show,
} from "solid-js";

export type Slots = {
  rotateIcon: JSXElement;
  playIcon: JSXElement;
};

export type AudioPlayerProps = {
  book: BookView;
  chapters: ChapterView[];
};

export type AudioPlayerType = Component<AudioPlayerProps>;

export const AudioPlayer: AudioPlayerType = ({ book, chapters, ..._slots }) => {
  const slots = _slots as Slots;

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
                  fallback={slots.playIcon}
                >
                  {slots.rotateIcon}
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
