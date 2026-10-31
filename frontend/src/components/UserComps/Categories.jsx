import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";
import styles from "../../styles/styles";
import { categoriesData } from "../../static/data";
import { SecurePaymentIcon } from "../../static/SecurePaymentIcon";
import { AffordablePricesIcon } from "../../static/AffordablePricesIcon";
import { DailySurpriseIcon } from "../../static/DailySurpriseIcon";
import { ShippingIcon } from "../../static/ShippingIcon";

const brandingData = [
  {
    id: 1,
    title: "Free Shipping",
    description: "From all orders over ₹200",
    icon: ShippingIcon,
  },
  {
    id: 2,
    title: "Daily surprise offers",
    description: "Save up to 25% off",
    icon: DailySurpriseIcon,
  },
  {
    id: 3,
    title: "Affordable prices",
    description: "Get factory direct price",
    icon: AffordablePricesIcon,
  },
  {
    id: 4,
    title: "Secure Payments",
    description: "100% protected payments",
    icon: SecurePaymentIcon,
  },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const listItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

function Categories() {
  const navigate = useNavigate();

  return (
    <>
      {/* ---- Shoe shopping highlights --------------------------- */}
      <div className={`${styles.section} hidden sm:block`}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="my-12 grid grid-cols-2 gap-3 lg:grid-cols-4"
        >
          {brandingData.map(({ id, title, description, icon: Icon }) => (
            <motion.div
              key={id}
              variants={listItem}
              className="flex items-start gap-3 rounded-2xl border border-ink-100 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center">
                <Icon size={21} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-[15px] font-bold text-ink-900">
                  {title}
                </h3>
                <p className="mt-0.5 text-[13px] text-ink-500">{description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ---- Category grid -------------------------------------- */}
      <section className={`${styles.section} mb-14`} id="categories">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6366F1]">
              Browse
            </p>
            <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
              Shop by category
            </h2>
            <span
              aria-hidden="true"
              className="mt-3 block h-[3px] w-16 rounded-full bg-gradient-to-r from-[#6366F1] to-[#FFBB38]"
            />
            <p className="mt-1 text-sm text-ink-500">
              Find the right pair for every age and occasion.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="mb-1 inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-semibold text-ink-800 transition-colors hover:border-[#6366F1] hover:bg-[#6366F1] hover:text-white"
          >
            All products <IoIosArrowForward aria-hidden="true" />
          </button>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          {categoriesData.map((category) => (
            <motion.button
              key={category.id || category.title}
              type="button"
              variants={listItem}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={() =>
                navigate(
                  `/products?category=${encodeURIComponent(category.title)}`,
                )
              }
              className="group relative flex h-[118px] w-full cursor-pointer items-center justify-between overflow-hidden rounded-2xl border border-ink-100 bg-white px-4 text-left shadow-card transition-all duration-300 hover:border-[#6366F1]/40 hover:shadow-card-hover"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <h3 className="relative z-10 max-w-[45%] font-display text-[15px] font-semibold capitalize leading-snug text-ink-800 transition-colors duration-300 group-hover:text-[#6366F1]">
                {category.title}
              </h3>
              <img
                src={category.image_Url}
                alt={`${category.title} shoes`}
                loading="lazy"
                className="relative z-10 h-[86px] w-[100px] bg-transparent object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
              />
            </motion.button>
          ))}
        </motion.div>
      </section>
    </>
  );
}

export default Categories;
