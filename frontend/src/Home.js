import React, { useEffect, useState } from 'react';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/api/products')
      .then((res) => res.json())
      .then((data) => {
        const featured = data.slice(0, 3); // Pick first 3 products
        setProducts(featured);
      });
  }, []);

  return (
    <main>
      <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {products.map((_, i) => (
            <button
              key={i}
              type="button"
              data-bs-target="#myCarousel"
              data-bs-slide-to={i}
              className={i === 0 ? 'active' : ''}
              aria-current={i === 0 ? 'true' : undefined}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="carousel-inner">
          {products.map((product, i) => (
            <div key={product.id} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
              <svg
                className="bd-placeholder-img"
                width="100%"
                height="500"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
              >
                <rect width="100%" height="100%" fill="#777" />
                <text x="50%" y="50%" fill="#fff" dy=".3em">
                  {product.name}
                </text>
              </svg>

              <div className="container">
                <div className="carousel-caption text-start">
                  <h1>{product.name}</h1>
                  <p>{product.description}</p>
                  <p>
                    <a className="btn btn-lg btn-primary" href="#">
                      ${product.price}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

    </main>
  );
}

export default Home;
