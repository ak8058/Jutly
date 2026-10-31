import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToWishlist, removeFromWishlist } from "../../store/store";
import Ratings from "./Ratings";
import { backdrop, modal } from "../../lib/motion";

function getProductImage(product) {
  return (
    product?.images?.[0]?.url ||
    product?.image_Url?.[0]?.url ||
    product?.image_Url?.[0] ||
    product?.image_Url ||
    ""
  );
}

function ProductDetailCard({ setOpen, product, preview = false }) {
  const { cart = [] } = useSelector(state => state.cart);
  const { wishlist = [] } = useSelector(state => state.wishlist);
  const [count, setCount] = useState(1);
  const [feedback, setFeedback] = useState("");
  const dispatch = useDispatch();
  const id = product?._id || product?.id;
  const shop = product?.shop;
  const image = getProductImage(product);
  const isWishlisted = wishlist.some(item => (item?._id || item?.id) === id);
  const discountPrice = product?.discountPrice ?? product?.discount_price ?? product?.price;
  const originalPrice = product?.originalPrice ?? product?.price;
  const rating = product?.ratings ?? product?.rating ?? 0;

  function handleMessageSubmit() {}

  function addProductToCart() {
    if (preview) return setFeedback("Sample product preview");
    if (cart.some(item => (item?._id || item?.id) === id)) {
      return setFeedback("Item already in cart!");
    }
    if (product?.stock != null && product.stock < count) {
      return setFeedback("Product stock is limited!");
    }
    dispatch(addToCart({ ...product, qty: count }));
    setFeedback("Item added to cart successfully!");
  }

  function toggleWishlist() {
    if (preview) return setFeedback("Sample product preview");
    if (isWishlisted) {
      dispatch(removeFromWishlist(id));
      setFeedback("Removed from wishlist");
    } else {
      dispatch(addToWishlist(product));
      setFeedback("Added to wishlist");
    }
  }

  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [setOpen]);

  if (!product) return null;

  const shopCard = (
    <div className="mt-6 flex items-center gap-3 rounded-xl border border-ink-100 bg-white p-3">
      {shop?.avatar?.url ? (
        <img
          src={shop.avatar.url}
          alt={shop?.name || "Shop"}
          className="h-12 w-12 rounded-full object-cover ring-2 ring-ink-100"
        />
      ) : (
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-50 font-bold text-brand-600">
          {(shop?.name || "J").slice(0, 1).toUpperCase()}
        </span>
      )}
      <div className="min-w-0">
        <h3 className="truncate font-display text-[15px] font-bold text-ink-900">
          {shop?.name || "Jutly Footwear"}
        </h3>
        <p className="text-[13px] text-ink-500">{shop?.ratings || 0} rating</p>
      </div>
    </div>
  );

  return (
    <motion.div
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink-950/50 p-4 backdrop-blur-sm"
    >
      <motion.div
        variants={modal}
        onClick={event => event.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-[900px] overflow-y-auto rounded-2xl bg-white shadow-panel"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close quick view"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink-500 shadow-card backdrop-blur transition-colors hover:bg-ink-900 hover:text-white"
        >
          <RxCross1 size={16} />
        </button>

        <div className="grid gap-0 md:grid-cols-2">
          <div className="bg-ink-50 p-6 md:p-8">
            <div className="grid min-h-[260px] place-items-center rounded-xl bg-white p-4">
              {image ? (
                <img
                  src={image}
                  alt={product.name || "Footwear"}
                  className="mx-auto h-[260px] w-full object-contain"
                />
              ) : (
                <span className="text-sm text-ink-400">Image unavailable</span>
              )}
            </div>

            {shop?._id && !preview ? (
              <Link to={`/shop/preview/${shop._id}`} className="block">
                {shopCard}
              </Link>
            ) : (
              shopCard
            )}

            <button
              type="button"
              onClick={handleMessageSubmit}
              className="mt-3 flex h-[46px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-ink-900 font-semibold text-white transition-all duration-300 hover:bg-ink-800 active:scale-[0.98]"
            >
              Send message
              <AiOutlineMessage size={18} />
            </button>

            <p className="mt-4 text-center text-[13px] font-medium text-ink-400">
              {product.sold_out ?? product.total_sell ?? 0} units sold
            </p>
          </div>

          <div className="flex flex-col p-6 md:p-8">
            <h1 className="font-display text-[22px] font-bold leading-snug tracking-tight text-ink-900">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-2">
              <Ratings rating={rating} size={16} />
              <span className="text-[13px] text-ink-400">
                ({product?.reviews?.length || 0} reviews)
              </span>
            </div>

            <p className="mt-4 max-h-[160px] overflow-y-auto whitespace-pre-line text-[14px] leading-relaxed text-ink-600">
              {product.description || "Explore comfort and style with this footwear pick."}
            </p>

            <div className="mt-6 flex items-baseline gap-2.5">
              <span className="font-display text-[30px] font-bold text-ink-900">
                ₹{discountPrice}
              </span>
              {originalPrice != null && originalPrice !== discountPrice && (
                <span className="text-[16px] font-medium text-ink-400 line-through">
                  ₹{originalPrice}
                </span>
              )}
            </div>

            <div className="mt-7 flex items-center justify-between">
              <div className="flex items-center overflow-hidden rounded-xl border border-ink-200">
                <button
                  type="button"
                  onClick={() => setCount(value => Math.max(1, value - 1))}
                  aria-label="Decrease quantity"
                  className="grid h-11 w-11 cursor-pointer place-items-center text-ink-600 transition-colors hover:bg-ink-50 hover:text-ink-900 disabled:opacity-40"
                  disabled={count <= 1}
                >
                  <AiOutlineMinus size={15} />
                </button>
                <span className="grid h-11 w-12 place-items-center border-x border-ink-200 font-display text-[16px] font-bold tabular-nums text-ink-900">
                  {count}
                </span>
                <button
                  type="button"
                  onClick={() => setCount(value => value + 1)}
                  aria-label="Increase quantity"
                  className="grid h-11 w-11 cursor-pointer place-items-center text-ink-600 transition-colors hover:bg-ink-50 hover:text-ink-900"
                >
                  <AiOutlinePlus size={15} />
                </button>
              </div>

              <motion.button
                type="button"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleWishlist}
                title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                className={`grid h-11 w-11 cursor-pointer place-items-center rounded-xl border transition-colors duration-200 ${
                  isWishlisted
                    ? "border-danger-200 bg-danger-50 text-danger-500"
                    : "border-ink-200 text-ink-500 hover:border-danger-200 hover:text-danger-500"
                }`}
              >
                {isWishlisted ? <AiFillHeart size={21} /> : <AiOutlineHeart size={21} />}
              </motion.button>
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={addProductToCart}
              className="mt-5 flex h-[50px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-600 font-semibold text-white shadow-card transition-all duration-300 hover:bg-brand-700 hover:shadow-card-hover"
            >
              Add to cart
              <AiOutlineShoppingCart size={19} />
            </motion.button>
            <p className="mt-2 min-h-5 text-center text-[12px] text-ink-500" aria-live="polite">
              {feedback}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProductDetailCard;
