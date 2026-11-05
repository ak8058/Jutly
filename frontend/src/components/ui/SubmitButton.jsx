import { motion } from "framer-motion";

/** Primary form button with a built-in spinner for the pending state. */
function SubmitButton({
  loading = false,
  children,
  loadingText = "Please wait…",
  className = "",
  ...props
}) {
  return (
    <motion.button
      whileHover={loading ? undefined : { scale: 1.015 }}
      whileTap={loading ? undefined : { scale: 0.985 }}
      transition={{ duration: 0.18 }}
      disabled={loading || props.disabled}
      {...props}
      className={`btn-primary relative flex h-[48px] w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl font-semibold shadow-card disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      )}
      {loading ? loadingText : children}
    </motion.button>
  );
}

export default SubmitButton;
