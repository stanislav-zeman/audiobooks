import type { BookView } from "@utils/bookView";
import { Component, For, createSignal } from "solid-js";

export type AudioPlayerProps = {
  book: BookView;
};
export type AudioPlayerType = Component<AudioPlayerProps>;

export const AudioPlayer: AudioPlayerType = ({ book }) => {
  const [currectSource, setCurrentSource] = createSignal(book.file_url);

  const chapters = book.chapters.sort((a, b) => a.start - b.start).map((chapter, i) => {
    let link: string = "";

      if (book.file_url.startsWith("https://www.archive.org")) {
        const url = book.file_url;
        if (url.includes("_00_")) {
          link = url.replace("_00_", i <= 9 ? "_0" + i + "_" : "_" + i + "_")
        } else if (url.includes("_0_")) {
          link = url.replace("_0_", i <= 9 ? "_0" + i + "_" : "_" + i + "_")
        } else if (url.includes("_01_")) {
          link = url.replace("_01_", i <= 8 ? "_0" + (i + 1) + "_" : "_" + (i + 1) + "_")
        } else if (url.includes("_1_")) {
          link = url.replace("_1_", "_" + (i + 1) + "_")
        }
      } else {
        // S3
      }
      
    return {chapter, link};
  });

  const changeSource = (link: string) => {
    setCurrentSource(link);
  };

  return (
  <div class="min-h-screen flex flex-col items-center justify-center p-8">
    <div class="max-w-xl bg-white rounded-lg shadow-lg overflow-hidden w-full">
      <div class="relative">
        <img
          src={book.cover_url}
          class="object-cover w-full aspect-auto max-h-44"/>
        <div class="absolute p-4 inset-0 flex flex-col justify-end bg-gradient-to-b from-transparent to-gray-900 backdrop backdrop-blur-5 text-white">
          <h3 class="font-bold">{book.authors.map(a => a.name).join(", ")}</h3>
          <span class="opacity-70">{book.name}</span>
        </div>
      </div>
      <div class="flex justify-between text-xs font-semibold text-gray-500 px-4 py-2">
        <video autoplay controls class="w-full h-10" src={currectSource()}>
        </video>
      </div>
      <ul class="text-xs sm:text-base divide-y border-t cursor-default text-gray-500">
      <For each={chapters}>{chapter =>
        <li class="flex items-center space-x-3 hover:bg-gray-100">
        <button class="p-3 hover:bg-green-500 group focus:outline-none" onClick={() => changeSource(chapter.link)}>
          <svg class="w-4 h-4 group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </button>
        <div class="flex-1">
          {chapter.chapter.chapter_name}
        </div>
      </li>
      }</For>
      </ul>
    </div>
  </div>)
};
