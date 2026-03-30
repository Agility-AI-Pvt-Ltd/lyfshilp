import { useState } from "react";
import api from "../api/axios.js";

export default function ContactsForm({ pageName }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    exam: "",
    phone: "",
    studentClass: "",
    stream: "",
    school: "",
    pageName: pageName || "Homepage",
  });


  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState(""); // success or error
  const [loading, setLoading] = useState(false);

  // ✅ Handle form data change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // ✅ Basic validation before submit
  const validateForm = () => {
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(formData.name))
      return "Please enter a valid name (only letters, min 3 characters).";
    if (!emailRegex.test(formData.email))
      return "Please enter a valid email address.";
    if (!phoneRegex.test(formData.phone))
      return "Please enter a valid 10-digit phone number.";
    if (!formData.exam)
      return "Please fill your exam which you want to prep.";    
    if (!formData.studentClass)
      return "Please select your class.";
    if (!formData.stream)
      return "Please select your stream.";
    if (formData.school.length < 3)
      return "Please enter a valid school name.";

    return null;
  };

  // ✅ Submit form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("");
    setStatusType("");

    const validationError = validateForm();
    if (validationError) {
      setStatusMessage(validationError);
      setStatusType("error");
      setTimeout(() => setStatusMessage(""), 2000);
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/contact/register", {
        ...formData,
        pageName,
      });

      if (response.status === 200 || response.status === 201) {
        setStatusMessage("Thank you! Our student counsellor will call you soon.");
        setStatusType("success");
        setFormData({
          name: "",
          email: "",
          exam: "",
          phone: "",
          studentClass: "",
          stream: "",
          school: "",
          pageName: pageName || "Homepage",
        });
      } else {
        setStatusMessage("Something went wrong. Please try again later.");
        setStatusType("error");
      }
    } catch (error) {
      console.error("Error submitting callback form:", error);
      setStatusMessage("Server error! Please try again later.");
      setStatusType("error");
    } finally {
      setLoading(false);
      setTimeout(() => setStatusMessage(""), 2000);
    }
  };


  return (
    <section
      className="w-full overflow-x-hidden px-4 sm:px-8 md:px-16 lg:px-24 py-20"
      style={{
        background:
          "radial-gradient(circle at 18% 42%, rgba(0,200,150,.10), transparent 38%), radial-gradient(circle at 85% 16%, rgba(201,168,76,.08), transparent 30%), var(--color-bg-primary, #0C2D1E)",
      }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border mb-5 text-[11px] font-bold tracking-[2px] uppercase"
          style={{
            color: "#00c896",
            background: "rgba(0,200,150,.09)",
            borderColor: "rgba(0,200,150,.25)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#00c896" }} />
          Student Counselling
        </div>

        <h2
          className="text-2xl sm:text-4xl font-extrabold mb-4 tracking-tight"
          style={{ color: "var(--color-text-body, #FAFDF8)" }}
        >
          Request a Call Back From Our{" "}
          <span style={{ color: "#00c896" }}>Student Counsellor</span>
        </h2>

        <p
          className="mb-8 max-w-2xl mx-auto text-base sm:text-lg"
          style={{ color: "var(--color-text-muted, #7A9E8A)" }}
        >
          Fill the form and our counsellor will assist you personally regarding
          exams, courses, and guidance.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto rounded-2xl p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
        style={{
          background: "rgba(255,255,255,.05)",
          border: "1px solid rgba(0,200,150,.20)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 18px 48px rgba(0,0,0,.35)",
        }}
      >
      {/* Full Name */}
      <div className="flex flex-col text-left">
        <label className="font-semibold mb-1 text-sm" style={{ color: "rgba(255,255,255,.82)" }}>Full Name</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className="rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-all"
          style={{
            border: "1px solid rgba(0,200,150,.22)",
            background: "rgba(255,255,255,.07)",
            color: "#fff",
          }}
          required
        />
      </div>

      {/* Email */}
      <div className="flex flex-col text-left">
        <label className="font-semibold mb-1 text-sm" style={{ color: "rgba(255,255,255,.82)" }}>Email</label>
        <input
          type="text"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-all"
          style={{
            border: "1px solid rgba(0,200,150,.22)",
            background: "rgba(255,255,255,.07)",
            color: "#fff",
          }}
          required
        />
      </div>

      {/* Exam Dropdown */}
      <div className="flex flex-col text-left">
        <label className="font-semibold mb-1 text-sm" style={{ color: "rgba(255,255,255,.82)" }}>Which Exam Are You Preparing For?</label>
        <select
          id="exam"
          value={formData.exam}
          onChange={handleChange}
          className="rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-all"
          style={{
            border: "1px solid rgba(0,200,150,.22)",
            background: "rgba(255,255,255,.07)",
            color: "#fff",
          }}
          required
        >
          <option value="">Select Exam</option>
          <option value="CUET">CUET</option>
          <option value="CLAT">CLAT</option>
          <option value="IPMAT">IPMAT</option>
          <option value="Others">Others</option>
        </select>
      </div>

      {/* Phone */}
      <div className="flex flex-col text-left">
        <label className="font-semibold mb-1 text-sm" style={{ color: "rgba(255,255,255,.82)" }}>Phone Number</label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          className="rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-all"
          style={{
            border: "1px solid rgba(0,200,150,.22)",
            background: "rgba(255,255,255,.07)",
            color: "#fff",
          }}
          required
        />
      </div>

      {/* Class */}
      <div className="flex flex-col text-left">
        <label className="font-semibold mb-1 text-sm" style={{ color: "rgba(255,255,255,.82)" }}>Class</label>
        <select
          id="studentClass"
          value={formData.studentClass}
          onChange={handleChange}
          className="rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-all"
          style={{
            border: "1px solid rgba(0,200,150,.22)",
            background: "rgba(255,255,255,.07)",
            color: "#fff",
          }}
          required
        >
          <option value="">Select class</option>
          <option value="9">Class 9</option>
          <option value="10">Class 10</option>
          <option value="11">Class 11</option>
          <option value="12">Class 12</option>
          <option value="college">College</option>
        </select>
      </div>

      {/* Stream */}
      <div className="flex flex-col text-left">
        <label className="font-semibold mb-1 text-sm" style={{ color: "rgba(255,255,255,.82)" }}>Stream</label>
        <select
          id="stream"
          value={formData.stream}
          onChange={handleChange}
          className="rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-all"
          style={{
            border: "1px solid rgba(0,200,150,.22)",
            background: "rgba(255,255,255,.07)",
            color: "#fff",
          }}
          required
        >
          <option value="">Select stream</option>
          <option value="science">Science</option>
          <option value="commerce">Commerce</option>
          <option value="arts">Arts / Humanities</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* School */}
      <div className="flex flex-col text-left sm:col-span-2">
        <label className="font-semibold mb-1 text-sm" style={{ color: "rgba(255,255,255,.82)" }}>School</label>
        <input
          type="text"
          id="school"
          value={formData.school}
          onChange={handleChange}
          placeholder="Enter your school name"
          className="rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-all"
          style={{
            border: "1px solid rgba(0,200,150,.22)",
            background: "rgba(255,255,255,.07)",
            color: "#fff",
          }}
          required
        />
      </div>

      {/* Submit Button */}
      <div className="sm:col-span-2 flex flex-col items-center pt-2">
        <button
          type="submit"
          disabled={loading}
          className={`text-white font-semibold px-10 py-3 rounded-full shadow-lg transition-all duration-300 text-sm tracking-wide ${
            loading ? "cursor-not-allowed" : "hover:scale-[1.02]"
          }`}
          style={{
            background: loading
              ? "rgba(255,255,255,.2)"
              : "linear-gradient(135deg,#00c896,#128061)",
            boxShadow: loading ? "none" : "0 10px 28px rgba(0,200,150,.35)",
          }}
        >
          {loading ? "Submitting..." : "Request Call Back"}
        </button>

        {statusMessage && (
          <div
            className="mt-4 text-sm font-semibold transition-opacity duration-300"
            style={{ color: statusType === "success" ? "#00c896" : "#ff6b6b" }}
          >
            {statusMessage}
          </div>
        )}
      </div>
    </form>
  </section>
  );
}