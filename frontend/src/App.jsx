import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux-toolkit/actions/userActions";
import Header from "./components/Layouts/Header";
import Hero from "./components/UserComps/Hero";
import HomePage from "./pages/HomePage";
import Login from "./components/UserComps/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";
import Signup from "./components/UserComps/Signup";
import ProfilePage from "./pages/ProfilePage";
import PageTransitionLoader from "./components/ui/PageTransitionLoader";
import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";
import ActivationPage from "./pages/ActivationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ShopLoginPage from "./pages/ShopLoginPage";
import { loadSeller } from "./redux-toolkit/actions/sellerAction";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadSeller());
  }, [dispatch]);
  return (
    <>
      <PageTransitionLoader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <GuestRoute>
              <Signup />
            </GuestRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <GuestRoute>
              <ForgotPasswordPage />
            </GuestRoute>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <GuestRoute>
              <ResetPasswordPage />
            </GuestRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/activation/:url"
          element={
            <GuestRoute>
              <ActivationPage />
            </GuestRoute>
          }
        />
        <Route path="/shop-login" element={<ShopLoginPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
        toastClassName="!rounded-xl !border !border-ink-100 !shadow-panel !font-sans"
        progressClassName="!bg-brand-600"
      />
    </>
  );
};

export default App;
