import './App.css';
import Home from './Screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route

} from "react-router-dom";
import Login from './Screens/Login';
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Signup from './Screens/Signup.jsx';
import Myorders from './Screens/Myorders.jsx';
import { CartProvider } from './components/ContextReducer.jsx';
import Invoice from './components/Invoice.jsx';



function App() {
  return (
    <CartProvider>
       <Router>
      <div>
        <Routes>        
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/user/create" element={<Signup />} />
          <Route exact path="/user/myorders" element={<Myorders/>} />
          <Route exact path="/user/invoice" element={<Invoice/>} />
        </Routes>
      </div>
    </Router>
    </CartProvider>
   
  );
}

export default App;
