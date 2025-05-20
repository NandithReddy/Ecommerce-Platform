import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './assets/logowhite.png';

function Header() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== '') {
      navigate(`/products?name=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <header>
      <div className="px-3 py-2 text-bg-dark border-bottom">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link
              to="/"
              className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
            >
              <img src={logo} alt="Hexa Store Logo" width="40" height="40" className="me-2" />
              <span className="fs-4 text-white">Hexa Store</span>
            </Link>

            <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
              <li>
                <Link to="/" className="nav-link text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="nav-link text-white">
                  Products
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="px-3 py-2 border-bottom mb-3">
        <div className="container d-flex flex-wrap justify-content-center">
          <form
            className="col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto"
            role="search"
            onSubmit={handleSearch}
          >
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          <div className="text-end">
            <Link to="/login" className="btn btn-light text-dark me-2">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary">
              Sign-up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
