function Loader({ label = "Loading" }) {
  return (
    <div className="flex items-center justify-center gap-3 py-12" role="status" aria-live="polite">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-ink-200 border-t-[#6366F1]" />
      <span className="text-sm font-medium text-ink-500">{label}…</span>
    </div>
  );
}

export default Loader;
