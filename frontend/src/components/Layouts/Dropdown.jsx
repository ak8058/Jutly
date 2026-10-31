import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";
import { dropdownVariants } from "../../lib/motion";

function Dropdown({ categoriesData, setDropdown }) {
  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute left-0 top-[52px] z-50 grid max-h-[70vh] w-[min(680px,90vw)] grid-cols-2 gap-x-5 overflow-y-auto rounded-b-xl border border-ink-100 bg-white p-4 shadow-panel sm:grid-cols-3"
    >
      {categoriesData.map((category) => (
        <section key={category.title} className="min-w-0 py-2">
          <Link
            to={`/products?category=${encodeURIComponent(category.title)}`}
            onClick={() => setDropdown(false)}
            className="group flex items-center justify-between rounded-lg px-2 py-2 font-semibold text-ink-900 transition-colors hover:bg-[#6366F1]/10 hover:text-[#6366F1]"
          >
            <span className="flex min-w-0 items-center gap-2">
              <img
                src={category.image_Url}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="h-8 w-8 shrink-0 object-contain"
              />
              <span className="text-[13px]">{category.title}</span>
            </span>
            <IoIosArrowForward className="shrink-0 text-ink-400 transition-transform group-hover:translate-x-1 group-hover:text-[#6366F1]" />
          </Link>
          <ul className="mt-1 space-y-0.5">
            {category.subcategories.map((subcategory) => (
              <li key={subcategory}>
                <Link
                  to={`/products?category=${encodeURIComponent(subcategory)}`}
                  onClick={() => setDropdown(false)}
                  className="block rounded-md px-3 py-1.5 text-[12px] text-ink-600 transition-colors hover:bg-[#6366F1]/10 hover:text-[#6366F1]"
                >
                  {subcategory}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </motion.div>
  );
}

export default Dropdown;
