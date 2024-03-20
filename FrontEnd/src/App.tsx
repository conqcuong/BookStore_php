import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {
  LoginPage,
  RegisterPage,
  HomePage,
  PaySuccess,
  ShopPage
} from "./Routes"
import { DashBoard } from "./pages/admin/DashBoard"
import Index from "./pages/admin"
import { Oder } from "./pages/admin/Oder"
import { UserTable } from "./pages/admin/User/UserTable"
import { ProductsTable } from "./pages/admin/products/ProductsTable"
import { useEffect } from "react";
import { getLogin } from "./redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { Test } from "./test/Test"
import Test1 from "./test/Test1"


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLogin() as unknown as AnyAction);
  }, []);
  return (
    <>
      <Router>
      <Routes>
        {/* Trang Admin */}
        <Route path="/admin" element={<Index/>}>
          <Route path="dash-board" element={<DashBoard />} />
          <Route path="user" element={<UserTable />} />
          <Route path="books" element={<ProductsTable />} />
          <Route path="order" element={<Oder />} />
          {/* <Route path="home" element={<Home />} />
          <Route path="*" element={<NotFoundPage />} /> */}
        </Route>
        {/* Người dùng */}
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/" element={<HomePage/>} />
        <Route path="/shop" element={<ShopPage/>} />
        <Route path="/pay-success" element={<PaySuccess/>} />
        {/* Trang test */}
        <Route path="/test" element={<Test/>} />
        <Route path="/test1" element={<Test1/>} />
      </Routes> 
      </Router>
    </>
  )
}

export default App
