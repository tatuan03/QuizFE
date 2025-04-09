import React, { useState } from "react";

const Auth = ({ setUser, closeModal }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const url = isLogin 
      ? "http://localhost:9192/api/auth/login" 
      : "http://localhost:9192/api/auth/sign-up";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      setUser(data); // Lưu user vào state
      closeModal(); // Đóng modal sau khi đăng nhập thành công
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" name="name" className="form-control" onChange={handleChange} required />
          </div>
        )}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <button className="btn btn-link mt-2" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Create an account" : "Already have an account? Login"}
      </button>
    </div>
  );
};

export default Auth;
