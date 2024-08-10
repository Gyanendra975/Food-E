import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ openCart }) {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
        <Link className="navbar-brand fs-1" to="/">Food-E</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse fs-5" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item active">
              <Link className="nav-link text-white" to="/">Home</Link>
            </li>
            {localStorage.getItem("authToken") ? (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/user/myorders">MyOrders</Link>
              </li>
            ) : " "}
          </ul>
          {!localStorage.getItem("authToken") ? (
            <div className='d-flex'>
              <Link className="btn bg-grey text-green" to="/login" style={{ borderColor: 'white' }}>LogIn</Link>
              <Link className="btn bg-grey text-green mx-3" to="/user/create" style={{ borderColor: 'white' }}>SignUp</Link>
            </div>
          ) : <div className='d-flex'>
            <button className="btn bg-grey text-white" onClick={openCart} style={{ borderColor: 'white' }}>MyCart</button>
            <Link className="btn bg-grey text-white mx-3" to="" style={{ borderColor: 'white' }} onClick={handleLogOut}>LogOut</Link>
          </div>
          }
        </div>
      </nav>
    </div>
  )
}
