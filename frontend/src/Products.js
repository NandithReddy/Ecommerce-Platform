import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// load your local PNGs
const images = require.context('./products', false, /\.png$/);
const slugify = name =>
  name
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

function Products({ onCartUpdate }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { search } = useLocation();
  const navigate = useNavigate();
  const nameFilter = new URLSearchParams(search).get('name');

  useEffect(() => {
    const url = nameFilter
      ? `http://localhost:8081/api/products/search?name=${encodeURIComponent(nameFilter)}`
      : 'http://localhost:8081/api/products';
    fetch(url)
      .then(res => res.json())
      .then(data => setProducts(data || []))
      .catch(err => {
        console.error(err);
        toast.error('Failed to load products');
      })
      .finally(() => setIsLoading(false));
  }, [nameFilter]);

  const addToCart = product => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(i => i.productId === product.id);
    if (existing) existing.quantity++;
    else cart.push({ productId: product.id, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success('Added to cart', { autoClose: 800 });
    onCartUpdate && onCartUpdate();
  };

  return (
    <main>
      <div className="album py-5 bg-body-tertiary">
        <div className="container">
          <h2 className="text-center mb-4">All Products</h2>

          {isLoading ? (
            <p className="text-center">Loading products…</p>
          ) : products.filter(p => p.stock > 0).length === 0 ? (
            <p className="text-center text-muted">No products found.</p>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
              {products
                .filter(p => p.stock > 0)
                .map(product => {
                  const imgSrc = images(`./${slugify(product.name)}.png`);
                  return (
                    <div className="col" key={product.id}>
                      <div className="card h-100 shadow-sm">
                        <img
                          src={imgSrc}
                          className="card-img-top"
                          style={{ height: 225, objectFit: 'cover' }}
                          alt={product.name}
                        />
                        <div className="card-body d-flex flex-column">
                          {/* Product Name */}
                          <h5 className="card-title">{product.name}</h5>
                          {/* Price badge under name */}
                          <div className="mb-2">
                            <span className="badge bg-success text-white fs-6">
                              ${product.price.toFixed(2)}
                            </span>
                          </div>
                          {/* Description in smaller muted text */}
                          <p className="card-text text-muted mb-3" style={{ fontSize: '0.9rem' }}>
                            {product.description}
                          </p>
                          {/* Add to cart + stock */}
                          <div className="mt-auto d-flex justify-content-between align-items-center">
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => addToCart(product)}
                            >
                              Add to cart
                            </button>
                            <small className="text-muted">
                              {product.stock} in stock
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Products;
