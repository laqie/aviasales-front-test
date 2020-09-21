import { createEffect, createEvent, Event, forward, Unit } from 'effector';


interface DebounceParams<T> {
  source: Unit<T>;
  ms: number;
}

export function debounce<T>({ source, ms }: DebounceParams<T>): Event<T> {
  const result = createEvent<T>();
  const timeoutFx = createEffect<T, T>();

  let timeoutId: number;
  let promiseReject: () => void;

  timeoutFx.use((payload) => {
    clearTimeout(timeoutId);
    if (promiseReject) promiseReject();
    return new Promise<T>(((resolve, reject) => {
      promiseReject = reject;
      timeoutId = setTimeout(resolve, ms, payload);
    }));
  });

  forward({
    from: source,
    to: timeoutFx,
  });

  forward({
    from: timeoutFx.doneData,
    to: result,
  });

  return result;
}
