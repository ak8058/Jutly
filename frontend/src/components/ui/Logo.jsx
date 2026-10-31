function Logo({ size, inverse = false }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-display font-extrabold tracking-tight ${inverse ? "text-white" : "text-ink-900"} ${size === "sm" ? "text-xl" : "text-2xl"}`}
    >
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#6366F1] text-sm font-black text-white">
        J
      </span>
      jutly<span className="-ml-2 text-[#6366F1]">.</span>
    </span>
  );
}

export default Logo;
