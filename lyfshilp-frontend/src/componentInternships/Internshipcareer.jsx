// src/components/InternshipCareer.jsx
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import careerImg from "../assets/career/job-search.svg";

// Example jobs array (can be fetched from API later)
const jobs = [
  { title: "Business Developement Internship", link: "/career/frontend" },
  { title: "UI/UX Designer Internship", link: "/career/ui-ux" },
  { title: "Marketing Internship", link: "/career/marketing" },
];

export default function InternshipCareer() {
  return (
    <section id="jobs" className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* ================= LEFT SIDE ================= */}
        <div>
          <h3 className="text-4xl md:text-5xl font-bold leading-snug">
            Current <span className="text-green-600">Openings</span>
          </h3>
          <p className="mt-4 text-gray-600 text-lg">
            We’re always on the lookout for talented individuals who want to learn,
            grow, and contribute to meaningful projects.
          </p>
          <div className="mt-10">
            <img
              src={careerImg}
              alt="career illustration"
              className="w-48 md:w-56"
            />
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex flex-col gap-4">
          {jobs.map((job, index) => (
            <Link
              key={index}
              to={job.link}
              className="group flex justify-between items-center bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition border border-gray-100 hover:border-green-200"
            >
              <h4 className="font-semibold text-gray-800 group-hover:text-green-600 transition">
                {job.title}
              </h4>
              <span className="w-9 h-9 flex items-center justify-center bg-green-600 text-white rounded-full group-hover:bg-green-700 transition">
                <FaArrowRight size={16} />
              </span>
            </Link>
          ))}

          {/* If no jobs */}
          {jobs.length === 0 && (
            <p className="text-gray-500 italic">
              🚀 No openings right now — check back soon!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
