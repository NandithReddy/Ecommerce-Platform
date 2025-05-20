import React from 'react';
import logo from './assets/logo.png';

function Signup() {
  return (
    <div className="text-center container mt-5" style={{ maxWidth: '400px' }}>
      <form className="form-signup">
        <img
        className="mb-3"
         src={logo}
          alt="Hexa Store Logo"
         width="100"
         height="100"
        />

        <h1 className="h3 mb-5 font-weight-normal">Create an account</h1>

        <input
          type="text"
          className="form-control mb-2"
          placeholder="First name"
          required
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Last name"
          required
        />
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email address"
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          required
        />

        <button className="btn btn-lg btn-primary btn-block w-100" type="submit">
          Sign up
        </button>
        <p className="mt-5 mb-3 text-muted">Welcome to Hexa Store</p>
      </form>
    </div>
  );
}

export default Signup;
