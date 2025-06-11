import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ORDER_API, PRODUCT_API } from './api';           // ★ NEW

function Orders() {
  const [orders, setOrders]       = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productMap, setProductMap] = useState({});
  const navigate = useNavigate();

  // ------------------------------------------------------------
  // Fetch orders for logged-in user
  // ------------------------------------------------------------
  useEffect(() => {
    const token  = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      navigate('/login');
      return;
    }

    fetch(`${ORDER_API}/api/orders?userId=${userId}`, {           // ★ CHANGED
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch orders');
        return res.json();
      })
      .then(data => setOrders(data))
      .catch(err => {
        console.error(err);
        toast.error('Could not load orders.');
      })
      .finally(() => setIsLoading(false));
  }, [navigate]);

  // ------------------------------------------------------------
  // After orders load, fetch product names once
  // ------------------------------------------------------------
  useEffect(() => {
    if (orders.length === 0) return;
    const ids = Array.from(
      new Set(orders.flatMap(o => o.items?.map(i => i.productId) || []))
    );
    fetch(`${PRODUCT_API}/api/products`)                           // ★ CHANGED
      .then(res => res.json())
      .then(all => {
        const map = {};
        all.filter(p => ids.includes(p.id)).forEach(p => (map[p.id] = p.name));
        setProductMap(map);
      })
      .catch(err => console.error('Error fetching product names:', err));
  }, [orders]);

  // ------------------------------------------------------------
  // Delete order
  // ------------------------------------------------------------
  const handleDelete = orderId => {
    const token = localStorage.getItem('token');
    fetch(`${ORDER_API}/api/orders/${orderId}`, {                 // ★ CHANGED
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('Delete failed');
        setOrders(prev => prev.filter(o => o.id !== orderId));
        toast.success('Order deleted');
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to delete order');
      });
  };

  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  if (isLoading)    return <p className="text-center mt-5">Loading orders…</p>;
  if (orders.length === 0)
    return <p className="text-center mt-5">No orders found.</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Orders</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="table-light">
            <tr>
              <th style={{ minWidth: '200px' }}>Order&nbsp;ID</th>
              <th style={{ whiteSpace: 'nowrap' }}>Date</th>
              <th>Items</th>
              <th className="text-end" style={{ whiteSpace: 'nowrap' }}>
                Total
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => {
              const total = parseFloat(order.totalPrice) || 0;
              const date  = order.orderDate
                ? new Date(order.orderDate).toLocaleString()
                : '—';
              return (
                <tr key={order.id}>
                  <td style={{ wordBreak: 'break-all' }}>{order.id}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{date}</td>
                  <td>
                    {order.items && order.items.length ? (
                      <ul className="list-unstyled mb-0">
                        {order.items.map(i => (
                          <li key={i.id}>
                            {productMap[i.productId] || i.productId} × {i.quantity}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="text-end" style={{ whiteSpace: 'nowrap' }}>
                    ${total.toFixed(2)}
                  </td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(order.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
