import React, { useState } from "react";
import api from "../api/axios.js";

export default function OlympiadSection6() {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    schoolName: "",
    contactPerson: "",
    designation: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  // ===================== VALIDATION =====================
  const validateForm = () => {
    if (!form.schoolName.trim()) return "School Name is required";
    if (!form.contactPerson.trim()) return "Contact Person is required";
    if (!form.designation.trim()) return "Designation is required";
    if (!/^\d{10}$/.test(form.phone)) return "Phone number must be 10 digits";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Invalid email format";
    return "";
  };

  // ===================== INPUT HANDLING =====================
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contactPerson") {
      const lettersOnly = value.replace(/[^a-zA-Z\s]/g, "");
      setForm({ ...form, [name]: lettersOnly });
    } else if (name === "phone") {
      const numbersOnly = value.replace(/[^0-9]/g, "").slice(0, 10);
      setForm({ ...form, [name]: numbersOnly });
    } else if (name === "schoolName" || name === "designation") {
      const cleanValue = value.replace(/[^a-zA-Z0-9\s.,-]/g, "");
      setForm({ ...form, [name]: cleanValue });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // ===================== SUBMIT HANDLER =====================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      const res = await api.post("/partner-school/submit", form);

      if (res.data.success) {
        setMsg("Form submitted successfully!");
        setTimeout(() => setMsg(""), 2000);

        setForm({
          schoolName: "",
          contactPerson: "",
          designation: "",
          phone: "",
          email: "",
        });

        setTimeout(() => {
          setOpen(false);
          setMsg("");
        }, 1200);
      }
    } catch (error) {
      setMsg("Something went wrong. Try again.");
      setTimeout(() => setMsg(""), 2000);
    }
    setLoading(false);
  };

  return (
    <section className="relative py-16 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#FFF8EE] overflow-hidden">

      {/* ===================== POPUP FORM ===================== */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center px-4 z-[999]">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl"
              disabled={loading}
            >
              ×
            </button>

            <h2 className="text-2xl font-bold text-center mb-5 text-gray-900">
              Enroll Now
            </h2>

            {/* RESPONSE MESSAGES */}
            {msg && <p className="text-center text-green-600 font-semibold mb-3">{msg}</p>}
            {error && <p className="text-center text-red-600 font-semibold mb-3">{error}</p>}

            {/* FORM */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="font-semibold text-sm">School Name *</label>
                <input
                  name="schoolName"
                  value={form.schoolName}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-green-300"
                  placeholder="Enter school name"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-sm">Contact Person *</label>
                <input
                  name="contactPerson"
                  value={form.contactPerson}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-green-300"
                  placeholder="Enter name"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-sm">Designation in School *</label>
                <input
                  name="designation"
                  value={form.designation}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-green-300"
                  placeholder="Principal / Coordinator / Teacher"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-sm">Phone Number *</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-green-300"
                  placeholder="Enter phone"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-sm">Official Email *</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-green-300"
                  placeholder="Enter email"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full text-white py-3 rounded-lg font-bold text-lg transition ${
                  loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ===================== MAIN CTA SECTION ===================== */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* IMAGE RIGHT */}
        <div className="relative flex justify-center lg:justify-end min-h-[480px] order-1 lg:order-2">
          <div className="absolute top-20 right-10 w-72 h-72 bg-green-200 opacity-30 blur-3xl rounded-full"></div>
          <div className="absolute bottom-10 right-20 w-64 h-64 bg-yellow-200 opacity-25 blur-2xl rounded-full"></div>

          <img
            src="/images/7.svg"
            alt="cta"
            className="relative z-10 w-72 sm:w-[26rem] lg:w-[30rem] object-contain drop-shadow-xl"
          />
        </div>

        {/* TEXT LEFT */}
        <div className="leading-tight space-y-8 max-w-xl order-2 lg:order-1">

          <div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase leading-snug">
              Empower the Next <br />
              <span className="text-green-600 italic">Generation of Leaders</span>
            </h3>

            <p className="mt-3 font-semibold text-sm sm:text-base bg-yellow-100 inline-block px-4 py-1 rounded">
              Join the National Ecosystem of Future-Ready Schools
            </p>
          </div>

          {/* CONTACT CARD */}
          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500">
            <h4 className="font-bold text-gray-900 text-lg mb-4">Contact:</h4>

            <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-snug">
              <div className="flex gap-3">
                <span className="text-blue-500 text-xl">📞</span>
                <div>
                  <strong>Phone:</strong>
                  <p>8595034205 | 7042149608</p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="text-blue-500 text-xl">📧</span>
                <div>
                  <strong>Email:</strong>
                  <p>service.excellence@lyfshilpacademy.com</p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="text-blue-500 text-xl">🌐</span>
                <div>
                  <strong>Website:</strong>
                  <p>lyfshilp.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER NOTE */}
          <div className="bg-gray-50 rounded-xl p-5 shadow-sm border-l-4 border-gray-400 leading-snug">
            <p className="text-xs sm:text-sm text-gray-700">
              International FutureX Fellowship | Powered by Lyfshilp Academy Pvt. Ltd. & AgilityAI Pvt. Ltd.
            </p>
          </div>

          {/* CTA BUTTON */}
          <div
            onClick={() => setOpen(true)}
            className="cursor-pointer bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:scale-[1.03] transition"
          >
            <p className="font-black text-white text-lg sm:text-xl text-center">
              Enroll as a Partner School Today
            </p>
          </div>

        </div>
      </div>

      {/* FLOATING DECORATIONS */}
      <div className="absolute top-10 right-10 w-24 h-24 bg-green-300 opacity-20 blur-xl rounded-full"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-yellow-300 opacity-20 blur-2xl rounded-full"></div>
    </section>
  );
}
