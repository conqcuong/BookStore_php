import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {
  LoginPage,
  RegisterPage,
  HomePage,
  PaySuccess,
  ShopPage,
  DetailPage,
  OrderPage,
  HistoryOrderPage,
  NotFound
} from "./Routes"
import { DashBoard } from "./pages/admin/DashBoard"
import Index from "./pages/admin"
import { Oder } from "./pages/admin/Oder"
import { UserTable } from "./pages/admin/User/UserTable"
import { ProductsTable } from "./pages/admin/products/ProductsTable"
import { useEffect } from "react";
import { getLogin } from "./redux/apiRequest";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { Test } from "./test/Test"
import {useSelector} from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLogin() as unknown as AnyAction);
  }, []);
  const userRole = useSelector((state:any) => state?.auth.currentUser?.role);
  const userCanAccess = userRole === 'admin';
  const userRoleUser = userRole === 'user' || userRole === 'admin';
  return (
    <>
      <Router>
        <Routes>
          {/* Trang Admin */}
          <Route path="/admin" element={userCanAccess ? <Index /> : <NotFound />}>
            <Route path="dash-board" element={<DashBoard />} />
            <Route path="user" element={<UserTable />} />
            <Route path="books" element={<ProductsTable />} />
            <Route path="order" element={<Oder />} />
          </Route>
          {/* Người dùng */}
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/" element={<HomePage/>} />
          <Route path="/shop" element={<ShopPage/>} />
          <Route path="/pay-success" element={<PaySuccess/>} />
          <Route path="/shop/details/:id" element={<DetailPage/>} />
          <Route path="/order" element={ <OrderPage/>} />
          <Route path="/history-order" element={userRoleUser ? <HistoryOrderPage/> : <NotFound />} />
          {/* Trang test */}
          <Route path="*" element={<NotFound/>} />
        </Routes> 
      </Router>
    </>
  )
}

export default App
