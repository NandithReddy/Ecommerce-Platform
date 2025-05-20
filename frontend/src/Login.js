import React from 'react';
import logo from './assets/logo.png';

function Login() {
  return (
    <div className="text-center container mt-5" style={{ maxWidth: '330px' }}>
      <form className="form-signin">
        <img
           className="mb-3"
           src={logo}
           alt="Hexa Store Logo"
          width="100"
           height="100"
          />
        <h1 className="h3 mb-5 font-weight-normal">Please Sign in</h1>

        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control mb-2"
          placeholder="Email address"
          required
          autoFocus
        />

        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control mb-3"
          placeholder="Password"
          required
        />

        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>

        <button className="btn btn-lg btn-primary btn-block w-100" type="submit">
          Sign in
        </button>
        <p className="mt-5 mb-3 text-muted">© 2024–2025</p>
      </form>
    </div>
  );
}

export default Login;
