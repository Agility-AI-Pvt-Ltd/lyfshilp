// src/components/Thirdpart.jsx
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { User } from "lucide-react"; // 🟢 Added user icon

const testimonials = [
  {
    id: 1,
    name: "Vishakha Pandit",
    title: "IIM Ahmedabad, MBA",
    text: "Lyfshilp Academy helped me get into top IIMs. The teachers and mentors helped me in every possible way to succeed.",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    title: "IIM Bangalore, MBA",
    text: "The support and environment at Lyfshilp Academy pushed me to reach my potential.",
  },
  {
    id: 3,
    name: "Sneha Sharma",
    title: "IIM Calcutta, MBA",
    text: "Amazing experience! The guidance I got was beyond expectations.",
  },
  {
    id: 4,
    name: "Aman Gupta",
    title: "IIM Indore, MBA",
    text: "Excellent mentorship and personalized feedback helped me excel.",
  },
];

function Thirdpart() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="py-10 md:py-16 bg-white text-center relative overflow-hidden">
      {/* Heading (Static) */}
      <div className="relative z-20" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700">
          The Faces of Success
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-base md:text-lg px-4">
          Real students. Real stories. Real results. See how Lyfshilp Academy’s
          learners made it to their dream universities.
        </p>
      </div>

      {/* Scrolling Testimonials Section */}
      <div className="relative mt-14 h-[600px] sm:h-[650px] md:h-[700px] overflow-hidden z-10">
        <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-16">
          {/* Column 1 */}
          <div className="flex flex-col gap-6 animate-scrollUp">
            {testimonials.map((t) => (
              <TestimonialCard key={`col1-${t.id}`} {...t} />
            ))}
          </div>

          {/* Column 2 (reverse direction for variety) */}
          <div className="flex flex-col gap-6 animate-scrollDown hidden sm:flex">
            {testimonials.map((t) => (
              <TestimonialCard key={`col2-${t.id}`} {...t} />
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-6 animate-scrollUp hidden lg:flex">
            {testimonials.map((t) => (
              <TestimonialCard key={`col3-${t.id}`} {...t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ text, name, title }) {
  return (
    <div
      className="bg-amber-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 max-w-sm mx-auto"
      data-aos="zoom-in-up"
    >
      <p className="italic text-gray-800 mb-4 text-sm md:text-base leading-relaxed">
        “{text}”
      </p>
      <div className="flex items-center justify-center gap-3">
        {/* 🧑 User Icon */}
        <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full">
          <User className="w-6 h-6 text-green-700" />
        </div>

        <div className="text-left">
          <p className="font-semibold text-gray-900 text-sm md:text-base">
            {name}
          </p>
          <p className="text-xs md:text-sm text-gray-500">{title}</p>
        </div>
      </div>
    </div>
  );
}

export default Thirdpart;
