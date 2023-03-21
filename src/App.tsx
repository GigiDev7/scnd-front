import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewProduct from "./pages/NewProduct";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="w-[90%] mx-auto flex flex-col justify-between h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-product" element={<NewProduct />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
