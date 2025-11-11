import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import LightBulb from "../assets/Login_signup/light-bulb.svg";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // ✅ error state

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // clear old error
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 pt-20 pb-5">
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden h-[500px]">
        
        {/* LEFT SECTION */}
        <div className="hidden md:flex flex-col justify-center items-center bg-yellow-50 w-1/2 p-10 text-center">
          <img
            src={LightBulb}
            alt="Lyfshilp Login"
            className="w-40 h-40 mb-6"
          />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Learn, Grow & Succeed For Free
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
            Join 15,000+ students for free and get access to competitive exam prep,
            personalized mentorship, career clarity tools, and skill-building courses
            that guide you every step of the way.
          </p>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full md:w-1/2 p-10">
          {/* Tabs */}
          <div className="flex justify-center gap-8 mb-6 border-b pb-2">
            <Link
              to="/register"
              className="text-gray-500 hover:text-gray-800 cursor-pointer"
            >
              Sign Up
            </Link>
            <span className="text-green-600 font-bold border-b-2 border-green-600 cursor-pointer">
              Log In
            </span>
          </div>

          {/* ✅ ERROR MESSAGE */}
          {error && (
            <p className="text-red-500 text-sm font-medium mb-3 text-center">
              {error}
            </p>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="email"
              placeholder="E-mail or phone number"
              value={form.email}
              onChange={handleChange}
              required
              pattern="^(\d{10}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$"
              title="Enter a valid email or 10-digit phone number"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          {/* Don't have account */}
          <p className="text-center text-gray-600 mt-5">
            Don’t have any account?{" "}
            <Link to="/register" className="text-green-600 font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
