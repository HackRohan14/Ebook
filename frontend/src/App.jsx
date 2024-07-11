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
function App() {

  return (
    <div>
      <Navbar/>
              <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/all-books" element={<AllBooks/>}/>
                <Route path="/SignUp" element={<SignUp/>}/>
                <Route path="/Login"  element={<Login/>}/>
                <Route path="/Cart" element={<Cart/>}/>  
                <Route path="/Profile" element={<Profile/>}/>
                <Route path="view-book-details/:id" element={<ViewBookDetails/>} />
              </Routes>
      <Footer/>
    </div>
  )
}

export default App
