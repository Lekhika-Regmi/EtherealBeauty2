import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ Loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const loginData = { email, password };

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        setIsSuccess(true);
        setMessage("Login successful!");
        
        // ✅ Store user & token in localStorage
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        // ✅ Dispatch to Redux
        dispatch(loginSuccess({ user: result.user, token: result.token }));

        // ✅ Navigate based on user role
        const role = result.user.role;
        setTimeout(() => {
          if (role === "superadmin") {
            navigate("/");
          } else if (role === "vendor") {
            navigate("/vendor");
          } else {
            navigate("/");
          }
        }, 1500);
      } else {
        setIsSuccess(false);
        setMessage(result.message || "Invalid credentials");
      }
    } catch (err) {
      setLoading(false);
      setIsSuccess(false);
      setMessage("Error during login. Please try again.");
      console.error(err);
    }
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-sm border shadow bg-white mx-auto p-8 rounded-lg">
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        <form className="space-y-5 mt-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block font-medium">E-mail</label>
            <input
              type="email"
              name="email"
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block font-medium">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-md"
            />
          </div>

          {message && (
            <p className={`text-center ${isSuccess ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 text-white bg-rose-600 font-bold py-3 rounded-md transition transform duration-300 hover:scale-105 disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <p className="mt-4 text-sm text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-rose-600 font-semibold">Register</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
