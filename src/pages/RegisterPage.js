import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Student',
    passwordHash: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert('Registered successfully!');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data || 'Something went wrong error');
    }
  };

  return (
    <div
  className="d-flex justify-content-center align-items-center"
  style={{ minHeight: "75vh" }}
>
  <div
    className="bg-white p-4 shadow rounded-4"
    style={{ width: "100%", maxWidth: "400px" }}
  >
    <h3 className="text-center mb-4">
      Register to <span className="text-primary">EduSync</span>
    </h3>

      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            name="name"
            className="form-control"
            placeholder="Enter your full name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="example@gmail.com"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Role</label>
          <select
            name="role"
            className="form-select"
            onChange={handleChange}
            required
          >
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            name="passwordHash"
            type="password"
            className="form-control"
            placeholder="Enter your password"
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-primary w-100" type="submit">
          Register
        </button>
      </form>

      {/* Already have an account section */}
      <div className="mt-4 text-center">
        <span>Already have an account? </span>
        <Link to="/login" className="text-decoration-none">
          Login
        </Link>
      </div>
    </div>
    </div>
  );
};

export default RegisterPage;
