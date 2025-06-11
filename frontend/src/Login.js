import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import logo from './assets/logo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const err = await res.json();
        toast.error(err.message || 'Invalid credentials');
        return;
      }
      const { token } = await res.json();
      const { firstName, lastName, userId } = jwtDecode(token);

      localStorage.setItem('token', token);
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('lastName', lastName);
      localStorage.setItem('userId', userId);

      toast.success(`Welcome back, ${firstName}!`);
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="text-center container mt-5" style={{ maxWidth: '400px' }}>
      <form onSubmit={handleSubmit}>
        <img
          className="mb-4"
          src={logo}
          alt="Hexa Store"
          width="72"
          height="72"
        />
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-lg btn-primary w-100" type="submit">
          Sign in
        </button>

        {/* New prompt under the button */}
        <p className="mt-3 mb-0 text-muted">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-decoration-none">
            Create one here
          </Link>
        </p>
      </form>
    </div>
  );
}
