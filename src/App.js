import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import AdminSignup from './pages/AdminSignup';
import CustomerSignup from './pages/CustomerSignup';
import AdminPage from './pages/AdminPage';
import CustomerPage from './pages/CustomerPage';
import ChangePassword from './pages/ChangePassword';
import AddProduct from './pages/AddProduct';
import UpdateProduct from './pages/UpdateProduct';
import ViewCart from './pages/viewCart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import ConfrimOrders from './pages/ConfrimOrders';
import ViewOrders from './pages/ViewOrders';
import OrderHistory from './pages/OrderHistory';
import AddAddress from './pages/AddAddress';
import AdminSell from './pages/AdminSell';
import Footer from './pages/Footer';
import AdminNavbar from './pages/AdminNavbar';
import CustomerNavbar from './pages/CustomerNavbar';
import './style.css'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/admin_signup" element={<AdminSignup/>} />
        <Route path="/customer_signup" element = {<CustomerSignup/>} />
        <Route path="/admin_page" element = {<AdminPage/>} />
        <Route path="/customer_page" element={<CustomerPage/>} />
        <Route path="/changePassword_page" element={<ChangePassword/>} />
        <Route path="/add_product" element={<AddProduct/>}/>
        <Route path="/update_product" element={<UpdateProduct/>}/>
        <Route path='/view_cart_page' element={<ViewCart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/profile_page" element={<Profile/>}/>
        <Route path="/confirm_order" element={<ConfrimOrders/>}/>
        <Route path="/view_orders" element={<ViewOrders/>} />
        <Route path="/order_history" element={<OrderHistory/>}/>
        <Route path="/add_address" element = {<AddAddress/>} />
        <Route path="/admin_sell" element = {<AdminSell/>} />
        <Route path="/adminNavbar" element={<AdminNavbar/>}></Route>
        <Route element={<CustomerNavbar/>}/>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
