import { useState } from "react";
import api from "../api/axios.js";

export default function ContactsForm({ pageName }){
// at the top of your component
const [formData, setFormData] = useState({
  name: "",
  email: "",
  exam: "",
  phone: "",
  studentClass: "",
  stream: "",
  school: "",
  pageName: pageName || "Homepage", //added
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
    // ✅ Send all fields including pageName
    const response = await api.post("/contact/register", {
      ...formData,
      pageName, // 👈 ensure course/page name is sent
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
        pageName: pageName || "Homepage", // 👈 reset also
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
  <section className="bg-[#FFF8EE] pb-12 pt-20 px-4 sm:px-8 md:px-16 lg:px-24 text-center w-full overflow-x-hidden">

    <h2 className="text-2xl sm:text-4xl font-extrabold text-green-700 mb-4 tracking-tight">
      Request a Call Back From Our <span className="text-gray-900"> Student Counsellor</span>
    </h2>

    <p className="text-gray-700 mb-6 max-w-2xl mx-auto text-lg">
      Fill the form and our counsellor will assist you personally regarding exams, courses & guidance.
    </p>

    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white/90 backdrop-blur-lg border border-green-100 shadow-xl rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-300"
    >
      {/* Full Name */}
      <div className="flex flex-col text-left">
        <label className="font-semibold text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className="border border-gray-300 rounded-2xl px-4 py-1 text-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all hover:shadow-md"
          required
        />
      </div>

      {/* Email */}
      <div className="flex flex-col text-left">
        <label className="font-semibold text-gray-700 mb-1">Email</label>
        <input
          type="text"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="border border-gray-300 rounded-2xl px-4 py-1 text-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all hover:shadow-md"
          required
        />
      </div>

      {/* Exam Dropdown */}
      <div className="flex flex-col text-left">
        <label className="font-semibold text-gray-700 mb-1">Which Exam Are You Preparing For?</label>
        <select
          id="exam"
          value={formData.exam}
          onChange={handleChange}
          className="border border-gray-300 rounded-2xl px-4 py-1 text-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all hover:shadow-md"
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
        <label className="font-semibold text-gray-700 mb-1">Phone Number</label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          className="border border-gray-300 rounded-2xl px-4 py-1 text-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all hover:shadow-md"
          required
        />
      </div>

      {/* Class */}
      <div className="flex flex-col text-left">
        <label className="font-semibold text-gray-700 mb-1">Class</label>
        <select
          id="studentClass"
          value={formData.studentClass}
          onChange={handleChange}
          className="border border-gray-300 rounded-2xl px-4 py-1 text-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all hover:shadow-md"
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
        <label className="font-semibold text-gray-700 mb-1">Stream</label>
        <select
          id="stream"
          value={formData.stream}
          onChange={handleChange}
          className="border border-gray-300 rounded-2xl px-4 py-1 text-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all hover:shadow-md"
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
        <label className="font-semibold text-gray-700 mb-1">School</label>
        <input
          type="text"
          id="school"
          value={formData.school}
          onChange={handleChange}
          placeholder="Enter your school name"
          className="border border-gray-300 rounded-2xl px-4 py-1 text-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all hover:shadow-md"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="sm:col-span-2 flex flex-col items-center">
        <button
          type="submit"
          disabled={loading}
          className={`${
            loading ? "bg-green-400 cursor-not-allowed" : "bg-gradient-to-r from-green-600 to-green-700 hover:scale-[1.03]"
          } text-white font-semibold px-10 py-2 rounded-full shadow-lg transition-all duration-300 text-lg`}
        >
          {loading ? "Submitting..." : "Request Call Back"}
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
      </div>
    </form>
  </section>
);
}