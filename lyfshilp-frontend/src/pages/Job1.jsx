import { useState } from "react";
import { Link } from "react-router-dom"; 
import api from "../api/axios.js";
import jobLogo from "../assets/career/Lyfshilp-logo.svg";

// Dummy data for jobs
const jobs = [
  {
    id: 1,
    title: "Business Developement Executive",
    location: "Delhi",
    mode: "Full-Time",
    salary: "4–5 LPA",
    category: "Management",
    postedOn: "Apr 23, 2025",
    summary: `A Business Development Executive (BDE) is responsible for identifying new business opportunities, building client relationships, and driving company growth. The role involves researching market trends, generating leads, pitching services/products to potential clients, and maintaining strong professional connections to achieve sales and revenue targets.`,
    requirements: [
      "Bachelor's degree required; MBA/PG in Management or Education preferred.",
      "2–4 years of experience in project management, preferably in EdTech.",
      "Strong organizational, multitasking, and leadership skills."
    ],
    responsibilities: [
      "Identify and pursue new business opportunities.",
      "Coordinate with faculty, mentors, and technical teams.",
      "Build and maintain client relationships.",
      "Achieve sales targets & report progress.",
      "Stay updated with market & competitors."
    ],
    benefits: [
      "Competitive salary package",
      "Opportunities to work on innovative projects",
      "Career growth & training opportunities."
    ]
  },
  {
    id: 2,
    title: "Business Development Manager",
    location: "Gurugram",
    mode: "Full-Time",
    salary: "6–9 LPA",
    category: "Business",
    postedOn: "May 25, 2025",
    summary: `We are looking for an ambitious Business Development Manager 
    to drive growth, build strong client relationships, and identify new opportunities.`,
    requirements: [
      "Bachelor’s degree in Business, Marketing, or related field; MBA preferred.",
      "3–6 years of proven experience in sales or business development.",
      "Excellent communication, negotiation, and leadership skills."
    ],
    responsibilities: [
      "Identify new business opportunities and partnerships.",
      "Develop and execute sales strategies to achieve revenue goals.",
      "Maintain strong client relationships and ensure customer satisfaction.",
      "Prepare business proposals and presentations."
    ],
    benefits: [
      "Attractive incentive structure",
      "Opportunities for career growth",
      "Networking with top industry leaders"
    ]
   }
];

export default function Job1({ jobId }) {
  const [copiedJobId, setCopiedJobId] = useState(null);
  const [activeForm, setActiveForm] = useState(null); // left | right | null

  const job = jobId ? jobs.find((j) => j.id === Number(jobId)) || jobs[0] : jobs[0];

  const handleCopyLink = async (id) => {
    const jobUrl = `${window.location.origin}/career/${id}`;
    try {
      await navigator.clipboard.writeText(jobUrl);
      setCopiedJobId(id);
      setTimeout(() => setCopiedJobId(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // Improved Application Form
  const ApplicationForm = ({ jobId, jobTitle }) => {
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [about, setAbout] = useState("");
    const [resumeUrl, setResumeUrl] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");



const handleSubmit = async (e) => {
  e.preventDefault();

  if (!fullName || !email || !resumeUrl) {
    setMessage("Please fill all required fields (Name, Email, Resume URL).");
    return;
  }

  const payload = { fullName, phone, email, about, resumeUrl, jobId, jobTitle };
  setSubmitting(true);
  setMessage("");

  try {
    const res = await api.post("/applications", payload); // ✅ axios post

    if (res.status === 201 || res.status === 200) {
      setMessage("Application submitted successfully!");
      setFullName(""); setPhone(""); setEmail(""); setAbout(""); setResumeUrl("");
    } else {
      setMessage("Failed to submit application.");
    }
  } catch (err) {
    console.error(err);
    setMessage("Something went wrong!");
  } finally {
    setSubmitting(false);
  }
};

    return (
      <form onSubmit={handleSubmit} className="mt-6 space-y-4 w-full text-left">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border rounded-lg p-2"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <input
          type="email"
          placeholder="Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg p-2"
        />

        <textarea
          placeholder="Tell us more about yourself..."
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="w-full border rounded-lg p-2"
          rows={4}
        />

        <input
          type="url"
          placeholder="Paste your Resume URL here"
          value={resumeUrl}
          onChange={(e) => setResumeUrl(e.target.value)}
          className="w-full border rounded-lg p-2"
        />

        {message && (
          <p className={`text-sm ${message.startsWith("✅") ? "text-green-600" : "text-green-600"}`}>
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-3 rounded-full font-medium transition ${
            submitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          {submitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    );
  };

  return (
    <section className="relative pb-16 pt-28 bg-white">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Section */}
        <div className="lg:col-span-2">
          {/* Hero Banner */}
          <div className="bg-green-700 text-white rounded-2xl p-10 relative overflow-hidden">
            <h1 className="text-3xl md:text-4xl font-bold">{job.title}</h1>
            <div className="flex flex-wrap gap-4 mt-6">
              {[job.location, job.mode, job.salary, job.category].map((tag, i) => (
                <span
                  key={i}
                  className="px-5 py-2 rounded-full bg-white/10 border border-white/30 text-white font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Job Summary */}
          <div className="mt-10 bg-white rounded-xl shadow p-6 border">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Job Summary</h2>
            <p className="text-gray-600 leading-relaxed">{job.summary}</p>
          </div>

          {/* Requirements */}
          <div className="mt-6 bg-white rounded-xl shadow p-6 border">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Requirements</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              {job.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>

          {/* Responsibilities */}
          <div className="mt-6 bg-white rounded-xl shadow p-6 border">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Duties & Responsibilities</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              {job.responsibilities.map((res, i) => (
                <li key={i}>{res}</li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="mt-6 bg-white rounded-xl shadow p-6 border">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Benefits</h2>
            <div className="flex flex-wrap gap-3">
              {job.benefits.map((b, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-full text-gray-700 text-sm font-medium"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Apply Section (Left) */}
          <div className="mt-6 bg-white rounded-xl shadow p-6 border">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Apply today and be part of Lyfshilp Academy’s mission 
            </h2>
            <div className="flex gap-3">
              <button
                onClick={() =>
                  setActiveForm(activeForm === "left" ? null : "left")
                }
                className="px-6 py-3 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition"
              >
                {activeForm === "left" ? "Close Form" : "Apply Now"}
              </button>
              <button
                onClick={() => handleCopyLink(job.id)}
                className={`px-6 py-3 border rounded-full font-medium transition ${
                  copiedJobId === job.id
                    ? "border-green-600 text-green-600"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {copiedJobId === job.id ? "✔ Link Copied" : "Copy Link"}
              </button>
            </div>

            {activeForm === "left" && <ApplicationForm jobId={job.id} jobTitle={job.title} />}
          </div>

          {/* Related Openings */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Openings</h2>
            <div className="space-y-3">
              {jobs
                .filter((related) => related.id !== job.id)
                .map((related) => {
                  const routeMap = {
                    1: "/career/job1",
                    2: "/career/job2",
                    3: "/career/job3",
                    4: "/career/job4"
                  };

                  return (
                    <Link
                      key={related.id}
                      to={routeMap[related.id] || "/career"}
                      className="flex justify-between items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{related.title}</h3>
                        <p className="text-sm text-gray-500">
                          {related.mode.toUpperCase()} ({related.location.toUpperCase()})
                        </p>
                      </div>
                      <span className="text-green-600 text-xl">↗</span>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Right Job Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border text-center flex flex-col items-center self-start">
          <img src={jobLogo} alt="Job Logo" className="w-40 h-40 object-contain mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">
            {job.title} at Lyfshilp Academy
          </h3>
          <p className="text-sm text-gray-500 mt-1">Job Posted on: {job.postedOn}</p>

          <button
            onClick={() =>
              setActiveForm(activeForm === "right" ? null : "right")
            }
            className="mt-6 w-full py-3 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition"
          >
            {activeForm === "right" ? "Close Form" : "Apply Now"}
          </button>
          {activeForm === "right" && <ApplicationForm jobId={job.id} jobTitle={job.title} />}
        </div>
      </div>
    </section>
  );
}
