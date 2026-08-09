import type { EventMap } from "@mf/types";

export function emit<K extends keyof EventMap>(event: K, detail: EventMap[K]) {
  window.dispatchEvent(new CustomEvent(event, { detail }));
}

export function on<K extends keyof EventMap>(
  event: K,
  handler: (detail: EventMap[K]) => void,
) {
  const listener = (e: Event) =>
    handler((e as CustomEvent<EventMap[K]>).detail);
  window.addEventListener(event, listener);
  return () => window.removeEventListener(event, listener);
}
