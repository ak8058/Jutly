import Header from "../components/Layouts/Header";
import Hero from "../components/UserComps/Hero";
import Categories from "../components/UserComps/Categories";
import BestDeals from "../components/UserComps/BestDeals";
import Events from "../components/UserComps/Events";
import FeaturedProducts from "../components/UserComps/FeaturedProducts";

function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-ink-50">
      <Header activeHeading={1} />
      <main className="flex-1">
        <Hero />
        <Categories />
        <BestDeals />
        <Events />
        <FeaturedProducts />
      </main>
    </div>
  );
}

export default HomePage;
