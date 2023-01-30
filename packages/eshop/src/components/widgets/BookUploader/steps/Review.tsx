import type { BookView } from "@utils/bookView";
import { Component, createSignal } from "solid-js";
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
    window.location.href = "/studio";
  };

  // TODO: Markup

  return (
    <div>
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
