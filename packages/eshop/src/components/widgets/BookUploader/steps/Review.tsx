import type { BookView } from "@utils/bookView";
import { Component, For, createSignal } from "solid-js";
import { newBookStore } from "../state";

export interface ReviewProps {}
export type ReviewType = Component<ReviewProps>;

export const Review: ReviewType = () => {
  const [book] = newBookStore;

  const [loading, setLoading] = createSignal(false);

  const handleConfirm = async () => {
    setLoading(true);

    const newId = await fetch("/api/get_id");
    const id = await newId.text();

    const requests = book.files?.map((file) =>
      fetch(`/api/uploads/${id}/${file.name}`, {
        method: "POST",
        body: file,
      })
    );

    if (!requests)
      return console.error("No files were uploaded. This should never happen.");

    try {
      await Promise.all(requests);

      await fetch("/api/create_book", {
        method: "POST",
        body: JSON.stringify({
          id,
          authors: book.authors,
          name: book.name,
          description: book.description,
          cover_url: book.cover_url,
          isbn: book.isbn,
          price: book.price,
          tag: book.tag,
          is_owned: false,
          length: 0,
        } as BookView),
      });
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
    window.location.href = `/product/${id}`;
  };

  return (
    <div>
      <div class="w-full flex flex-wrap justify-center px-10 gap-5 my-20">
      <div class="max-w-xs">
        <h2 class="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
        >{book.name}</h2>
        <p class="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 dark:text-white"
        >
          {book.authors}
        </p>
        <img class="mx-auto mt-10 h-auto max-w-xl rounded-lg shadow-xl dark:shadow-gray-800"
        src={book.cover_url || ""} alt="Book image"></img>
      </div>
      <div class="max-w-xs flex flex-col justify-between gap-10">
        <div class="text-justify">
          {book.description}
        </div>
        <For each={book.files}>
            {(file) => (
              <li class="flex items-center space-x-3 hover:bg-gray-100">
                <div class="flex-1">{file?.toString()}</div>
              </li>
            )}
        </For>
      </div>
    </div>
      <button
        onClick={handleConfirm}
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        classList={{
          "cursor-not-allowed opacity-50": loading(),
        }}
        disabled={loading()}
      >
        {!loading() ? "Confirm submission" : "Submitting..."}
      </button>
    </div>
  );
};
