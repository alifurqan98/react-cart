import "./Styles/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/Header";
import { Toaster } from "react-hot-toast";
import Cart from "./Components/Cart";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
            <Toaster />
        </BrowserRouter>
    );
}

export default App;
