import { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { useSelector } from "react-redux";
import SectionHeading from "../ui/SectionHeading";
import ProductGrid from "../ui/ProductGrid";

const sampleDeals = [
  {
    _id: "sample-deal-runner",
    name: "Classic White Sneakers",
    shop: { name: "JUTLY FOOTWEAR" },
    images: [
      {
        url: "https://images.unsplash.com/photo-1625860191460-10a66c7384fb?auto=format&fit=crop&w=900&q=85",
      },
    ],
    discount_price: 2499,
    price: 3299,
    rating: 4.6,
    reviews: [{}, {}, {}, {}, {}],
    sold_out: 18,
    stock: 12,
  },
  {
    _id: "sample-deal-sandals",
    name: "Everyday Comfort Sandals",
    shop: { name: "JUTLY FOOTWEAR" },
    images: [
      {
        url: "https://images.unsplash.com/photo-1660632530070-1f543fd36fb2?auto=format&fit=crop&w=900&q=85",
      },
    ],
    discount_price: 1799,
    price: 2399,
    rating: 4.4,
    reviews: [{}, {}, {}, {}],
    sold_out: 12,
    stock: 8,
  },
];

function BestDeals() {
  const [dataa, setDataa] = useState([]);
  const { allProducts = [], isLoading } = useSelector(state => state.product);
  const showingPreview = allProducts.length === 0;

  useEffect(
    function () {
      const sourceProducts = allProducts.length > 0 ? allProducts : sampleDeals;
      const sortedData = [...sourceProducts].sort(
        (a, b) => (b.sold_out ?? b.total_sell ?? 0) - (a.sold_out ?? a.total_sell ?? 0),
      );
      const firstFive = sortedData && sortedData.slice(0, 5);
      setDataa(firstFive);
    },
    [allProducts],
  );

  return (
    <section className={`${styles.section} mb-16`}>
      <SectionHeading
        eyebrow="Trending now"
        title="Best deals"
        subtitle="The pieces our shoppers can't stop buying this week."
        actionLabel="See best sellers"
        actionTo="/best-selling"
      />

      <ProductGrid
        products={dataa}
        loading={isLoading && (!dataa || dataa.length === 0)}
        emptyTitle="No deals right now"
        emptyMessage="New offers land every week — check back shortly."
        preview={showingPreview}
      />
    </section>
  );
}

export default BestDeals;
