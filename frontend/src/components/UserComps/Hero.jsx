import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";
import {
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineRefresh,
} from "react-icons/hi";

const trust = [
  { icon: HiOutlineTruck, label: "Delivery from trusted sellers" },
  { icon: HiOutlineShieldCheck, label: "Secure checkout" },
  { icon: HiOutlineRefresh, label: "Easy returns" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-ink-950">
      <div className="absolute inset-0">
        <motion.div
          aria-hidden="true"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-cover bg-[70%_center] bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1686320830934-83e20ef210d9?auto=format&fit=crop&w=2400&q=85)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/65 to-ink-950/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/55 via-transparent to-ink-950/10" />
        <div className="pointer-events-none absolute -left-32 top-0 h-[460px] w-[460px] rounded-full bg-brand-600/25 blur-[130px]" />
        <div className="pointer-events-none absolute -bottom-40 left-1/3 h-[380px] w-[380px] rounded-full bg-accent-400/15 blur-[130px]" />
      </div>

      <motion.div
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.13 } },
        }}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex min-h-[72vh] w-11/12 max-w-[1480px] flex-col justify-center py-20 lg:min-h-[82vh] lg:py-28"
      >
        <motion.div variants={fadeUp} className="mb-7">
          <div className="inline-flex items-stretch overflow-hidden rounded-lg shadow-panel">
            <span className="flex items-center bg-accent-400 px-4 py-2.5 font-display text-[12px] font-extrabold uppercase tracking-[0.14em] text-ink-950">
              Fresh styles
            </span>
            <span className="flex items-center border-y border-r border-white/15 bg-white/10 px-4 py-2.5 text-[13px] font-medium text-white/80 backdrop-blur-md">
              Up to{" "}
              <strong className="ml-1 font-display text-[15px] font-extrabold text-[#ffd36a]">
                40% off
              </strong>
            </span>
          </div>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="max-w-2xl font-sans text-[40px] font-extrabold leading-[1.06] tracking-tight text-white sm:text-[54px] lg:text-[64px]"
        >
          Shoes for every{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-[#ffe08a] via-[#ffc247] to-[#f3a91e] bg-clip-text text-transparent">
              occasion
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              style={{ transformOrigin: "left" }}
              className="absolute -bottom-1 left-0 h-[4px] w-full rounded-full bg-gradient-to-r from-[#ffc247] to-transparent"
            />
          </span>
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/75 sm:text-[17px]"
        >
          Discover sneakers, everyday essentials and standout styles from
          trusted independent sellers. Find your perfect pair, delivered to your
          door and backed by secure checkout.
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/products"
              className="group inline-flex h-[54px] items-center gap-2 rounded-full bg-white px-8 font-sans text-[16px] font-bold text-ink-900 shadow-panel transition-all duration-300 hover:bg-accent-400"
            >
              Shop now{" "}
              <IoIosArrowForward className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/best-selling"
              className="inline-flex h-[54px] items-center rounded-full border border-white/25 px-8 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white/10"
            >
              Best sellers
            </Link>
          </motion.div>
        </motion.div>
        <motion.ul
          variants={fadeUp}
          className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-7"
        >
          {trust.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2.5 text-[13px] font-medium text-white/60"
            >
              <Icon size={20} className="text-accent-400" />
              {label}
            </li>
          ))}
        </motion.ul>
      </motion.div>
      <motion.a
        href="#categories"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-label="Scroll to categories"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 lg:block"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 p-1.5"
        >
          <span className="h-1.5 w-1 rounded-full bg-white/70" />
        </motion.span>
      </motion.a>
    </section>
  );
}

export default Hero;
