import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Leaf, Tractor } from "lucide-react"; // nice icons (install lucide-react)

const Login = () => {
  const { login, signup } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (isLogin) {
        res = await login(formData);
        toast.success("🌱 Login successful! Welcome back.");
      } else {
        res = await signup(formData);
        toast.success("🌾 Signup successful! Welcome to Farmer Connect.");
      }

      if (res.token) {
        navigate("/");
      } else {
        toast.error(res.message || "Something went wrong");
      }

      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "⚠️ Error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-10 left-10 text-green-300">
        <Tractor size={120} />
      </div>
      <div className="absolute bottom-10 right-10 text-green-200">
        <Leaf size={100} />
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-green-200 z-10">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-700 flex items-center justify-center gap-2">
          <Leaf className="text-green-600" size={28} />
          {isLogin ? "Farmer Login" : "Join Farmer Connect"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none border-green-300"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none border-green-300"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none border-green-300"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition transform hover:scale-105 shadow-md"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-6 text-green-700">
          {isLogin ? "New to Farmer Connect?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-600 font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
