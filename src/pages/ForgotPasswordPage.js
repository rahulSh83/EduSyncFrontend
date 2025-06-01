import React, { useState } from "react";
import axios from "axios";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Auth/forgot-password`,
        { email, newPassword}
      );
      setMessage(response.data.message);
      setError("");
    } catch (err) {
      console.error("Error resetting password:", err);

      const errorData = err.response?.data;

      let errorMsg = "Something went wrong";
      if (typeof errorData === "string") {
        errorMsg = errorData;
      } else if (errorData?.title) {
        errorMsg = errorData.title;
      } else if (errorData?.errors) {
        const firstKey = Object.keys(errorData.errors)[0];
        errorMsg = errorData.errors[firstKey][0];
      }

      setMessage("");
      setError(errorMsg);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-3 text-center">Forgot Password</h3>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>New Password</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            required
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100" type="submit">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
