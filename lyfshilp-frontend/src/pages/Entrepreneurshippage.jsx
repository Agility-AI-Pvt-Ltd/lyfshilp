import { useState } from "react";
import api from "../api/axios.js";
import entrepreneurshipImg from "../assets/Olympiadimg/Entrepimg.jpg";

export default function Entrepreneurshippage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState(""); // success or error

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    className: "",
    school: "",
    city: "",
    state: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

const faqs = [
  {
    q: "What is the Entrepreneurship Olympiad?",
    a: "The Entrepreneurship Olympiad is a national-level competition designed to test students’ creativity, business understanding, problem-solving, and innovative thinking in real-world scenarios.",
  },
  {
    q: "Who can participate in the Entrepreneurship Olympiad?",
    a: "Students from classes 9–12 and college undergraduates from any stream can participate. No prior business experience is required just an interest in entrepreneurship and innovation.",
  },
  {
    q: "What topics are covered in the Olympiad?",
    a: "The test includes questions on startup ideas, marketing, financial planning, leadership, and critical thinking. Some rounds may also include case studies or idea presentations.",
  },
  {
    q: "What are the benefits of participating?",
    a: "Participants gain entrepreneurial exposure, national-level certificates, and opportunities for workshops, mentorship, and internships that enhance their startup and career journey.",
  },
];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");
  setStatusMessage("");
  setStatusType("");
  setLoading(true);

  const { name, email, phone, className, school, city, state } = formData;

  // Frontend validation
  if (!name || !email || !phone || !className || !school || !city || !state) {
    setLoading(false);
    setError("Please fill out all fields.");
    return;
  }

  const nameRegex = /^[a-zA-Z\s]{3,40}$/;
  const phoneRegex = /^[0-9]{10}$/;
  const textRegex = /^[a-zA-Z0-9\s.,'-]{1,50}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nameRegex.test(name)) {
    setLoading(false);
    setError("Name can only contain letters and spaces (3–40 chars).");
    return;
  }
  if (!emailRegex.test(email)) {
    setLoading(false);
    setError("Please enter a valid email address.");
    return;
  }
  if (!phoneRegex.test(phone)) {
    setLoading(false);
    setError("Phone number must be 10 digits.");
    return;
  }
  if (!textRegex.test(className) || !textRegex.test(school) || !textRegex.test(city) || !textRegex.test(state)) {
    setLoading(false);
    setError("Fields contain invalid characters.");
    return;
  }

  try {
    const response = await api.post("/olympiad/register", {
      ...formData,
      olympiad: "Entrepreneurship",
    });

    if (response.data.success) {
      setSuccess("Registration successful! We’ll contact you soon.");
      setStatusMessage("Registration successful!");
      setStatusType("success");

      setFormData({
        name: "",
        email: "",
        phone: "",
        className: "",
        school: "",
        city: "",
        state: "",
      });

      setTimeout(() => {
        setShowForm(false);
        setSuccess("");
      }, 2000);
    } else {
      setError(response.data.message || "Something went wrong. Please try again.");
      setStatusMessage(response.data.message || "Something went wrong.");
      setStatusType("error");
    }
  } catch (err) {
    console.error(err);
    setError(err.response?.data?.message || "Server error. Please try again later.");
    setStatusMessage(err.response?.data?.message || "Server error.");
    setStatusType("error");
  }

  setLoading(false);
};

  return (
    <section className="relative pb-16 pt-28 bg-white">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2">
          <div className="bg-green-700 text-white rounded-2xl p-10 relative overflow-hidden">
            <h1 className="text-3xl md:text-4xl font-bold">
              Entrepreneurship <span className="text-yellow-400">Fellowship</span>
            </h1>
            <p className="mt-4 text-gray-100 leading-relaxed">
               Test your innovation mindset, business acumen, and problem-solving ability through practical startup-inspired scenarios.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <span className="px-5 py-2 rounded-full bg-white/10 border border-white/30 text-white font-medium">📝 28 Questions</span>
              <span className="px-5 py-2 rounded-full bg-white/10 border border-white/30 text-white font-medium">⏱️ 20 mins</span>
              <span className="px-5 py-2 rounded-full bg-white/10 border border-white/30 text-white font-medium">❓ Quiz</span>
              <span className="px-5 py-2 rounded-full bg-white/10 border border-white/30 text-white font-medium">🌐 English</span>
            </div>
          </div>

          {/* WHAT YOU'LL LEARN */}
          <div className="mt-10 bg-white rounded-xl shadow p-6 border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What you'll learn</h2>
            <ul className="space-y-3 text-gray-700 list-disc list-inside">
              <li>Understand how businesses start, grow, and sustain in competitive markets.</li>
              <li>Learn the basics of value creation, marketing, finance, and leadership.</li>
              <li>Explore real-life entrepreneurial case studies and success stories.</li>
              <li>Strengthen creativity, risk-taking, and decision-making skills.</li>
            </ul>
          </div>
          
          {/* Requirements */}
          <div className="mt-6 bg-white rounded-xl shadow p-6 border">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Requirements</h2>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li>Open to all students (no commerce background needed).</li>
              <li>Basic understanding of economics or business is helpful but not required.</li>
              <li>Passion for innovation and problem-solving.</li>
            </ul>
          </div>

          {/* WHAT YOU'LL GET */}
          <div className="mt-6 bg-white rounded-xl shadow p-6 border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What you'll get</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl mb-3">💡</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">AI-Powered Feedback</h3>
                <p className="text-sm text-gray-600">
                   Get personalized insights on innovation, strategy, and leadership tendencies.
                </p>
              </div>
              <div>
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">Certificates of Excellence</h3>
                <p className="text-sm text-gray-600">
                  Boost your academic and entrepreneurial profile with merit certificates.
                </p>
              </div>
              <div>
                <div className="text-4xl mb-3">🌐</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">Anytime Free Access</h3>
                <p className="text-sm text-gray-600">
                 Attempt the Olympiad from anywhere — ideal for aspiring founders and innovators.</p>
              </div>
            </div>
          </div>

          {/* FAQ SECTION */}
          <div className="mt-6 bg-white rounded-xl shadow p-6 border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
            {faqs.map((faq, i) => (
              <div key={i} className="border rounded-lg mb-3">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full text-left px-4 py-3 flex justify-between items-center font-medium"
                >
                  {faq.q}
                  <span>{activeFaq === i ? "−" : "+"}</span>
                </button>
                {activeFaq === i && <div className="px-4 pb-3 text-sm text-gray-600">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT REGISTER CARD */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border text-center flex flex-col items-center self-start">
          <img src={entrepreneurshipImg} alt="Entrepreneurship Olympiad" className="w-full rounded-xl mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Entrepreneurship – Fellowship</h3>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-4">
            <span>👥 12K+ Learners</span>
            <span>⭐ 4.9 Rating</span>
            <span>🎁 Free</span>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition"
          >
            Register Now
          </button>
        </div>
      </div>

      {/* POPUP FORM */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md relative shadow-2xl animate-fadeIn">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">Register for Entrepreneurship FutureX Fellowship</h2>

            {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}
            {success && <p className="text-green-600 text-sm mb-3 text-center font-medium">{success}</p>}

            <form className="space-y-4" onSubmit={handleSubmit}>
              {["name", "email", "phone", "className", "school", "city", "state"].map((field) => (
                <input
                  key={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={
                    field === "className"
                      ? "Class"
                      : field.charAt(0).toUpperCase() + field.slice(1)
                  }
                  className="w-full border rounded-lg px-4 py-2"
                />
              ))}
          <button
          type="submit"
          disabled={loading}
          className={`${
            loading ? "bg-green-400 cursor-not-allowed" : "bg-gradient-to-r from-green-600 to-green-700 hover:scale-[1.03]"
          } text-white font-semibold px-10 py-2 rounded-full shadow-lg transition-all duration-300 text-lg`}
         >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {statusMessage && (
          <div
            className={`mt-4 text-lg font-semibold transition-opacity duration-300 ${
              statusType === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {statusMessage}
          </div>
        )}
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}
