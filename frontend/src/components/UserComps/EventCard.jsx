import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";

function EventCard({ active = true, data, isLoading = false }) {
  if (isLoading) {
    return (
      <div className="h-72 animate-pulse rounded-3xl bg-ink-100" aria-label="Loading event" />
    );
  }

  const image = data?.images?.[0]?.url || data?.image_Url?.[0]?.url || data?.image_Url?.[0] || data?.image_Url;
  const salePrice = data?.discountPrice ?? data?.discount_price;
  const regularPrice = data?.originalPrice ?? data?.price;
  const discountPct =
    regularPrice && salePrice && regularPrice > salePrice
      ? Math.round(((regularPrice - salePrice) / regularPrice) * 100)
      : 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45 }}
      className={`relative w-full overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-card lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] ${active ? "" : "mb-10"}`}
    >
      <div className="group relative grid min-h-[260px] place-items-center overflow-hidden bg-ink-50 p-6 lg:min-h-[380px] lg:p-10">
        {image ? (
          <motion.img
            src={image}
            alt={data?.name || "Footwear event"}
            loading="lazy"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="mx-auto h-[240px] w-full rounded-2xl object-contain lg:h-[340px]"
          />
        ) : (
          <span className="text-sm text-ink-400">Event image unavailable</span>
        )}
        {discountPct > 0 && (
          <span className="absolute left-6 top-6 grid h-16 w-16 place-items-center rounded-full bg-danger-500 font-display text-[15px] font-extrabold text-white shadow-panel">
            −{discountPct}%
          </span>
        )}
      </div>

      <div className="flex flex-col justify-center p-6 lg:p-10">
        <span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-accent-400/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-800">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
          Limited-time event
        </span>
        <h3 className="font-display text-2xl font-bold leading-snug tracking-tight text-ink-900 lg:text-[30px]">
          {data?.name || "Footwear event"}
        </h3>
        {data?.description && (
          <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-ink-500">
            {data.description}
          </p>
        )}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-baseline gap-2.5">
            {salePrice != null && <span className="font-display text-[28px] font-bold text-ink-900">₹{salePrice}</span>}
            {regularPrice != null && regularPrice !== salePrice && (
              <span className="text-[16px] font-medium text-ink-400 line-through">₹{regularPrice}</span>
            )}
          </div>
          {data?.sold_out != null && (
            <span className="rounded-full bg-brand-100 px-3 py-1 text-[13px] font-semibold text-brand-700">
              {data.sold_out} sold
            </span>
          )}
        </div>
        <div className="mt-7">
          <Link
            to={`/product/${data?._id || data?.id}?isEvent=true`}
            className="group inline-flex h-[50px] items-center gap-2 rounded-xl bg-ink-900 px-6 font-semibold text-white shadow-card transition-all duration-300 hover:bg-ink-800 hover:shadow-card-hover"
          >
            See details <IoIosArrowForward className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default EventCard;
