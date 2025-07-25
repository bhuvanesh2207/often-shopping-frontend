import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

import AdminSignup from './pages/AdminSignup';
import AdminPage from './pages/AdminPage';
import AddProduct from './pages/AddProduct';
import UpdateProduct from './pages/UpdateProduct';
import AdminProfile from './pages/AdminProfile';
import AdminSell from './pages/AdminSell';
import AdminNavbar from './pages/AdminNavbar';
import OrderedProduct from './pages/OrderedProduct';


import CustomerSignup from './pages/CustomerSignup';
import CustomerPage from './pages/CustomerPage';
import ViewCart from './pages/viewCart';
import Checkout from './pages/Checkout';
import CustomerProfile from './pages/CustomerProfile';
import ViewOrders from './pages/ViewOrders';
import OrderHistory from './pages/OrderHistory';
import ChangePassword from './pages/ChangePassword';
import AddAddress from './pages/AddAddress';
import CustomerNavbar from './pages/CustomerNavbar';
import CustomerService from './pages/CustomerService';
import ConfrimOrders from './pages/ConfrimOrders';


import JoinDelivery from './pages/JoinDelivery';
import DeliverySignup from './pages/DeliverySignup';
import DeliveryPage from './pages/DeliveryPage';

import Footer from './pages/Footer';

import './styles/Global.css'
import CustomerDeliveryOtp from './pages/CustomerDeliveryOtp';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/admin_signup" element={<AdminSignup />} />
        <Route path="/admin_page" element={<AdminPage />} />
        <Route path="/add_product" element={<AddProduct />} />
        <Route path="/update_product" element={<UpdateProduct />} />
        <Route path="/admin_profile_page" element={<AdminProfile />} />
        <Route path="/admin_sell" element={<AdminSell />} />
        <Route path="/adminNavbar" element={<AdminNavbar />} />
        <Route path='/ordered_product' element={<OrderedProduct/>}/>

        <Route path="/customer_signup" element={<CustomerSignup />} />
        <Route path="/customer_page" element={<CustomerPage />} />
        <Route path="/view_cart_page" element={<ViewCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/customer_profile_page" element={<CustomerProfile />} />
        <Route path="/view_orders" element={<ViewOrders />} />
        <Route path="/order_history" element={<OrderHistory />} />
        <Route path="/changePassword_page" element={<ChangePassword />} />
        <Route path="/add_address" element={<AddAddress />} />
        <Route path="/customer_service" element={<CustomerService />} />
        <Route path="/confirm_order" element={<ConfrimOrders />} />

        <Route path="/join_delivery" element={<JoinDelivery/>}/>
        <Route path="/delivery_signup" element={<DeliverySignup/>}/>
        <Route path="/delivery_page" element={<DeliveryPage/>}/>
        <Route path="/customer_delievry_otp" element={<CustomerDeliveryOtp/>}/>
        
        <Route element={<CustomerNavbar />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
