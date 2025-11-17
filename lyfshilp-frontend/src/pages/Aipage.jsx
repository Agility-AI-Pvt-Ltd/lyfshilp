import { useState } from "react";
import api from "../api/axios.js";
import aiImg from "../assets/Olympiadimg/Aiimg.jpg";

export default function Aipage() {
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
    q: "What is the AI Olympiad?",
    a: "The AI Olympiad is a national-level competition that tests students’ understanding of Artificial Intelligence concepts, applications, and ethical awareness through interactive questions and case-based problems.",
  },
  {
    q: "Who can participate in the AI Olympiad?",
    a: "Students from classes 8–12 and college undergraduates from any stream can participate. No prior technical background is required — just curiosity about AI and technology.",
  },
  {
    q: "What is the exam format of the AI Olympiad?",
    a: "The Olympiad is conducted online and includes multiple-choice questions based on AI basics, data interpretation, logic, and real-world AI use cases.",
  },
  {
    q: "What benefits do participants receive?",
    a: "Participants receive national-level recognition, e-certificates, medals, and may get access to AI workshops, internships, or mentorship sessions depending on performance.",
  },
];

  // 🔒 Input sanitization (remove <, >, scripts, etc.)
  const sanitizeInput = (value) => {
    return value
      .replace(/[<>]/g, "") // remove tags
      .replace(/["'`;{}$]/g, "") // remove dangerous chars
      .trim();
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: sanitizeInput(value) });
  };

  // ✅ Handle form submit with backend call
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
      olympiad: "Artificial Intelligence",
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
        {/* Left Section */}
        <div className="lg:col-span-2">
          {/* Hero Banner */}
          <div className="bg-green-700 text-white rounded-2xl p-10 relative overflow-hidden">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Artificial Intelligence <span className="text-yellow-400">Fellowship</span>
            </h1>
            <p className="mt-4 text-gray-100 leading-relaxed">
                The AI Fellowship tests your understanding of automation, machine learning, 
                and real-world applications of AI, helping you think like a technologist 
                and problem-solver.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <span className="px-5 py-2 rounded-full bg-white/10 border border-white/30 text-white font-medium">📝 28 Questions</span>
              <span className="px-5 py-2 rounded-full bg-white/10 border border-white/30 text-white font-medium">⏱️ 20 mins</span>
              <span className="px-5 py-2 rounded-full bg-white/10 border border-white/30 text-white font-medium">🤖 Quiz</span>
              <span className="px-5 py-2 rounded-full bg-white/10 border border-white/30 text-white font-medium">🌐 English</span>
            </div>
          </div>

          {/* What you'll learn */}
          <div className="mt-10 bg-white rounded-xl shadow p-6 border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What you'll learn</h2>
            <ul className="space-y-3 text-gray-700 list-disc list-inside">
              <li>Understand AI fundamentals  algorithms, automation, and intelligent systems.</li>
              <li>Learn how AI impacts healthcare, education, finance, and governance.</li>
              <li>Explore ethical AI usage, data privacy, and responsible innovation.</li>
              <li>Build logical reasoning and analytical thinking skills through scenario-based problems.</li>
            </ul>
          </div>
          
          {/* Requirements */}
          <div className="mt-6 bg-white rounded-xl shadow p-6 border">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Requirements</h2>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li>No coding knowledge required  designed for all students.</li>
              <li>Interest in technology and logical reasoning.</li>
              <li>Basic understanding of mathematics and daily tech use is beneficial.</li>
            </ul>
          </div>

          {/* What you'll get */}
          <div className="mt-6 bg-white rounded-xl shadow p-6 border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What you'll get</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl mb-3">🤖</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">AI-Powered Feedback</h3>
                <p className="text-sm text-gray-600">See your performance insights across logic, innovation, and conceptual understanding.</p>
              </div>
              <div>
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">Certificates of Excellence</h3>
                <p className="text-sm text-gray-600">Showcase your future-readiness and interest in cutting-edge technologies.</p>
              </div>
              <div>
                <div className="text-4xl mb-3">🔓</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">Anytime Free Access</h3>
                <p className="text-sm text-gray-600"> Participate anytime and strengthen your AI literacy for future courses and careers.</p>
              </div>
            </div>
          </div>

          {/* FAQs */}
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

        {/* Right Floating Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border text-center flex flex-col items-center self-start">
          <img src={aiImg} alt="AI Olympiad" className="w-full rounded-xl mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Artificial Intelligence – Fellowship</h3>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-4">
            <span>👥 22K+ Learners</span>
            <span>⭐ 4.8 Rating</span>
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

      {/* Popup Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md relative shadow-2xl animate-fadeIn">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">Register for AI FutureX Fellowship</h2>

            {/* Show error/success */}
            {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}
            {success && <p className="text-green-600 text-sm mb-3 text-center font-medium">{success}</p>}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full border rounded-lg px-4 py-2" />
              <input name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full border rounded-lg px-4 py-2" />
              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full border rounded-lg px-4 py-2" />
              <input name="className" value={formData.className} onChange={handleChange} placeholder="Class" className="w-full border rounded-lg px-4 py-2" />
              <input name="school" value={formData.school} onChange={handleChange} placeholder="School" className="w-full border rounded-lg px-4 py-2" />
              <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="w-full border rounded-lg px-4 py-2" />
              <input name="state" value={formData.state} onChange={handleChange} placeholder="State" className="w-full border rounded-lg px-4 py-2" />

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

      {/* Animation */}
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
