import { useState, useEffect } from "react";
import SaraImg from "../assets/testimonial/sara.png";
import AnnaImg from "../assets/testimonial/anna.png";
import LiamImg from "../assets/testimonial/liam.png";

export default function Testimonials() {
  const testimonials = [
    {
      text: "A very insightful, productive and all encompassing discussion! At the end of the session, I felt all my queries well answered, my fears and concerns addressed. I’d highly recommend parents to avail counselling sessions and discover actionable insights!",
      name: "mani sirohi",
      role: "Upper-Intermediate · 6 Months",
      img: SaraImg,
    },
    {
      text: "Very professional and friendly environment , all the subjects related books provided by the faculty , teachers are very understanding and and will help you in all the doubts after classes, classes start on time and every topic is covered properly according to the schedule provided a day before on the WhatsApp group created!",
      name: "Amilia",
      role: "Intermediate · 4 Months",
      img: AnnaImg,
    },
    {
      text: "I am extremely satisfied with the services provided by this institute. The quality of teaching is top-notch, and the faculty members are highly knowledgeable and dedicated. I truly appreciate the personalized attention given to each student.If you are looking for an institute that genuinely cares about students' success, I highly recommend joining this one!",
      name: "anjali Dhasmana",
      role: "Upper-Intermediate · 6 Months",
      img: LiamImg,
    },
  ];

  const [index, setIndex] = useState(0);

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const getClassName = (idx) => {
    if (idx === index) {
      return "z-20 scale-100 opacity-100"; // center card
    }
    if (idx === (index + 1) % testimonials.length) {
      return "z-10 scale-90 opacity-60 translate-x-[90%]"; // right card (less visible + gap)
    }
    if (idx === (index - 1 + testimonials.length) % testimonials.length) {
      return "z-10 scale-90 opacity-60 -translate-x-[90%]"; // left card (less visible + gap)
    }
    return "opacity-0 pointer-events-none absolute"; // hide others
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="mb-12 text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Our <span className="text-green-600">Learners</span> Say
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl">
            Don’t just take our word for it! Here’s what our learners have to
            say about their journey with Learnly.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative flex justify-center items-center overflow-hidden h-[300px]">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className={`absolute transition-all duration-700 ease-in-out transform w-[80%] md:w-[40%] ${getClassName(
                idx
              )}`}
            >
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 min-h-[200px] flex flex-col">
                <p className="text-gray-700 text-sm leading-relaxed mb-4 text-left flex-grow">
                  “{item.text}”
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <h4 className="text-gray-900 font-semibold text-lg">
                      {item.name}
                    </h4>
                    <p className="text-gray-500 text-sm">{item.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition ${
                index === i ? "bg-green-600 w-4" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
