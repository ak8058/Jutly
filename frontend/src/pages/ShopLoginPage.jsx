import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ShopLogin from "../components/SellerComps/ShopLogin";

function ShopLoginPage() {
  const { isSeller, isLoading } = useSelector((state) => state.seller);
  const navigate = useNavigate();
  useEffect(
    function () {
      if (isSeller === true) navigate(`/dashboard`);
    },
    [isSeller, isLoading],
  );
  return (
    <div>
      <ShopLogin />
    </div>
  );
}

export default ShopLoginPage;
