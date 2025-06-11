import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import logo from './assets/logo.png';

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const err = await res.json();
        toast.error(err.error || 'Signup failed');
        return;
      }
      const { token } = await res.json();
      const { firstName, lastName, userId } = jwtDecode(token);
      localStorage.setItem('token', token);
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('lastName', lastName);
      localStorage.setItem('userId', userId);
      toast.success(`Welcome, ${firstName}!`);
      navigate('/');
    } catch (err) {
      console.error('Signup failed:', err);
      toast.error('Signup failed. Please try again.');
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
        <h1 className="h3 mb-3 fw-normal">Create your account</h1>

        <input
          type="text"
          name="firstName"
          className="form-control mb-2"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          className="form-control mb-2"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          className="form-control mb-2"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          className="form-control mb-3"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="btn btn-lg btn-primary w-100" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
}
