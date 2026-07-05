import { useState, useEffect } from 'react';

const TOAST_TIMEOUT = 5000;
let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

const toastListeners = new Set();

export function toast(props) {
  const id = genId();
  const update = (toasts) => [{ ...props, id }, ...toasts];
  toastListeners.forEach((listener) => listener(update));
  
  setTimeout(() => {
    toastListeners.forEach((listener) => {
      listener((toasts) => toasts.filter((t) => t.id !== id));
    });
  }, TOAST_TIMEOUT);
}

export function useToast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const listener = (updateFn) => {
      setToasts(updateFn);
    };
    toastListeners.add(listener);
    return () => {
      toastListeners.delete(listener);
    };
  }, []);

  return { toasts, toast };
}
