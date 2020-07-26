import { useEffect } from 'react';

type K = keyof GlobalEventHandlersEventMap;

type Listener = (this: Window, ev: GlobalEventHandlersEventMap[K]) => any;

export function useWindowEvent(eventName: K, listener: Listener) {
  useEffect(() => {
    document.addEventListener(eventName, listener);
    return () => {
      document.removeEventListener(eventName, listener);
    };
  }, [eventName, listener]);
}
