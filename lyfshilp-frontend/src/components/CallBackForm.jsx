import { useState } from "react";
import api from "../api/axios.js";

export default function CallBackForm({ pageName }){
// at the top of your component
const [formData, setFormData] = useState({
  name: "",
  phone: "",
  studentClass: "",
  stream: "",
  school: "",
  pageName: pageName || "", //added
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

    if (!nameRegex.test(formData.name))
      return "Please enter a valid name (only letters, min 3 characters).";
    if (!phoneRegex.test(formData.phone))
      return "Please enter a valid 10-digit phone number.";
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
    const response = await api.post("/callback/register", {
      ...formData,
      pageName, // 👈 ensure course/page name is sent
    });

    if (response.status === 200 || response.status === 201) {
      setStatusMessage("Thank you! Our student counsellor will call you soon.");
      setStatusType("success");
      setFormData({
        name: "",
        phone: "",
        studentClass: "",
        stream: "",
        school: "",
        pageName: pageName || "", // 👈 reset also
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
    <section className="bg-gradient-to-b from-green-50 to-green-100 py-12 px-6 sm:px-10 md:px-16 lg:px-24 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-green-700 mb-6">
        Request a Call Back From Our Student Counsellor
      </h2>
      <p className="text-gray-700 mb-10 max-w-2xl mx-auto">
        Fill out the form below and our student counsellor will reach out to guide you personally
        about courses, exams, and learning opportunities.
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 animate-popupCard"
      >
        {/* Full Name */}
        <div className="flex flex-col text-left">
          <label htmlFor="name" className="font-semibold text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col text-left">
          <label htmlFor="phone" className="font-semibold text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
            required
          />
        </div>

        {/* Class */}
        <div className="flex flex-col text-left">
          <label htmlFor="studentClass" className="font-semibold text-gray-700 mb-1">
            Class
          </label>
          <select
            id="studentClass"
            value={formData.studentClass}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
            required
          >
            <option value="">Select your class</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
            <option value="11">Class 11</option>
            <option value="12">Class 12</option>
            <option value="college">College</option>
          </select>
        </div>

        {/* Stream */}
        <div className="flex flex-col text-left">
          <label htmlFor="stream" className="font-semibold text-gray-700 mb-1">
            Stream
          </label>
          <select
            id="stream"
            value={formData.stream}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
            required
          >
            <option value="">Select your stream</option>
            <option value="science">Science</option>
            <option value="commerce">Commerce</option>
            <option value="arts">Arts / Humanities</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* School */}
        <div className="flex flex-col text-left sm:col-span-2">
          <label htmlFor="school" className="font-semibold text-gray-700 mb-1">
            School
          </label>
          <input
            type="text"
            id="school"
            value={formData.school}
            onChange={handleChange}
            placeholder="Enter your school name"
            className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="sm:col-span-2 flex flex-col items-center">
          <button
            type="submit"
            disabled={loading}
            className={`${
              loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            } text-white font-semibold px-8 py-3 rounded-full shadow-md transition duration-300`}
          >
            {loading ? "Submitting..." : "Request Call Back"}
          </button>

          {/* ✅ Status Message (below button) */}
          {statusMessage && (
            <div
              className={`mt-4 text-base font-medium transition-opacity duration-300 ${
                statusType === "success"
                  ? "text-green-600"
                  : "text-red-600"
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
