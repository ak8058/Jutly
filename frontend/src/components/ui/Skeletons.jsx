export function ProductGridSkeleton({ count = 5 }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-ink-100 bg-white p-3"
          aria-hidden="true"
        >
          <div className="h-48 animate-pulse rounded-xl bg-ink-100" />
          <div className="mt-4 h-4 w-4/5 animate-pulse rounded bg-ink-100" />
          <div className="mt-3 h-4 w-2/5 animate-pulse rounded bg-ink-100" />
        </div>
      ))}
    </div>
  );
}
