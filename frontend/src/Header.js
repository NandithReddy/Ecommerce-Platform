import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import logo from './assets/logowhite.png';

export default function Header() {
  const [search, setSearch] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSearch = e => {
    e.preventDefault();
    if (search.trim() !== '') {
      navigate(`/products?name=${encodeURIComponent(search.trim())}`);
    }
  };

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    };
    updateCart();
    window.addEventListener('cartUpdated', updateCart);
    window.addEventListener('storage', updateCart);
    return () => {
      window.removeEventListener('cartUpdated', updateCart);
      window.removeEventListener('storage', updateCart);
    };
  }, []);

  // compute displayName each render
  let displayName = '';
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const { firstName, lastName } = jwtDecode(token);
      displayName = firstName && lastName ? `${firstName} ${lastName}` : '';
    } catch {}
    if (!displayName) {
      const fn = localStorage.getItem('firstName');
      const ln = localStorage.getItem('lastName');
      if (fn && ln) displayName = `${fn} ${ln}`;
    }
  }

  return (
    <header style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1030 }}>
      {/* Top navbar */}
      <div className="px-3 py-2 text-bg-dark border-bottom">
        <div className="container d-flex flex-wrap align-items-center justify-content-between">
          <Link to="/" className="d-flex align-items-center text-white text-decoration-none">
            <img src={logo} alt="Hexa Store Logo" width="40" height="40" className="me-2" />
            <span className="fs-4 fw-bold">Hexa Store</span>
          </Link>
          <ul className="nav">
            <li className="nav-item"><Link to="/" className="nav-link text-white">Home</Link></li>
            <li className="nav-item"><Link to="/products" className="nav-link text-white">Products</Link></li>
            {displayName && (
              <>
                <li className="nav-item"><Link to="/orders" className="nav-link text-white">Orders</Link></li>
                <li className="nav-item position-relative">
                  <Link to="/cart" className="nav-link text-white">
                    Cart
                    {cartCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartCount}
                        <span className="visually-hidden">cart items</span>
                      </span>
                    )}
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="d-flex align-items-center">
            {displayName ? (
              <>
                <span className="text-white fw-semibold me-3">Welcome, <span className="fst-italic">{displayName}</span></span>
                <button onClick={handleLogout} className="btn btn-outline-light btn-sm">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-light text-dark me-2">Login</Link>
                <Link to="/signup" className="btn btn-light">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Search Bar */}
      <div className="px-3 py-2 border-bottom mb-3 bg-light">
        <div className="container d-flex flex-wrap justify-content-center">
          <form className="col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto" role="search" onSubmit={handleSearch}>
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </form>
        </div>
      </div>
    </header>
  );
}
