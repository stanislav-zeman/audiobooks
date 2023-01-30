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
      fetch(`/api/upload/${id}/${file.name}`, {
        method: "POST",
        body: file,
      })
    );

    const responses = requests && (await Promise.all(requests));

    console.log(responses);

    // console.log({ ...book });
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
