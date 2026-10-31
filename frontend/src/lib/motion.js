export const dropdownVariants = {
  hidden: { opacity: 0, y: -8, transition: { duration: 0.15 } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

export const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

export const modal = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: 12, scale: 0.98, transition: { duration: 0.18 } },
};

export const drawer = (direction = "left") => ({
  hidden: { x: direction === "left" ? "-100%" : "100%" },
  visible: { x: 0, transition: { type: "spring", stiffness: 320, damping: 32 } },
  exit: { x: direction === "left" ? "-100%" : "100%", transition: { duration: 0.2 } },
});

export const springy = { type: "spring", stiffness: 500, damping: 28 };

export const easeOutSoft = [0.22, 1, 0.36, 1];
export const viewportOnce = { once: true, amount: 0.2 };

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const listItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: easeOutSoft },
  },
};
