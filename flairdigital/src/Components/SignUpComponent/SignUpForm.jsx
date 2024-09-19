import React, { useState } from "react";
import axios from "axios"; // Import axios
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignUpForm.scss";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  });
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^[0-9]{10}$/;
    const strongPasswordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.userName) newErrors.userName = "User name is required";
    if (!formData.email || !emailPattern.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.mobile || !mobilePattern.test(formData.mobile))
      newErrors.mobile = "Valid 10-digit mobile number is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm Password is required";
    if (formData.password && !strongPasswordPattern.test(formData.password))
      newErrors.password = "Password must be strong";
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      setApiError(null);

      try {
        const response = await axios.post(
          "https://your-backend-url.com/api/signup",
          formData
        );

        alert("Signup successful!");
        setFormData({
          fullName: "",
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
          mobile: "",
        });
        setErrors({});
      } catch (error) {
        setApiError(
          error.response?.data?.message || "An error occurred while signing up."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="signup-container">
      <div className="signup-form-card">
        <h2>Sign Up</h2>
        {apiError && <div className="alert alert-danger">{apiError}</div>}
        <form onSubmit={handleSubmit}>
          {/* Flex container for Full Name and User Name */}
          <div className="form-row">
            <div className="mb-3 flex-item">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className={`form-control ${
                  errors.fullName ? "is-invalid" : ""
                }`}
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <div className="invalid-feedback">{errors.fullName}</div>
              )}
            </div>

            <div className="mb-3 flex-item">
              <label className="form-label">User Name</label>
              <input
                type="text"
                className={`form-control ${
                  errors.userName ? "is-invalid" : ""
                }`}
                name="userName"
                value={formData.userName}
                onChange={handleChange}
              />
              {errors.userName && (
                <div className="invalid-feedback">{errors.userName}</div>
              )}
            </div>
          </div>

          {/* Flex container for Email and Mobile */}
          <div className="form-row">
            <div className="mb-3 flex-item">
              <label className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <div className="mb-3 flex-item">
              <label className="form-label">Mobile</label>
              <input
                type="text"
                className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
              {errors.mobile && (
                <div className="invalid-feedback">{errors.mobile}</div>
              )}
            </div>
          </div>

          <div className="mb-3 position-relative">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={passwordVisible ? "text" : "password"}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="input-group-text"
                onClick={togglePasswordVisibility}
              >
                <i
                  className={passwordVisible ? "bi bi-eye" : "bi bi-eye-slash"}
                ></i>
              </button>
            </div>
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <div className="mb-3 position-relative">
            <label className="form-label">Confirm Password</label>
            <div className="input-group">
              <input
                type={passwordVisible ? "text" : "password"}
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="input-group-text"
                onClick={togglePasswordVisibility}
              >
                <i
                  className={passwordVisible ? "bi bi-eye" : "bi bi-eye-slash"}
                ></i>
              </button>
            </div>
            {errors.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword}</div>
            )}
          </div>

          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="terms" />
            <label className="form-check-label" htmlFor="terms">
              I accept the terms and conditions
            </label>
            {errors.terms && <div className="terms-error">{errors.terms}</div>}
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
