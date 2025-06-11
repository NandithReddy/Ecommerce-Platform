import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { slugify } from './utils/slugify';

// load images from src/products
const images = require.context('./products', false, /\.png$/);

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8081/api/products')
      .then(res => res.json())
      .then(all => {
        const desiredOrder = [
          '984c0553-496d-4725-a80a-97d651ec4c04',
          '8c0a6635-3ec0-41a7-bb45-c5180b083c1c',
          'be6f6471-9cd5-484a-b2e2-fa945274100b'
        ];
        const ordered = desiredOrder
          .map(id => all.find(p => p.id === id))
          .filter(Boolean);
        setProducts(ordered);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const addToCart = product => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(i => i.productId === product.id);
    if (existing) existing.quantity++;
    else cart.push({ productId: product.id, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success(`${product.name} added to cart`);
  };

  if (loading) return <p className="text-center mt-5">Loading featured products…</p>;
  if (products.length < 3)
    return <p className="text-center mt-5">Not enough products to feature.</p>;

  const [hero, feature1, feature2] = products;

  return (
    <main>
      {/* Hero Section */}
      <div className="container-fluid bg-body-tertiary py-5">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start px-4 mb-4 mb-md-0">
            <h1 className="display-3 fw-bold">{hero.name}</h1>
            <p className="lead text-muted">{hero.description}</p>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => addToCart(hero)}
            >
              ${hero.price.toFixed(2)}
            </button>
          </div>
          <div className="col-md-6 text-center">
            <img
              src={images(`./${slugify(hero.name)}.png`)}
              alt={hero.name}
              className="img-fluid rounded"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>

      {/* Two-Column Features */}
      <div className="container-fluid py-5">
        <div className="row g-4">
          {[feature1, feature2].map((prod, idx) => (
            <div key={prod.id} className="col-md-6">
              <div
                className={`p-4 text-center overflow-hidden ${
                  idx === 0 ? 'bg-dark text-white' : 'bg-body-tertiary'
                }`}
              >
                <h2 className="display-5">{prod.name}</h2>
                <p className="lead">{prod.description}</p>
                <button
                  className={`btn btn-lg ${
                    idx === 0 ? 'btn-light' : 'btn-outline-primary'
                  }`}
                  onClick={() => addToCart(prod)}
                >
                  ${prod.price.toFixed(2)}
                </button>
                <div className="mt-3">
                  <img
                    src={images(`./${slugify(prod.name)}.png`)}
                    alt={prod.name}
                    className="img-fluid rounded"
                    style={{ maxHeight: '300px', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
