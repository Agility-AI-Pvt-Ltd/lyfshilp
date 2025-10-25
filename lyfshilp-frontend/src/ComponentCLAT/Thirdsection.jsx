import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { User } from "lucide-react"; // 🟢 User icon from lucide-react

const testimonials = [
  {
    id: 1,
    name: "Paarijat Knojiya",
    text: "Best CLAT coaching I’ve experienced! Highly recommend.",
  },
  {
    id: 2,
    name: "Chhavi Chaudhary",
    text: "I joined Lyfshilp Academy for their 2-year CLAT course, and honestly, it turned out to be a great decision. The teachers are really supportive and know how to make even tough concepts easy to understand. Their doubt sessions, mocks, and guidance throughout the preparation kept me consistent and confident. The study material is well-structured, and the regular tests helped me track my progress clearly.",
  },
  {
    id: 3,
    name: "Yug Swaroop",
    text: "Very nice faculty and good individual attention. Extremely knowledgable and supportive owner of the academy which is pretty rare nowadays.",
  },
  {
    id: 4,
    name: "Aryanshi Gupta",
    text: "This is the best academy I've been to so far, and I'm sure that opinion will not change. I really am in love with the nurturing environment we have here that promotes growth. The sessions we have on personality development or stress management are really very fruitful. I find that this coaching is very unique in terms of teaching as well. The time we spend here learning together is memorable and fun yet at the same time we learn new things together. What I love about this center is that it makes us want to do better rather than pressurizing or forcing us to do anything. We also get some amazing study tips here and there which I find amazingly helpful. Overall, I think the center is a gem. The faculty, content and the environment is top-tier.",
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
