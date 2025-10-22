import { useState } from "react";
import Sharadimg from "../assets/Aboutimg/Sharad.svg";
import Shreyaimg from "../assets/Aboutimg/Shreya.svg";
import Saurabhimg from "../assets/Aboutimg/Saurabh.svg";
import { FaLinkedin } from "react-icons/fa";

export default function FoundersSection() {
  // Track active founder (default = 0 means first founder highlighted)
  const [activeFounder, setActiveFounder] = useState(0);

  // Founder data array
  const founders = [
    {
      img: Sharadimg,
      name: "Sharad Raaj Ustav",
      role: "Founder & CEO",
      linkedin: "https://www.linkedin.com/in/sharadrajutsav?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_appv",
    },
    {
      img: Shreyaimg,
      name: "Shreya Seinha",
      role: "Co-Founder",
      linkedin: "https://www.linkedin.com/in/shreya-sinha2802?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      img: Saurabhimg,
      name: "Saurabh Jain",
      role: "Co-Founder",
      linkedin: "https://www.linkedin.com/in/ca-saurabh-jain-8a014034/",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-10 text-center">
        {/* Heading */}
        <h2 className="text-2xl sm:text-5xl font-extrabold text-gray-900">
          Meet Minds behind <span className="text-[#1DB954]"> Lyfshilp Academy</span>
        </h2>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Behind every student’s success is a visionary founder who blends
          expertise in education, technology and mentorship to create
          transformative learning experiences.
        </p>

        {/* Team Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {founders.map((founder, index) => (
            <div
              key={index}
              className={`bg-gray-50 rounded-2xl overflow-hidden relative cursor-pointer transform transition-all duration-500 
              ${activeFounder === index ? "scale-105 shadow-4xl" : "scale-100 shadow-sm"}`}
              onMouseEnter={() => setActiveFounder(index)} // Hover par highlight
              onMouseLeave={() => setActiveFounder(0)} // Hover hatne par pehla hi active rahe
            >
              <img
                src={founder.img}
                alt={founder.name}
                className={`w-full h-96 object-cover transition-all duration-500 
                ${activeFounder === index ? "grayscale-0" : "grayscale"}`}
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white py-3 px-5 flex items-center justify-between">
                <div>
                  <p className="text-xs">{founder.role}</p>
                  <h3 className="font-semibold">{founder.name}</h3>
                </div>
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#0A66C2] text-xl"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
