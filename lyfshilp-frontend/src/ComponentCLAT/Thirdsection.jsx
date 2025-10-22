import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { User } from "lucide-react"; // 🟢 User icon from lucide-react

const testimonials = [
  {
    id: 1,
    name: "Trishaan Pandit",
    title: "NALSAR Hyderabad, NMIMS Mumbai",
    text: "Lyfshilp Academy helped me in proper preparation and guidance which eventually lead to my success in exam.",
  },
  {
    id: 2,
    name: "Ananya Verma",
    title: "NLSIU Bangalore, Symbiosis Pune",
    text: "The teachers and mentors guided me throughout the journey, helping me improve speed and accuracy for CLAT.",
  },
  {
    id: 3,
    name: "Rohit Mehra",
    title: "NLU Delhi, Christ University",
    text: "Daily mocks and feedback from mentors kept me on track and confident till the final exam day.",
  },
  {
    id: 4,
    name: "Sanya Kapoor",
    title: "GNLU Gandhinagar, NMIMS Mumbai",
    text: "The mentorship and study plan provided by Lyfshilp were instrumental in helping me reach my dream law school.",
  },
];

function Thirdsection() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="py-10 md:py-16 bg-white text-center relative overflow-hidden">
      {/* Heading */}
      <div className="relative z-20" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700">
          The Faces of Success
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-base md:text-lg px-4">
          Real students. Real stories. Real results. See how Lyfshilp Academy’s
          learners made it to their dream universities.
        </p>
      </div>

      {/* Scrolling Testimonials */}
      <div className="relative mt-14 h-[600px] sm:h-[650px] md:h-[700px] overflow-hidden z-10">
        <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-16">
          {/* Column 1 */}
          <div className="flex flex-col gap-6 animate-scrollUp">
            {testimonials.map((t) => (
              <TestimonialCard key={`col1-${t.id}`} {...t} />
            ))}
          </div>

          {/* Column 2 (reverse direction) */}
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
      className="bg-[#FFF8EE] p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 max-w-sm mx-auto"
      data-aos="zoom-in-up"
    >
      <p className="italic text-gray-800 mb-4 text-sm md:text-base leading-relaxed">
        “{text}”
      </p>
      <div className="flex items-center justify-center gap-3">
        {/* 🧑‍🎓 Replaced image with User icon */}
        <div className="bg-green-100 rounded-full p-2 flex items-center justify-center">
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

export default Thirdsection;
