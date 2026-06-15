"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
  /** Style « danger » (rouge) pour les actions destructrices. */
  danger?: boolean;
};

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  onConfirm,
  onCancel,
  loading = false,
  danger = false,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={loading ? undefined : onCancel}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative z-10 w-full max-w-md rounded-2xl border border-white/12 bg-neutral-950 p-5 shadow-2xl sm:p-6"
          >
            <h3 className="text-base font-bold text-white sm:text-lg">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-300">{message}</p>
            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onCancel}
                disabled={loading}
                className="h-10 rounded-lg border border-white/15 bg-white/5 px-4 text-sm font-semibold text-neutral-200 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={loading}
                className={cn(
                  "h-10 rounded-lg px-4 text-sm font-bold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                  danger
                    ? "border border-red-400/40 bg-red-500/25 hover:bg-red-500/35"
                    : "border border-violet-400/40 bg-violet-500/25 hover:bg-violet-500/35"
                )}
              >
                {loading ? "…" : confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
