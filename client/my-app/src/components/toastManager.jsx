// toastManager.js
import React from "react";
import ReactDOM from "react-dom/client";

/**
 * Self-mounting toast manager
 *
 * Usage:
 * import { useToast, toast } from './toastManager'
 * const { toast } = useToast(); // OR call toast(...) directly anywhere after first render
 *
 * This module will auto-mount a toast viewport into document.body the first time it's imported (client-side).
 */

/* ===== config ===== */
const TOAST_LIMIT = 3;
const DEFAULT_DURATION = 5000; // ms

/* ===== actions & state ===== */
const actionTypes = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  DISMISS: "DISMISS",
  REMOVE: "REMOVE",
};

let counter = 0;
function genId() {
  counter = (counter + 1) % Number.MAX_SAFE_INTEGER;
  return String(counter);
}

const timeouts = new Map();
const listeners = [];
let memoryState = { toasts: [] };

function notify() {
  const copy = Array.from(listeners);
  copy.forEach((l) => {
    try {
      l(memoryState);
    } catch (e) {
      // ignore
    }
  });
}

function scheduleRemove(id, duration = DEFAULT_DURATION) {
  if (!id) return;
  // don't schedule if already scheduled
  if (timeouts.has(id)) return;
  const t = setTimeout(() => {
    timeouts.delete(id);
    dispatch({ type: actionTypes.REMOVE, toastId: id });
  }, duration);
  timeouts.set(id, t);
}

function clearRemove(id) {
  const t = timeouts.get(id);
  if (t) {
    clearTimeout(t);
    timeouts.delete(id);
  }
}

export function reducer(state, action) {
  switch (action.type) {
    case actionTypes.ADD: {
      const toasts = [action.toast, ...state.toasts].slice(0, TOAST_LIMIT);
      return { ...state, toasts };
    }
    case actionTypes.UPDATE: {
      const toasts = state.toasts.map((t) =>
        t.id === action.toast.id ? { ...t, ...action.toast } : t
      );
      return { ...state, toasts };
    }
    case actionTypes.DISMISS: {
      const { toastId } = action;
      // schedule removal
      if (toastId) {
        const t = state.toasts.find((x) => x.id === toastId);
        scheduleRemove(toastId, t?.duration ?? DEFAULT_DURATION);
      } else {
        state.toasts.forEach((x) =>
          scheduleRemove(x.id, x?.duration ?? DEFAULT_DURATION)
        );
      }
      const toasts = state.toasts.map((t) =>
        toastId === undefined || t.id === toastId ? { ...t, open: false } : t
      );
      return { ...state, toasts };
    }
    case actionTypes.REMOVE: {
      const { toastId } = action;
      if (toastId === undefined) {
        // clear all
        state.toasts.forEach((t) => clearRemove(t.id));
        return { ...state, toasts: [] };
      }
      clearRemove(toastId);
      return { ...state, toasts: state.toasts.filter((t) => t.id !== toastId) };
    }
    default:
      return state;
  }
}

function dispatch(action) {
  memoryState = reducer(memoryState, action);
  notify();
}

/* ===== public API: toast() ===== */
/**
 * toast({ title, description, variant, duration })
 * returns { id, dismiss, update }
 */
export function toast({ duration, ...props } = {}) {
  const id = genId();

  const update = (patch) =>
    dispatch({ type: actionTypes.UPDATE, toast: { ...patch, id } });
  const dismiss = () => dispatch({ type: actionTypes.DISMISS, toastId: id });

  dispatch({
    type: actionTypes.ADD,
    toast: {
      ...props,
      id,
      open: true,
      duration,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  // schedule automatic removal if duration provided
  scheduleRemove(id, duration ?? DEFAULT_DURATION);

  return { id, dismiss, update };
}

/* ===== React hook ===== */
export function useToast() {
  const [state, setState] = React.useState(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    // sync in case state changed
    setState(memoryState);
    return () => {
      const idx = listeners.indexOf(setState);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss: (id) => dispatch({ type: actionTypes.DISMISS, toastId: id }),
    remove: (id) => dispatch({ type: actionTypes.REMOVE, toastId: id }),
  };
}

/* ===== Toast UI (auto-mounted) ===== */
function ToastItem({ t, onDismiss }) {
  const base =
    "max-w-sm w-full rounded-lg shadow-lg p-3 text-white flex items-start gap-3";
  const variantStyle =
    t.variant === "destructive"
      ? "bg-red-600"
      : t.variant === "success"
      ? "bg-green-600"
      : "bg-gray-800";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`${base} ${variantStyle}`}
      key={t.id}
    >
      <div className="flex-1">
        {t.title && <div className="font-semibold">{t.title}</div>}
        {t.description && (
          <div className="text-sm opacity-90 mt-1">{t.description}</div>
        )}
      </div>
      <div className="flex flex-col gap-1 items-end">
        <button
          onClick={() => onDismiss(t.id)}
          className="text-xs underline opacity-90"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}

function ToastViewport() {
  const [state, setState] = React.useState(memoryState);

  React.useEffect(() => {
    function l(s) {
      setState(s);
    }
    listeners.push(l);
    setState(memoryState);
    return () => {
      const idx = listeners.indexOf(l);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, []);

  const onDismiss = (id) => {
    dispatch({ type: actionTypes.DISMISS, toastId: id });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {state.toasts.map((t) => (
        <ToastItem key={t.id} t={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

/* ===== auto-mount the viewport once (client only) ===== */
function ensureMounted() {
  if (typeof window === "undefined") return; // SSR-safe
  if (document.getElementById("__toast_root")) return;

  const container = document.createElement("div");
  container.id = "__toast_root";
  document.body.appendChild(container);
  const root = ReactDOM.createRoot(container);
  root.render(<ToastViewport />);
}

// auto-mount on import (client)
if (typeof window !== "undefined") {
  // Delay to ensure React environment ready if imported early, but it's usually fine immediately.
  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", ensureMounted, { once: true });
  } else {
    ensureMounted();
  }
}
