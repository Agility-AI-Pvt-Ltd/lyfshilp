// src/pages/Careers.jsx
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import careerImg from "../assets/career/job-search.svg";
import Img1 from "../assets/career/C-img1.svg";
import Img2 from "../assets/career/C-img2.svg";
import Img3 from "../assets/career/C-img3.svg";
import WaveBg from "../assets/career/wave-bg.svg"; // <-- wave background

export default function Careers() {
  const jobs = [
    { title: "Business Developement Executive", link: "/career/job1" },
    { title: "Business Developement Manager", link: "/career/job2" },
    { title: "Quant & Logical Reasoning Faculty", link: "/career/job3" },
    { title: "English Faculty", link: "/career/job4" },
  ];

  const features = [
    { title: "Flexibility & Growth", desc: "Hybrid roles and learning opportunities to grow in your career" },
    { title: "Work with Purpose", desc: "Join a team driving real impact in education" },
    { title: "Impactful Work", desc: "Your ideas directly shape the future of students and education" },
    { title: "Work-Life Balance", desc: "Flexible working hours with space for personal growth" },
    { title: "Mentorship & Learning", desc: "Access workshops, training, and development programs" },
    { title: "Inclusive Community", desc: "Work in a diverse team that encourages innovation and collaboration" },
  ];

  return (
    <div className="bg-white">
      {/* ================= HERO SECTION ================= */}
      <section className="pt-28 pb-16 container mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold">
          Join <span className="text-green-600">Lyfshilp Academy</span>
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Be part of a mission that’s redefining education. Together, let’s
          mentor, inspire, and build future-ready learners.
        </p>

        {/* Button */}
        <button
          onClick={() =>
            document.getElementById("jobs").scrollIntoView({ behavior: "smooth" })
          }
          className="mt-6 flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition mx-auto"
        >
          See Openings <FaArrowRight />
        </button>

        {/* 3 Images Row */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="relative rounded-xl overflow-hidden shadow-md">
            <img src={Img1} alt="Work with Purpose" className="w-full h-56 object-cover" />
            <div className="absolute bottom-0 w-full bg-black/60 text-white py-2 text-center">
              <p className="font-medium">Work with Purpose</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative rounded-xl overflow-hidden shadow-md">
            <img src={Img2} alt="Flexible & Supportive Culture" className="w-full h-56 object-cover" />
            <div className="absolute bottom-0 w-full bg-black/60 text-white py-2 text-center">
              <p className="font-medium">Flexible & Supportive Culture</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative rounded-xl overflow-hidden shadow-md">
            <img src={Img3} alt="Inclusive Community" className="w-full h-56 object-cover" />
            <div className="absolute bottom-0 w-full bg-black/60 text-white py-2 text-center">
              <p className="font-medium">Inclusive Community</p>
            </div>
          </div>
        </div>
      </section>

{/* ================= WHY WORK WITH US SECTION ================= */}
<section className="relative py-20 bg-[#fff7ef] overflow-hidden">
  {/* Wave Background with low opacity */}
  <img
    src={WaveBg}
    alt="wave background"
    className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none select-none opacity-20"
  />

  <div className="relative container mx-auto px-6 text-center">
    {/* Heading */}
    <h2 className="text-3xl md:text-4xl font-bold">
      Why work <span className="text-green-600">with us</span>
    </h2>
    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
      You'll join a passionate group of educators, entrepreneurs, and
      innovators who are reimagining how students learn and grow.
    </p>

    {/* Features Grid */}
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition"
        >
          <h4 className="font-semibold text-lg">{feature.title}</h4>
          <p className="text-gray-600 mt-2 text-sm">{feature.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* ================= JOBS SECTION ================= */}
      <section id="jobs" className="pt-20 pb-16 bg-gray-50">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Heading */}
          <div>
            <h3 className="text-2xl md:text-5xl font-bold">
              Current <span className="text-green-600">Openings</span>
            </h3>
            <p className="mt-4 text-gray-600">
              We’re always in the search for talented people to grow.
            </p>
            <div className="mt-10">
              <img
                src={careerImg}
                alt="career illustration"
                className="w-40 md:w-48"
              />
            </div>
          </div>

          {/* Right Job Cards */}
          <div className="flex flex-col gap-4">
            {jobs.map((job, index) => (
              <Link
                key={index}
                to={job.link}
                className="flex justify-between items-center bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer"
              >
                <div>
                  <h4 className="font-semibold">{job.title}</h4>
                </div>
                <span className="w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-full">
                  <FaArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
