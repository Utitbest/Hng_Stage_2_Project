import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { loginMock } from "../../utils/auth";
import "../../styles/signup.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      newErrors.email = "Invalid email format";
    if (!form.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      loginMock(form);
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="auth-page container" data-testid="test-login-page">
        <section className="auth-form-wrapper">
          <h2>Welcome Back 👋</h2>
          <p>Please log in to continue managing your tickets.</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && (
                <p className="error-text">{errors.email}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              {errors.password && (
                <p className="error-text">{errors.password}</p>
              )}
            </div>

            {message && <p className="error-global">{message}</p>}

            <button type="submit" className="btn btn-primary">
              Login
            </button>

            <p className="alt-link">
              Don’t have an account?{" "}
              <Link to="/auth/signup">Create one here</Link>
            </p>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
