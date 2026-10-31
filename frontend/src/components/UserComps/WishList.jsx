import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import { backdrop, drawer } from "../../lib/motion";
import { removeFromWishlist } from "../../store/store";

function getImage(product) {
  return product?.images?.[0]?.url || product?.image_Url?.[0]?.url || product?.image_Url?.[0] || product?.image_Url || "";
}

function WishList({ setOpenWishList }) {
  const dispatch = useDispatch();
  const { wishlist = [] } = useSelector(state => state.wishlist);

  return (
    <motion.div variants={backdrop} initial="hidden" animate="visible" exit="exit" onClick={() => setOpenWishList(false)} className="fixed inset-0 z-[70] bg-ink-950/50 backdrop-blur-sm">
      <motion.aside variants={drawer("right")} initial="hidden" animate="visible" exit="exit" onClick={event => event.stopPropagation()} className="absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-white shadow-panel">
        <div className="flex items-center justify-between border-b border-ink-100 px-6 py-5">
          <div><h2 className="font-display text-xl font-bold text-ink-900">Your wishlist</h2><p className="mt-1 text-sm text-ink-400">{wishlist.length ? `${wishlist.length} saved pair${wishlist.length === 1 ? "" : "s"}` : "Keep your favorites close."}</p></div>
          <button type="button" aria-label="Close wishlist" onClick={() => setOpenWishList(false)} className="grid h-9 w-9 place-items-center rounded-full text-ink-500 hover:bg-ink-100"><RxCross1 /></button>
        </div>
        {wishlist.length ? (
          <div className="flex-1 space-y-3 overflow-y-auto p-5">
            {wishlist.map((item, index) => {
              const id = item?._id || item?.id || index;
              const price = item?.discountPrice ?? item?.discount_price ?? item?.price;
              return (
                <div key={id} className="flex gap-3 rounded-xl border border-ink-100 p-3">
                  <div className="grid h-20 w-20 shrink-0 place-items-center rounded-lg bg-ink-50 p-2">{getImage(item) && <img src={getImage(item)} alt={item?.name || "Footwear"} className="h-full w-full object-contain" />}</div>
                  <div className="min-w-0 flex-1"><Link to={`/product/${id}`} onClick={() => setOpenWishList(false)} className="line-clamp-2 text-sm font-semibold text-ink-800 hover:text-[#6366F1]">{item?.name || "Footwear"}</Link><p className="mt-1 font-display font-bold text-ink-900">₹{price}</p></div>
                  <button type="button" onClick={() => dispatch(removeFromWishlist(id))} aria-label={`Remove ${item?.name || "item"}`} className="h-fit rounded-full p-2 text-ink-400 hover:bg-rose-50 hover:text-danger-500"><RxCross1 size={14} /></button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid flex-1 place-items-center px-8 text-center"><div><div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-ink-50 text-ink-400"><span className="text-2xl">♡</span></div><p className="font-semibold text-ink-800">Your wishlist is empty</p><p className="mt-2 text-sm text-ink-400">Save your favorite finds to see them here.</p></div></div>
        )}
      </motion.aside>
    </motion.div>
  );
}

export default WishList;
