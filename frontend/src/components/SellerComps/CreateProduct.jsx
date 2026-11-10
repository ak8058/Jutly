import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { HiChevronDown } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
// import { createProduct } from "../../redux-toolkit/actions/productActions";
import { toast } from "react-toastify";
import { easeOutSoft } from "../../lib/motion";

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-ink-50/60 px-4 py-2.5 text-[15px] text-ink-900 placeholder:text-ink-400 transition-all duration-200 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10";
const labelClass = "mb-1.5 block text-[13px] font-semibold text-ink-700";

function CreateProduct() {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const [sizeStocks, setSizeStocks] = useState([{ size: "", quantity: "" }]);
  const isFootwear = [
    "Men's Footwear",
    "Women's Footwear",
    "Girl's Footwear",
    "Boy's Footwear",
    "Kid's Footwear",
  ].includes(category);
  const footwearStock = sizeStocks.reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0,
  );

  useEffect(
    function () {
      if (error) return toast.error(error);
      if (success) {
        toast.success("Product created successfully!");
        navigate("/dashboard");
        window.location.reload();
      }
    },
    [dispatch, error, success],
  );

  function handleSubmit(e) {
    e.preventDefault();
    const newForm = new FormData();
    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", isFootwear ? footwearStock : stock);
    if (isFootwear) {
      const validSizeStocks = sizeStocks
        .filter((item) => item.size !== "" && item.quantity !== "")
        .map((item) => ({
          size: Number(item.size),
          quantity: Number(item.quantity),
        }));
      newForm.append("sizeStocks", JSON.stringify(validSizeStocks));
    }
    newForm.append("shopId", seller?._id);

    // dispatch(createProduct(newForm));
  }

  function handleAddImages(e) {
    e.preventDefault();
    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  }

  function removeImage(index) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: easeOutSoft }}
      className="mx-auto w-full max-w-[720px] rounded-2xl border border-ink-100 bg-white p-6 shadow-card md:p-8"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className={labelClass}>
            Product name <span className="text-danger-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={name}
            className={inputClass}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Walnut bedside table"
          />
        </div>

        <div>
          <label className={labelClass}>
            Description <span className="text-danger-500">*</span>
          </label>
          <textarea
            rows="6"
            required
            name="description"
            value={description}
            className={`${inputClass} resize-none leading-relaxed`}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What makes this product worth buying? Materials, dimensions, what's included…"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass}>
              Category <span className="text-danger-500">*</span>
            </label>
            <div className="relative">
              <select
                className={`${inputClass} cursor-pointer appearance-none pr-10`}
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose a category</option>
                {categoriesData &&
                  categoriesData.map((data, i) => (
                    <option value={data.title} key={i}>
                      {data.title}
                    </option>
                  ))}
              </select>
              <HiChevronDown
                size={18}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400"
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Tags</label>
            <input
              type="text"
              required
              name="tags"
              value={tags}
              className={inputClass}
              onChange={(e) => setTags(e.target.value)}
              placeholder="sneakers, casual shoes, footwear"
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <label className={labelClass}>Original price</label>
            <input
              type="number"
              required
              name="originalPrice"
              min={0}
              value={originalPrice ?? ""}
              className={inputClass}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="0"
            />
          </div>

          <div>
            <label className={labelClass}>
              Sale price <span className="text-danger-500">*</span>
            </label>
            <input
              type="text"
              name="discountPrice"
              value={discountPrice ?? ""}
              required
              className={inputClass}
              onChange={(e) => setDiscountPrice(e.target.value)}
              placeholder="0"
            />
          </div>

          {!isFootwear && (
            <div>
              <label className={labelClass}>
                Stock <span className="text-danger-500">*</span>
              </label>
              <input
                type="number"
                required
                name="stock"
                min={0}
                value={stock ?? ""}
                className={inputClass}
                onChange={(e) => setStock(e.target.value)}
                placeholder="0"
              />
            </div>
          )}
        </div>

        {isFootwear && (
          <section className="rounded-xl border border-ink-100 bg-ink-50/50 p-4 sm:p-5">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-[14px] font-bold text-ink-800">
                  Size-wise stock
                </h2>
                <p className="mt-1 text-[12px] text-ink-500">
                  Add the available quantity for each shoe size.
                </p>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-ink-600 ring-1 ring-ink-100">
                Total stock: {footwearStock}
              </span>
            </div>

            <div className="space-y-3">
              {sizeStocks.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_1fr_auto] items-end gap-3"
                >
                  <div>
                    <label className={labelClass}>Shoe size</label>
                    <input
                      type="number"
                      min={1}
                      step="0.5"
                      required
                      value={item.size}
                      className={inputClass}
                      onChange={(e) =>
                        setSizeStocks((items) =>
                          items.map((row, i) =>
                            i === index
                              ? { ...row, size: e.target.value }
                              : row,
                          ),
                        )
                      }
                      placeholder="e.g. 7"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Quantity</label>
                    <input
                      type="number"
                      min={0}
                      required
                      value={item.quantity}
                      className={inputClass}
                      onChange={(e) =>
                        setSizeStocks((items) =>
                          items.map((row, i) =>
                            i === index
                              ? { ...row, quantity: e.target.value }
                              : row,
                          ),
                        )
                      }
                      placeholder="e.g. 2"
                    />
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove size ${index + 1}`}
                    disabled={sizeStocks.length === 1}
                    onClick={() =>
                      setSizeStocks((items) =>
                        items.filter((_, i) => i !== index),
                      )
                    }
                    className="mb-0.5 grid h-11 w-11 place-items-center rounded-xl border border-ink-200 bg-white text-ink-500 transition-colors hover:border-danger-500 hover:text-danger-500 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <RxCross1 size={15} />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                setSizeStocks((items) => [...items, { size: "", quantity: "" }])
              }
              className="mt-4 inline-flex items-center gap-2 rounded-lg px-2 py-2 text-[13px] font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              <AiOutlinePlusCircle size={18} /> Add another size
            </button>
          </section>
        )}

        {/* ---- Images ------------------------------------------- */}
        <div>
          <label className={labelClass}>
            Product images <span className="text-danger-500">*</span>
          </label>

          <input
            type="file"
            name="file"
            required
            id="upload"
            className="hidden"
            multiple
            accept="image/*"
            onChange={handleAddImages}
          />

          <div className="flex flex-wrap gap-3 rounded-xl border border-dashed border-ink-200 bg-ink-50/50 p-4">
            <motion.label
              htmlFor="upload"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="grid h-[110px] w-[110px] cursor-pointer place-items-center rounded-xl border-2 border-dashed border-ink-300 bg-white text-ink-400 transition-colors duration-200 hover:border-brand-400 hover:text-brand-600"
            >
              <div className="flex flex-col items-center gap-1.5">
                <AiOutlinePlusCircle size={26} />
                <span className="text-[11px] font-semibold">Add images</span>
              </div>
            </motion.label>

            <AnimatePresence>
              {images &&
                images.map((img, i) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.24, ease: easeOutSoft }}
                    className="group relative h-[110px] w-[110px] overflow-hidden rounded-xl border border-ink-200 bg-white"
                  >
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`Product image ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      aria-label="Remove image"
                      className="absolute right-1.5 top-1.5 grid h-6 w-6 cursor-pointer place-items-center rounded-full bg-ink-950/60 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    >
                      <RxCross1 size={11} />
                    </button>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>

          <p className="mt-2 text-[12px] text-ink-400">
            The first image becomes the product thumbnail.
          </p>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="flex h-[50px] w-full cursor-pointer items-center justify-center rounded-xl btn-primary font-display text-[16px] font-bold text-white shadow-card transition-colors duration-300 btn-primary:hover "
        >
          Create product
        </motion.button>
      </form>
    </motion.div>
  );
}

export default CreateProduct;
