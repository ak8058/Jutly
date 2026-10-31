import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import { backdrop, drawer } from "../../lib/motion";
import { removeFromCart } from "../../store/store";

function getImage(product) {
  return product?.images?.[0]?.url || product?.image_Url?.[0]?.url || product?.image_Url?.[0] || product?.image_Url || "";
}

function Cart({ setOpenCart }) {
  const dispatch = useDispatch();
  const { cart = [] } = useSelector(state => state.cart);
  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item?.discountPrice ?? item?.discount_price ?? item?.price ?? 0) * (item?.qty || 1),
    0,
  );

  return (
    <motion.div
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={() => setOpenCart(false)}
      className="fixed inset-0 z-[70] bg-ink-950/50 backdrop-blur-sm"
    >
      <motion.aside
        variants={drawer("right")}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={event => event.stopPropagation()}
        className="absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-white shadow-panel"
      >
        <div className="flex items-center justify-between border-b border-ink-100 px-6 py-5">
          <div>
            <h2 className="font-display text-xl font-bold text-ink-900">Your cart</h2>
            <p className="mt-1 text-sm text-ink-400">
              {cart.length ? `${cart.length} pair${cart.length === 1 ? "" : "s"} in your bag` : "Your bag is ready when you are."}
            </p>
          </div>
          <button type="button" aria-label="Close cart" onClick={() => setOpenCart(false)} className="grid h-9 w-9 place-items-center rounded-full text-ink-500 hover:bg-ink-100"><RxCross1 /></button>
        </div>

        {cart.length ? (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto p-5">
              {cart.map((item, index) => {
                const id = item?._id || item?.id || index;
                const price = item?.discountPrice ?? item?.discount_price ?? item?.price;
                return (
                  <div key={id} className="flex gap-3 rounded-xl border border-ink-100 p-3">
                    <div className="grid h-20 w-20 shrink-0 place-items-center rounded-lg bg-ink-50 p-2">
                      {getImage(item) && <img src={getImage(item)} alt={item?.name || "Footwear"} className="h-full w-full object-contain" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <Link to={`/product/${id}`} onClick={() => setOpenCart(false)} className="line-clamp-2 text-sm font-semibold text-ink-800 hover:text-[#6366F1]">{item?.name || "Footwear"}</Link>
                      <p className="mt-1 text-xs text-ink-500">Qty: {item?.qty || 1}</p>
                      <p className="mt-1 font-display font-bold text-ink-900">₹{price}</p>
                    </div>
                    <button type="button" onClick={() => dispatch(removeFromCart(id))} aria-label={`Remove ${item?.name || "item"}`} className="h-fit rounded-full p-2 text-ink-400 hover:bg-rose-50 hover:text-danger-500"><RxCross1 size={14} /></button>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-ink-100 p-5">
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="font-medium text-ink-600">Subtotal</span>
                <span className="font-display text-lg font-bold text-ink-900">₹{total.toLocaleString("en-IN")}</span>
              </div>
              <Link to="/checkout" onClick={() => setOpenCart(false)} className="flex h-12 items-center justify-center rounded-xl bg-[#6366F1] font-semibold text-white transition hover:bg-[#4F46E5]">Continue to checkout</Link>
            </div>
          </>
        ) : (
          <div className="grid flex-1 place-items-center px-8 text-center">
            <div>
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-ink-50 text-ink-400"><span className="text-2xl">🛍</span></div>
              <p className="font-semibold text-ink-800">Your cart is empty</p>
              <p className="mt-2 text-sm text-ink-400">Add something you love and it will show up here.</p>
            </div>
          </div>
        )}
      </motion.aside>
    </motion.div>
  );
}

export default Cart;
