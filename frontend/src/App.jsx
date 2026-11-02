import { Route, Routes } from "react-router-dom";
import Header from "./components/Layouts/Header";
import Hero from "./components/UserComps/Hero";
import HomePage from "./pages/HomePage";
import Login from "./components/UserComps/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
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
