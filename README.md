# E-commerce Platform

A full-stack, microservices-based e-commerce application built with Spring Boot, Spring Security, PostgreSQL, and React, deployed to Railway (backend) and Vercel (frontend).

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
- [Environment Variables](#environment-variables)
- [Database Seeding](#database-seeding)
- [Running with Docker Compose](#running-with-docker-compose)
- [Running Manually](#running-manually)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)
- [License](#license)

## Features
- **User Service**
  - Register & log in users
  - JWT-based authentication & authorization via Spring Security
  - Interactive API documentation with Swagger UI
- **Product Service**
  - CRUD operations on products
  - Pre-seeded catalog of electronics items
  - Interactive API documentation with Swagger UI
- **Order Service**
  - Place, view, and manage orders
  - Integrates with User & Product services
  - Interactive API documentation with Swagger UI
- **React Frontend**
  - Product listing & details
  - Shopping cart & checkout
  - User signup/login & order history
  - Responsive design & toast notifications

## Tech Stack
- **Backend**: Java 21, Spring Boot 3.4.2, Spring Security, Spring Data JPA, Hibernate
- **Database**: PostgreSQL 17
- **Frontend**: React, React Router, React Toastify, Axios
- **DevOps**: Docker & Docker Compose, Railway (services), Vercel (frontend)
- **Documentation**: Swagger UI for API exploration

## Prerequisites
- Java 21+
- npm
- Docker & Docker Compose (for local multi-service setup)

## Local Setup
1. **Clone the repo**
   ```bash
   git clone https://github.com/Hazem-ElKanawati/Ecommerce-Platform.git
   cd Ecommerce-Platform
   ```
2. **Configure environment variables**
   Copy the example files and fill in credentials if needed (for manual runs):
   ```bash
   cp userservice/.env.example userservice/.env
   cp productservice/.env.example productservice/.env
   cp orderservice/.env.example orderservice/.env
   ```

## Environment Variables

| Service         | Variable                                                          | Description                           |
| --------------- | ----------------------------------------------------------------- | ------------------------------------- |
| **User Service**      | `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, `PGPASSWORD`          | Database connection settings          |
| **Product Service**   | Same as above                                                    |                                       |
| **Order Service**     | Same as above<br>`USER_SERVICE_URL`, `PRODUCT_SERVICE_URL`         | Service URLs for inter-service calls  |
| **React Frontend**    | `REACT_APP_USER_API`<br>`REACT_APP_PRODUCT_API`<br>`REACT_APP_ORDER_API` | Backend URLs (defaults to localhost) |

## Database Seeding
- The Product Service includes `data.sql` to insert a sample electronics catalog (headphones, monitors, laptops, etc.).
- The User and Order services will auto-initialize their schemas on startup.

## Running with Docker Compose
Spin up everything (3 DBs + 3 services) in one command:
```bash
docker-compose up --build
```
- User Service → http://localhost:8080/swagger-ui.html
- Product Service → http://localhost:8081/swagger-ui.html
- Order Service → http://localhost:8082/swagger-ui.html

## Running Manually
1. **Backend**
   ```bash
   # From each service folder:
   mvn clean package
   java -jar target/*.jar
   ```
2. **Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

## API Endpoints

### User Service
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET  /api/users/me`

### Product Service
- `GET    /api/products`
- `GET    /api/products/{id}`
- `POST   /api/products`

### Order Service
- `POST /api/orders`
- `GET  /api/orders/user/{userId}`

## Deployment
- **Frontend**: live at  
  https://ecommerce-platform-git-main-hazem-elkanawatis-projects.vercel.app/
- **Backend**: each microservice deployed on Railway.  
  Adjust your React `.env` to point at your Railway URLs for production.

## Future Improvements
- Add role-based access control (admin vs. customer).
- Integrate payment gateway (Stripe/PayPal).
- Write end-to-end tests (Cypress).
- Configure CI/CD pipeline (GitHub Actions).

## License
© Hazem ElKanawati
