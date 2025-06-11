// default to localhost for dev; override in Vercel
export const USER_API    = process.env.REACT_APP_USER_API    || 'http://localhost:8080';
export const PRODUCT_API = process.env.REACT_APP_PRODUCT_API || 'http://localhost:8081';
export const ORDER_API   = process.env.REACT_APP_ORDER_API   || 'http://localhost:8082';
