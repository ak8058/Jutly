import DashboardHero from "../components/SellerComps/DashboardHero";
import SellerLayout from "../components/SellerComps/SellerLayout";

function ShopDashboardPage() {
  return (
    <SellerLayout active={1} wide>
      <DashboardHero />
    </SellerLayout>
  );
}

export default ShopDashboardPage;
