import './App.css'
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Profile from './pages/Profile';
function App() {

  return (
    <div>
      <Router>
      <Navbar/>
              <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/AllBooks" element={<all-books/>}/>
                <Route path="/Login" element={<login/>}/>
                <Route path="/SignUp" element={<sign-up/>}/>
                <Route path="/Cart" element={<cart/>}/>  vcx
              </Routes>
      <Footer/>
      </Router>
    </div>
  )
}

export default App
