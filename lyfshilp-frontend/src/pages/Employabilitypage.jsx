import { useState } from "react";
import api from "../api/axios";
import employabilityImg from "../assets/Olympiadimg/Empimg.png";

export default function Employabilitypage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [showForm, setShowForm] = useState(false);
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
    q: "What is the Employability Olympiad?",
    a: "The Employability Olympiad is a national-level assessment that evaluates students’ job readiness skills such as communication, problem-solving, and workplace aptitude.",
  },
  {
    q: "Who can participate in the Employability Olympiad?",
    a: "Any college or senior school student aiming to improve their employability skills and career readiness can participate irrespective of their academic stream.",
  },
  {
    q: "What does the Olympiad assess?",
    a: "It assesses key workplace skills like logical reasoning, communication, teamwork, leadership, and adaptability all essential for professional success.",
  },
  {
    q: "What are the benefits of participating?",
    a: "Participants receive performance reports, national-level certificates, and opportunities for skill-building workshops or internships that enhance their resume value.",
  },
];


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { name, email, phone, className, school, city, state } = formData;

    // ✅ Frontend validation (same as Financepage)
    if (!name || !email || !phone || !className || !school || !city || !state) {
      setError("Please fill out all fields.");
      return;
    }

    const nameRegex = /^[a-zA-Z\s]{3,40}$/;
    const phoneRegex = /^[0-9]{10}$/;
    const textRegex = /^[a-zA-Z0-9\s.,'-]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(name)) {
      setError("Name can only contain letters and spaces (3–40 chars).");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!phoneRegex.test(phone)) {
      setError("Phone number must be 10 digits.");
      return;
    }
    if (
      !textRegex.test(className) ||
      !textRegex.test(school) ||
      !textRegex.test(city) ||
      !textRegex.test(state)
    ) {
      setError("Fields contain invalid characters.");
      return;
    }

    try {
      const response = await api.post("/olympiad/register", {
        ...formData,
        olympiad: "Employability",
      });

      if (response.data.success) {
        setSuccess("Registration successful! We’ll contact you soon.");
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
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server error. Please try again later.");
    }
  };

  return (
    <section className="relative pb-16 pt-28 bg-white">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT SECTION */}
        <div className="lg:col-span-2">
          <div className="bg-green-700 text-white rounded-2xl p-10 relative overflow-hidden">
            <h1 className="text-3xl md:text-4xl font-bold">
              Employability <span className="text-yellow-400">Olympiad</span>
            </h1>
            <p className="mt-4 text-gray-100 leading-relaxed">
               The Employability Olympiad evaluates essential workplace skills, communication, problem-solving, critical thinking, and collaboration  through interactive real-world challenges.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <span className="px-5 py-2 rounded-full bg-white/10 border border-white/30 text-white font-medium">📝 28 Questions</span>
              <span className="px-5 py-2 rounded-full bg-white/10 border border-white/30 text-white font-medium">⏱️ 20 mins</span>
              <span className="px-5 py-2 rounded-full bg-white/10 border border-white/30 text-white font-medium">💼 Quiz</span>
              <span className="px-5 py-2 rounded-full bg-white/10 border border-white/30 text-white font-medium">🌐 English</span>
            </div>
          </div>

          {/* WHAT YOU’LL LEARN */}
          <div className="mt-10 bg-white rounded-xl shadow p-6 border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What you'll learn</h2>
            <ul className="space-y-3 text-gray-700 list-disc list-inside">
              <li>Understand workplace readiness and essential 21st-century employability skills.</li>
              <li>Develop communication, teamwork, and interpersonal problem-solving techniques.</li>
              <li>Explore leadership and adaptability through realistic job-based scenarios.</li>
              <li>Build decision-making and time management strategies to perform efficiently in professional environments.</li>
            </ul>
          </div>

          
          {/* Requirements */}
          <div className="mt-6 bg-white rounded-xl shadow p-6 border">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Requirements</h2>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li>Open to students of all streams (Classes 6–12 &above ).</li>
              <li>Basic understanding of English communication is helpful.</li>
              <li>Enthusiasm to learn about the modern workplace and industry skills.</li>
            </ul>
          </div>

          {/* WHAT YOU’LL GET */}
          <div className="mt-6 bg-white rounded-xl shadow p-6 border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What you'll get</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl mb-3">💼</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">AI-Powered Feedback</h3>
                <p className="text-sm text-gray-600">
                  Instant performance reports highlighting strengths, communication accuracy, and improvement areas.
                </p>
              </div>
              <div>
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">Certificates of Excellence</h3>
                <p className="text-sm text-gray-600">
                   Validate your employability readiness and enhance your academic and professional portfolio.
                </p>
              </div>
              <div>
                <div className="text-4xl mb-3">🔓</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">Anytime Free Access</h3>
                <p className="text-sm text-gray-600">
                  Attempt from anywhere, anytime deal for school and college students preparing for placements or internships.
                </p>
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
          <img src={employabilityImg} alt="Employability Olympiad" className="w-full rounded-xl mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Employability – Olympiad</h3>
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
            <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">Register for Olympiad</h2>

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
                className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
              >
                Submit
              </button>
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
