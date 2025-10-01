// src/components/InternIntro.jsx
import { FaArrowRight } from "react-icons/fa";
import InternHero from "../assets/internships/intern-hero.svg";

export default function InternIntro() {
  return (
    <section className="pt-28 pb-10 w-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        {/* Left: Text */}
        <div className="flex-1 text-left">
          <h2 className="text-3xl md:text-5xl font-bold leading-snug">
            Do <span className="text-green-600">Intern</span>ships at{" "}
            <span className="text-green-600">Lyfshilp Academy!</span>
          </h2>
          <p className="mt-6 text-gray-600 max-w-lg">
            Whether you're passionate about education, technology, design, or
            business, Lyfshilp Academy offers opportunities that let you learn,
            grow, and contribute to meaningful projects.
          </p>
        <a
  href="#jobs"
  className="mt-8 inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
>
  See Openings <FaArrowRight />
</a>

        </div>

        {/* Right: Hero Image */}
        <div className="relative flex-1 flex justify-center md:justify-end">
          <img
            src={InternHero}
            alt="Internships at Lyfshilp"
            className="w-[320px] md:w-[380px] relative z-10"
          />
          <div className="absolute -z-10 top-10 right-0 w-[280px] h-[345px] bg-yellow-100 rounded-xl"></div>
          <div className="absolute top-0 right-40 bg-white shadow-md rounded-lg px-4 py-2 flex items-center gap-2">
            <span className="font-bold text-green-600 text-lg">100+</span>
            <span className="text-sm text-gray-600">Categories of Internships</span>
          </div>
          <div className="absolute bottom-0 left-20 bg-white shadow-md rounded-lg px-4 py-2 flex items-center gap-3">
            <div>
              <p className="font-bold text-green-600 text-lg">2K+</p>
              <p className="text-sm text-gray-600">Internships Given</p>
            </div>
            <div className="flex -space-x-2">
              <img src="https://i.pravatar.cc/40?img=1" alt="user1" className="w-8 h-8 rounded-full border-2 border-white" />
              <img src="https://i.pravatar.cc/40?img=2" alt="user2" className="w-8 h-8 rounded-full border-2 border-white" />
              <img src="https://i.pravatar.cc/40?img=3" alt="user3" className="w-8 h-8 rounded-full border-2 border-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
