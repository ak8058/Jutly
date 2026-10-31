import { Route, Routes } from "react-router-dom";
import Header from "./components/Layouts/Header";
import Hero from "./components/UserComps/Hero";
import HomePage from "./pages/HomePage";
import Login from "./components/UserComps/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
