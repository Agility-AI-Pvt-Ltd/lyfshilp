import { useState, useEffect } from "react";
import api from "../api/axios.js";
import { useNavigate, Link } from "react-router-dom";
import LightBulb from "../assets/Login_signup/light-bulb.svg";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [fade, setFade] = useState(false); // 👈 Added for fade-out control

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setFade(false);

    const { email } = form;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\d{10}$/;

    // ✅ Manual validation (email or 10-digit phone only)
    if (!emailRegex.test(email) && !phoneRegex.test(email)) {
      setError("Enter a valid email or 10-digit phone number");
      setFade(false);
      setTimeout(() => setFade(true), 1000); // start fade after short delay
      setTimeout(() => setError(""), 4000); // remove after 2 sec
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/register", form);
      setSuccess(res.data.message || "Registered successfully!");
      setFade(false);
      setTimeout(() => setFade(true), 1000);
      setTimeout(() => setSuccess(""), 4000); // fade out after 2s
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err?.response?.data?.error || "Error during registration");
      setFade(false);
      setTimeout(() => setFade(true), 1000);
      setTimeout(() => setError(""), 4000); // fade out after 2s
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
            alt="Learn with Lyfshilp"
            className="w-40 h-40 mb-6"
          />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Learn, Grow & Succeed For Free
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
            Join 15,000+ students for free and get access to competitive exam
            prep, personalized mentorship, career clarity tools, and
            skill-building courses that guide you every step of the way.
          </p>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full md:w-1/2 p-10">
          {/* Tabs */}
          <div className="flex justify-center gap-8 mb-6 border-b pb-2">
            <span className="text-green-600 font-bold border-b-2 border-green-600 cursor-pointer">
              Contact us
            </span>
            {/* <Link
              to="/login"
              className="text-gray-500 hover:text-gray-800 cursor-pointer"
            >
              Login
            </Link> */}
          </div>

          {/* ✅ SUCCESS/ERROR MESSAGE */}
          {success && (
            <p
              className={`text-green-600 text-sm font-medium mb-3 text-center transition-opacity duration-1000 ${
                fade ? "opacity-0" : "opacity-100"
              }`}
            >
              {success}
            </p>
          )}
          {error && (
            <p
              className={`text-red-500 text-sm font-medium mb-3 text-center transition-opacity duration-1000 ${
                fade ? "opacity-0" : "opacity-100"
              }`}
            >
              {error}
            </p>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Surname"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <input
              type="text"
              name="email"
              placeholder="E-mail or phone number"
              value={form.email}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
                error ? "border-red-500 focus:ring-red-500" : "focus:ring-green-500"
              }`}
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
              {loading ? "Registering..." : "Contact us"}
            </button>
          </form>

          {/* Already have account */}
          {/* <p className="text-center text-gray-600 mt-5">
            Know more about FutureX {" "}
            <Link to="/login" className="text-green-600 font-semibold">
              Log In
            </Link>
          </p> */}
        </div>
      </div>
    </div>
  );
}
