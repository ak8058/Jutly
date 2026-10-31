import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import SectionHeading from "../ui/SectionHeading";
import ProductGrid from "../ui/ProductGrid";

const sampleProducts = import.meta.env.DEV
  ? [
      {
        _id: "sample-featured-runner",
        name: "Everyday Runner Sneakers",
        shop: { name: "JUTLY FOOTWEAR" },
        category: "Men's Footwear",
        images: [
          {
            url: "https://images.unsplash.com/photo-1625860191460-10a66c7384fb?auto=format&fit=crop&w=900&q=85",
          },
        ],
        discount_price: 2499,
        price: 3299,
        rating: 4.5,
        reviews: [{}, {}, {}, {}],
        total_sell: 18,
        stock: 12,
      },
      {
        _id: "sample-featured-sandal",
        name: "Comfort Strap Sandals",
        shop: { name: "JUTLY FOOTWEAR" },
        category: "Women's Footwear",
        images: [
          {
            url: "https://images.unsplash.com/photo-1660632530070-1f543fd36fb2?auto=format&fit=crop&w=900&q=85",
          },
        ],
        discount_price: 1799,
        price: 2399,
        rating: 4.2,
        reviews: [{}, {}, {}, {}],
        total_sell: 12,
        stock: 8,
      },
    ]
  : [];

function FeaturedProducts() {
  const { allProducts = [], isLoading = false } = useSelector(
    state => state.product,
  );
  const showingPreview = allProducts.length === 0 && sampleProducts.length > 0;
  const products = allProducts.length > 0 ? allProducts : sampleProducts;

  return (
    <section className={`${styles.section} mb-16`}>
      <SectionHeading
        eyebrow={showingPreview ? "Sample preview" : "Handpicked"}
        title="Featured products"
        subtitle={
          showingPreview
            ? "Sample cards showing the seller product layout."
            : "A curated mix from shops across the marketplace."
        }
        actionLabel="Browse all"
        actionTo="/products"
      />

      <ProductGrid
        products={products}
        loading={isLoading && products.length === 0}
        skeletonCount={10}
        emptyTitle="Nothing here yet"
        emptyMessage="Products will appear as soon as sellers list them."
        preview={showingPreview}
      />
    </section>
  );
}

export default FeaturedProducts;
