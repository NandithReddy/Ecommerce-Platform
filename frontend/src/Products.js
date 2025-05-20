import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get('name');

  useEffect(() => {
    const url = name
      ? `http://localhost:8081/api/products/search?name=${encodeURIComponent(name)}`
      : `http://localhost:8081/api/products`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setIsLoading(false);
      });
  }, [name]);

  return (
    <main>
      <div className="album py-5 bg-body-tertiary">
        <div className="container">
          <h2 className="text-center mb-4">All Products</h2>

          {isLoading ? (
            <p className="text-center">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-center text-muted">No products found.</p>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
              {products
                .filter((product) => product.stock > 0)
                .map((product) => (
                  <div className="col" key={product.id}>
                    <div className="card h-100 shadow-sm">
                      <svg
                        className="bd-placeholder-img card-img-top"
                        width="100%"
                        height="225"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-label="Placeholder: Thumbnail"
                        preserveAspectRatio="xMidYMid slice"
                        focusable="false"
                      >
                        <rect width="100%" height="100%" fill="#55595c" />
                        <text x="50%" y="50%" fill="#eceeef" dy=".3em" textAnchor="middle">
                          {product.name}
                        </text>
                      </svg>

                      <div className="card-body d-flex flex-column">
                        <p className="card-text">{product.description}</p>
                        <p className="fw-bold mb-2">${product.price}</p>
                        <div className="mt-auto d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <button className="btn btn-sm btn-outline-secondary">View</button>
                            <button className="btn btn-sm btn-outline-secondary">Add to cart</button>
                          </div>
                          <small className="text-muted">{product.stock} in stock</small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Products;
