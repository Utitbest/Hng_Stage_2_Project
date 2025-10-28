import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { signupMock } from "../../utils/auth"; 
import "../../styles/signup.css";

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if(!form.name) newErrors.name = "Enter user name!"
    else if (!/^[A-Za-z\s]{3,}$/.test(form.name)) newErrors.name = "Username must be at least 3 letters and contain only alphabets";
    if (!form.email) newErrors.email = "Email is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      newErrors.email = "Invalid email format";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (form.password !== form.confirm)
      newErrors.confirm = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const session = signupMock({
        email: form.email,
        password: form.password,
        name: form.name
      });
      console.log("User signed up:", session);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <main className="auth-page container" data-testid="test-signup-page">
        <section className="auth-form-wrapper">
          <h2>Create an Account</h2>
          <p>Join Ticket Manager Pro today!</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">Enter Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.email && (
                <p className="error-text">{errors.name}</p>
              )}
            </div>

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

            <div className="form-group">
              <label htmlFor="confirm">Confirm Password</label>
              <input
                type="password"
                id="confirm"
                name="confirm"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              />
              {errors.confirm && (
                <p className="error-text">{errors.confirm}</p>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>

            <p className="alt-link">
              Already have an account?{" "}
              <Link to="/auth/login">Login here</Link>
            </p>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
