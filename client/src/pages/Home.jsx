import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { token, logout, user } = useContext(AuthContext);

  // Protect route → if not logged in, redirect to login
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 min-h-screen flex flex-col">
      {/* Navbar with Logout */}
      <nav className="flex justify-between items-center px-6 py-4 bg-green-700 text-white shadow">
        <h1 className="text-xl font-bold">🌱 Farmer Connect</h1>
        <div className="flex items-center gap-4">
          {/* Greeting with username */}
          {user && <span className="font-medium">Hi, {user.fullName} 👋</span>}
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-16 px-6 flex-grow">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
          Welcome {user?.username ? user.username : "Farmer"} 🌱
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Buy seeds, tools, fertilizers, and sell your crops directly to buyers. 
          Empowering farmers with technology for a better tomorrow.
        </p>
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => navigate("/shop")}
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            Shop Now
          </button>
          <button
            onClick={() => navigate("/sell")}
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
          >
            Sell Your Products
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-semibold text-green-700 text-center mb-8">
          Explore Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { name: "Seeds", icon: "🌾" },
            { name: "Tools", icon: "🛠️" },
            { name: "Fertilizers", icon: "💧" },
            { name: "Crops", icon: "🥬" },
          ].map((cat, i) => (
            <div
              key={i}
              className="flex flex-col items-center bg-white p-6 rounded-2xl shadow hover:scale-105 transition cursor-pointer border"
            >
              <span className="text-4xl">{cat.icon}</span>
              <p className="mt-2 text-lg font-medium text-green-700">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-12 px-6 bg-green-50">
        <h2 className="text-2xl font-semibold text-green-700 text-center mb-8">
          Popular Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { name: "Hybrid Wheat Seeds", price: "₹1200 /kg", img: "https://via.placeholder.com/150" },
            { name: "Organic Fertilizer", price: "₹500 /bag", img: "https://via.placeholder.com/150" },
            { name: "Tractor Tool Kit", price: "₹2500", img: "https://via.placeholder.com/150" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition border"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-40 object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-green-700">
                  {item.name}
                </h3>
                <p className="text-gray-600">{item.price}</p>
                <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Farmer Connect Banner */}
      <section className="py-12 px-6 text-center">
        <div className="bg-yellow-100 rounded-2xl p-8 max-w-4xl mx-auto shadow">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            👩‍🌾 Sell Your Products Directly
          </h2>
          <p className="text-gray-700 mb-6">
            Connect with buyers without middlemen. Earn more from your hard work.
          </p>
          <button
            onClick={() => navigate("/sell")}
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
          >
            Start Selling
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-700 text-white py-6 text-center mt-12">
        <p>© 2025 Farmer Connect. Empowering Farmers 🌱</p>
      </footer>
    </div>
  );
};

export default Home;
