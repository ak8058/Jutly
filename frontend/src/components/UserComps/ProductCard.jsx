import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailCard from "./ProductDetailCard";
import Ratings from "./Ratings";
import {
  addToCart,
  addToWishlist,
  removeFromWishlist,
} from "../../store/store";
import { easeOutSoft } from "../../lib/motion";

function getProductImage(product) {
  return (
    product?.images?.[0]?.url ||
    product?.image_Url?.[0]?.url ||
    product?.image_Url?.[0] ||
    product?.image_Url ||
    ""
  );
}

function QuickAction({ icon: Icon, onClick, title, active, index }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      variants={{ rest: { opacity: 0, x: 14 }, hover: { opacity: 1, x: 0 } }}
      transition={{ duration: 0.25, ease: easeOutSoft, delay: index * 0.05 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.9 }}
      className={`grid h-9 w-9 place-items-center rounded-full border border-ink-100 bg-white/95 shadow-card backdrop-blur transition-colors duration-200 ${
        active
          ? "text-danger-500"
          : "text-ink-600 hover:bg-ink-900 hover:text-white"
      }`}
    >
      <Icon size={17} />
    </motion.button>
  );
}

function ProductCard({ product, isEvent = false, preview = false }) {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const dispatch = useDispatch();
  const { wishlist = [] } = useSelector(state => state.wishlist);
  const { cart = [] } = useSelector(state => state.cart);
  const id = product?._id || product?.id;
  const image = getProductImage(product);
  const shop = product?.shop;
  const rating = product?.ratings ?? product?.rating ?? 0;
  const discountPrice = product?.discountPrice ?? product?.discount_price ?? product?.price;
  const originalPrice = product?.originalPrice ?? product?.price;
  const isInWishlist = wishlist.some(item => (item?._id || item?.id) === id);
  const inCart = cart.some(item => (item?._id || item?.id) === id);
  const isWishlisted = click || isInWishlist;
  const productHref = isEvent ? `/product/${id}?isEvent=true` : `/product/${id}`;
  const discountPct =
    originalPrice && discountPrice && originalPrice > discountPrice
      ? Math.round(((originalPrice - discountPrice) / originalPrice) * 100)
      : 0;
  const outOfStock = product?.stock != null && product.stock < 1;

  useEffect(() => setClick(isInWishlist), [isInWishlist]);

  function showFeedback(message) {
    setFeedback(message);
    window.setTimeout(() => setFeedback(""), 1800);
  }

  function toggleWishlist() {
    if (preview) return;
    if (isWishlisted) {
      dispatch(removeFromWishlist(id));
      setClick(false);
      showFeedback("Removed from wishlist");
    } else {
      dispatch(addToWishlist(product));
      setClick(true);
      showFeedback("Added to wishlist");
    }
  }

  function addProductToCart() {
    if (preview) return showFeedback("Sample product preview");
    if (inCart) return showFeedback("Item already in cart!");
    if (outOfStock) return showFeedback("Product stock is limited!");
    dispatch(addToCart({ ...product, qty: 1 }));
    showFeedback("Item added to cart successfully!");
  }

  const ProductLink = preview ? "span" : Link;
  const productLinkProps = preview ? {} : { to: productHref };

  return (
    <>
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        whileTap={{ scale: 0.99 }}
        variants={{ rest: { y: 0 }, hover: { y: -6 } }}
        transition={{ duration: 0.32, ease: easeOutSoft }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card transition-shadow duration-300 hover:border-brand-100 hover:shadow-card-hover"
      >
        <div className="relative overflow-hidden bg-ink-50/70 p-4">
          <ProductLink {...productLinkProps} className="block">
            {image ? (
              <motion.img
                src={image}
                alt={product?.name || "Footwear"}
                loading="lazy"
                variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
                transition={{ duration: 0.5, ease: easeOutSoft }}
                className="mx-auto h-[170px] w-full object-contain"
              />
            ) : (
              <span className="grid h-[170px] place-items-center text-sm text-ink-400">
                Image unavailable
              </span>
            )}
          </ProductLink>

          <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
            {discountPct > 0 && (
              <span className="rounded-full bg-danger-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                −{discountPct}%
              </span>
            )}
            {isEvent && (
              <span className="rounded-full bg-accent-400 px-2.5 py-1 text-[11px] font-bold text-ink-900 shadow-sm">
                Event
              </span>
            )}
            {outOfStock && (
              <span className="rounded-full bg-ink-800 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                Sold out
              </span>
            )}
            {preview && (
              <span className="rounded-full bg-[#6366F1] px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                Demo
              </span>
            )}
          </div>

          <div className="absolute right-3 top-3 flex flex-col gap-2">
            <QuickAction
              index={0}
              icon={isWishlisted ? AiFillHeart : AiOutlineHeart}
              active={isWishlisted}
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              onClick={toggleWishlist}
            />
            <QuickAction
              index={1}
              icon={AiOutlineEye}
              title="Quick view"
              onClick={() => setOpen(true)}
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col px-4 pb-4">
          {shop?.name && (
            shop?._id && !preview ? (
              <Link
                to={`/shop/preview/${shop._id}`}
                className="text-[11px] font-semibold uppercase tracking-wider text-brand-600 transition-colors hover:text-brand-700"
              >
                {shop.name}
              </Link>
            ) : (
              <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-600">
                {shop.name}
              </span>
            )
          )}

          <ProductLink {...productLinkProps} className="mt-1.5 block">
            <h4 className="line-clamp-2 min-h-[42px] font-display text-[15px] font-semibold leading-snug text-ink-900 transition-colors duration-200 group-hover:text-brand-700">
              {product?.name?.length > 60
                ? `${product.name.slice(0, 60)}…`
                : product?.name || "Footwear"}
            </h4>
          </ProductLink>

          <div className="mt-2 flex items-center gap-2">
            <Ratings rating={rating} size={15} />
            <span className="text-[12px] text-ink-400">
              ({product?.reviews?.length || 0})
            </span>
          </div>

          <div className="mt-auto pt-4">
            <div className="flex items-end justify-between gap-2">
              <div className="flex items-baseline gap-1.5">
                {discountPrice != null && (
                  <span className="font-display text-[19px] font-bold text-ink-900">
                    ₹{discountPrice}
                  </span>
                )}
                {originalPrice != null && originalPrice !== discountPrice && (
                  <span className="text-[13px] font-medium text-ink-400 line-through">
                    ₹{originalPrice}
                  </span>
                )}
              </div>
              <span className="text-[12px] font-medium text-ink-400">
                {product?.sold_out ?? product?.total_sell ?? 0} sold
              </span>
            </div>

            <motion.button
              type="button"
              onClick={addProductToCart}
              disabled={outOfStock}
              whileTap={{ scale: 0.97 }}
              variants={{
                rest: { backgroundColor: "#f6f8fb", color: "#2a3a5c" },
                hover: { backgroundColor: "#4f46e5", color: "#ffffff" },
              }}
              transition={{ duration: 0.25 }}
              className="mt-3 flex h-[42px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl text-[14px] font-semibold disabled:cursor-not-allowed disabled:opacity-60"
            >
              <AiOutlineShoppingCart size={18} />
              {inCart ? "In cart" : "Add to cart"}
            </motion.button>
            <p className="mt-1 min-h-4 text-center text-[11px] text-ink-500" aria-live="polite">
              {feedback}
            </p>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <ProductDetailCard
            setOpen={setOpen}
            product={product}
            preview={preview}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default ProductCard;
