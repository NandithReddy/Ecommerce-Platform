import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PRODUCT_API, ORDER_API } from './api';          // ★ NEW
import 'react-toastify/dist/ReactToastify.css';

// local product images
const images = require.context('./products', false, /\.png$/);
const slugify = name =>
  name
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts]   = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  // ------------------------------------------------------------
  // Load cart from localStorage + fetch matching product details
  // ------------------------------------------------------------
  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(localCart);
    setCartCount(localCart.reduce((s, i) => s + i.quantity, 0));

    if (localCart.length) {
      fetch(`${PRODUCT_API}/api/products`)               // ★ CHANGED
        .then(res => res.json())
        .then(all =>
          setProducts(all.filter(p =>
            localCart.some(ci => ci.productId === p.id)
          ))
        )
        .catch(err => {
          console.error(err);
          toast.error('Failed to load product data');
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  // ------------------------------------------------------------
  // Helpers
  // ------------------------------------------------------------
  const getQuantity = id =>
    cartItems.find(i => i.productId === id)?.quantity || 0;

  const updateQuantity = (id, delta) => {
    const updated = cartItems
      .map(item =>
        item.productId === id
          ? { ...item, quantity: item.quantity + delta }
          : item
      )
      .filter(i => i.quantity > 0);

    setCartItems(updated);
    setCartCount(updated.reduce((s, i) => s + i.quantity, 0));
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // ------------------------------------------------------------
  // Checkout → create order via order-service
  // ------------------------------------------------------------
  const handleCheckout = async () => {
    const userId = localStorage.getItem('userId');
    const token  = localStorage.getItem('token');
    if (!userId || !token) {
      navigate('/login');
      return;
    }
    try {
      const res = await fetch(
        `${ORDER_API}/api/orders?userId=${userId}`,      // ★ CHANGED
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(cartItems),
        }
      );
      if (!res.ok) throw new Error('Order failed');
      // success
      localStorage.removeItem('cart');
      setCartItems([]);
      setCartCount(0);
      window.dispatchEvent(new Event('cartUpdated'));
      toast.success('Order placed!', { autoClose: 1500 });
      navigate('/orders');
    } catch (err) {
      console.error(err);
      toast.error('Failed to place order');
    }
  };

  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  if (isLoading)      return <p className="text-center mt-5">Loading cart…</p>;
  if (!cartItems.length)
    return <p className="text-center mt-5">Your cart is empty.</p>;

  const subtotal = products.reduce(
    (sum, p) => sum + p.price * getQuantity(p.id),
    0
  );

  return (
    <main className="site-main main">
      <section className="section">
        <div className="container">
          <div className="row">
            {/* -------- Items list -------- */}
            <div className="col-lg-7 mt-lg-4 mb-4 mb-lg-0">
              <article className="card">
                <div className="card-body">
                  <h2 className="entry-title">
                    Cart <span className="badge bg-primary ms-2">{cartCount}</span>
                  </h2>
                  <table className="table table-borderless">
                    <tbody>
                      {products.map(prod => {
                        const qty   = getQuantity(prod.id);
                        const thumb = images(`./${slugify(prod.name)}.png`);
                        return (
                          <tr key={prod.id} className="align-middle">
                            <td style={{ width: 120 }}>
                              <img
                                src={thumb}
                                alt={prod.name}
                                style={{ width: 100, height: 75, objectFit: 'cover' }}
                              />
                            </td>
                            <td>
                              <h5>{prod.name}</h5>
                              <p className="mb-1 fw-bold">${prod.price.toFixed(2)}</p>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <button
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={() => updateQuantity(prod.id, -1)}
                                >
                                  −
                                </button>
                                <span className="mx-2">{qty}</span>
                                <button
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={() => updateQuantity(prod.id, 1)}
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="text-end fw-bold">
                              ${(prod.price * qty).toFixed(2)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </article>
            </div>

            {/* -------- Summary -------- */}
            <div className="col-lg-5 ms-auto mb-lg-0 mb-3 order-2 mt-lg-4">
              <div className="card card--summary">
                <div className="card-body">
                  <table className="table cart_totals">
                    <tbody>
                      <tr>
                        <th>Subtotal</th>
                        <td>${subtotal.toFixed(2)}</td>
                      </tr>
                      <tr className="fw-bold">
                        <th>Total</th>
                        <td>${subtotal.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <button
                    onClick={handleCheckout}
                    className="btn btn-primary btn-lg w-100"
                  >
                    Proceed to checkout
                  </button>
                  <small className="text-center d-block mt-3">
                    <strong>100% Satisfaction Guarantee</strong>
                    <br />
                    <span className="text-muted">Don’t love it? Full refund.</span>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Cart;
