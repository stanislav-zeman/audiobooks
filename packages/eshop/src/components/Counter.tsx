import { Component, createEffect, createSignal } from "solid-js";

export type CounterProps = {};

export const Counter: Component<{}> = (props) => {
  const [a, setA] = createSignal(19);

  createEffect(() => {
    setInterval(() => {
      setA((a) => a + 1);
    }, 1000);
  });

  return <div>{a()}</div>;
};
