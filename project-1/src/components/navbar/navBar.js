import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../../store/CartContext';
import AuthContext from '../../store/AuthContext';
import './nav.css';

export const NavBar = () => {
  const AuthCtx = useContext(AuthContext);
  const CartCtx = useContext(CartContext);
  const navigate = useNavigate();
  const [NoItems, setNoItems] = useState(0);

  useEffect(() => {
    setNoItems(CartCtx.cartItems.length);
  }, [CartCtx.cartItems]);

  const onLogoutHandler = () => {
    AuthCtx.setIsLoggedIn(false);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          COURSECART
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {!AuthCtx.isLoggedIn ? (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="true"
                >
                  Login
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="#">
                      User Login
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/login">
                      Admin Login
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              <ul class="navbar-nav">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="true"
                  >
                    Manage
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/add">
                        Add
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/delete">
                        Delete
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Update
                      </Link>
                    </li>
                  </ul>
                </li>
                <li class="nav-item">
                  <Link class="nav-link active" aria-current="page" onClick={onLogoutHandler} to="/">Logout</Link>
                </li>
              </ul>
            )}
          </ul>
          <div className="p-4">
            <div className="row">
              <Link to="/cart">
                <div className="col-md-10 fs-6 cart-box text-center">
                  <img
                    src="https://www.pngitem.com/pimgs/m/558-5580253_add-cart-add-to-cart-icon-png-transparent.png"
                    alt="Cart"
                    className="cart-img"
                  />
                  {NoItems}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
