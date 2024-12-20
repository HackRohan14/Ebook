import './App.css'
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import AllBooks from "./pages/AllBooks";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Cart from "./pages/Cart";

import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Profile from './pages/Profile';
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';
import { useEffect } from 'react';
import UserOrderHistory from './components/Profile/UserOrderHistory';
import Favorites from './components/Profile/Favorites';
import Settings from './components/Profile/Settings';
import Allorder from './pages/Allorder';
import Addbook from './pages/Addbook';
import Updatebook from './pages/Updatebook';

function App() {
  const dispatch=useDispatch();
  const role=useSelector((state)=> state.auth.role);
  useEffect(()=>{
    if(localStorage.getItem("token") && localStorage.getItem("id") && localStorage.getItem("role")){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  },[]);
  return (
    <div>
      <Navbar/>
              <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/all-books" element={<AllBooks/>}/>
                <Route path="/SignUp" element={<SignUp/>}/>
                <Route path="/Login"  element={<Login/>}/>
                <Route path="/Cart" element={<Cart/>}/>  
                <Route path="/Profile" element={<Profile/>}>
                    {role==="user"?<Route index element={<Favorites/>}/>:<Route index element={<Allorder/>}/>}
                    {role==="user"?<Route path="/Profile/orderHistory" element={<UserOrderHistory/>}/>:<Route path="/Profile/add-book" element={<Addbook/>}/>}
                    <Route path="/Profile/settings" element={<Settings/>}/>
                </Route>
                <Route path="view-book-details/:id" element={<ViewBookDetails />}>
                      <Route path="update-book-details" element={<Updatebook />} />
                </Route>
              </Routes>
      <Footer/>
    </div>
  )
}

export default App
