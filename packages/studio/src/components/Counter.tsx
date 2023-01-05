import { createSignal } from "solid-js";

export function useCounter() {
  const [count, setCount] = createSignal(0);
  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  return { count, increment, decrement };
}

export default function Counter() {
  const { count, increment, decrement } = useCounter();
  return (
    <>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </>
  );
}
