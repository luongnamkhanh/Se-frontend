import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MainLayout from "./components/MainLayout";
import Orders from "./pages/Orders";
import Categorylist from "./pages/Categorylist";
import Brandlist from "./pages/Brandlist";
import Productlist from "./pages/Productlist";
import Addconfig from "./pages/Addconfig";
import Configlist from "./pages/Configlist";
import Additem from "./pages/Additem";
import Itemlist from "./pages/Itemlist";
import Addcat from "./pages/Addcat";
import Addbrand from "./pages/Addbrand";
import Addproduct from "./pages/Addproduct";
import UpdateOrder from "./pages/UpdateOrder";
import RevenueConfig from "./pages/RevenueConfig";
import RevenueCus from "./pages/RevenueCus";
import ItemSold from "./pages/ItemSold";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order/:id" element={<UpdateOrder />} />
          <Route path="list-category" element={<Categorylist />} />
          <Route path="category" element={<Addcat />} />
          <Route path="category/:id" element={<Addcat />} />
          <Route path="list-brand" element={<Brandlist />} />
          <Route path="brand" element={<Addbrand />} />
          <Route path="brand/:id" element={<Addbrand />} />
          <Route path="list-product" element={<Productlist />} />
          <Route path="product" element={<Addproduct />} />
          <Route path="product/:id" element={<Addproduct />} />
          <Route path="list-item" element={<Itemlist />} />
          <Route path="item" element={<Additem />} />
          <Route path="list-config" element={<Configlist />} />
          <Route path="config" element={<Addconfig />} />
          <Route path="revenue-customer" element={<RevenueCus />} />
          <Route path="revenue-config" element={<RevenueConfig />} />
          <Route path="item-sold" element={<ItemSold />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
