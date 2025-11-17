import { useState, useEffect } from "react";
import DarkImg from "../assets/IpmatCimg/Dark.png";
import ShubhanginiImg from "../assets/IpmatCimg/Shubhangini.png";
import ArmaanImg from "../assets/IpmatCimg/Armaan.png";

export default function Testimonials() {
  const testimonials = [
    {
      text: "The tutors here are extremely knowledgeable and dedicated. They explain concepts clearly and are always available to help, even outside class hours. My understanding and grades have improved significantly since joining. Highly recommend this tuition center!",
      name: "Dark Night",
      img: DarkImg,
    },
    {
      text: "The coaching is a life saviour and a great key to create a future by getting guided through experienced teachers. The faculty is really supportive and concerned for our future. Their support to our studies has shown positive results and soon will lead to a bright future ahead!",
      name: "Shubhangini Singh",
      img: ShubhanginiImg,
    },
    {
      text: "I had an excellent experience at Lyfshilp. The faculty is highly knowledgeable, supportive, and always willing to go the extra mile to ensure students understand every concept thoroughly. The study materials provided are up-to-date and well-structured, and the regular tests helped me track my progress effectively. The environment is highly motivating and focused, which kept me on track throughout my preparation. Thanks to their guidance, I was able to improve my performance significantly. I would highly recommend this institute to anyone serious about achieving their academic goals!",
      name: "Armaan",
      img: ArmaanImg,
    },
  ];

  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const getClassName = (idx) => {
    if (isMobile) {
      return idx === index
        ? "z-20 scale-100 opacity-100"
        : "opacity-0 pointer-events-none absolute";
    }

    if (idx === index) return "z-20 scale-100 opacity-100";
    if (idx === (index + 1) % testimonials.length)
      return "z-10 scale-90 opacity-60 translate-x-[90%]";
    if (idx === (index - 1 + testimonials.length) % testimonials.length)
      return "z-10 scale-90 opacity-60 -translate-x-[90%]";
    return "opacity-0 pointer-events-none absolute";
  };

  return (
    <section className="py-12 sm:py-16 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Title */}
        <div className="mb-8 sm:mb-10 md:mb-12 text-center md:text-left max-w-4xl mx-auto md:mx-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            What Our <span className="text-green-600">Learners</span> Say
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg mt-2 sm:mt-3 max-w-xl mx-auto md:mx-0">
            Don't just take our word for it! Here's what our learners have to
            say about their journey with Lyfshilp Academy.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative flex justify-center items-center overflow-visible transition-all duration-500 ease-in-out min-h-[300px]"
          onMouseEnter={() => setIsPaused(true)} // ⏸ Pause on hover
          onMouseLeave={() => {
            setIsPaused(false);
            setIndex((prev) => (prev + 1) % testimonials.length); // ▶️ Move instantly when leaving
          }}
        >
          {testimonials.map((item, idx) => {
            const [showFull, setShowFull] = useState(false);
            const maxLength = 160;
            const displayText =
              item.text.length > maxLength && !showFull
                ? item.text.slice(0, maxLength) + "..."
                : item.text;

            return (
              <div
                key={idx}
                className={`absolute transition-all duration-700 ease-in-out transform 
                w-[90%] sm:w-[85%] md:w-[70%] lg:w-[50%] xl:w-[45%]
                ${getClassName(idx)}`}
              >
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 p-5 sm:p-6 md:p-7 lg:p-8 min-h-[280px] sm:min-h-[260px] md:min-h-[240px] flex flex-col">
                  {/* Testimonial Text */}
                  <div className="flex-grow mb-4 sm:mb-5">
                    <svg
                      className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-600 mb-2 opacity-50"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>

                    <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed text-left">
                      {displayText}{" "}
                      {item.text.length > maxLength && (
                        <button
                          onClick={() => setShowFull(!showFull)}
                          className="text-blue-600 font-medium hover:underline focus:outline-none"
                        >
                          {showFull ? "Less" : "More"}
                        </button>
                      )}
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-gray-100">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-green-100"
                    />
                    <div className="text-left flex-1 min-w-0">
                      <h4 className="text-gray-900 font-semibold text-sm sm:text-base md:text-lg capitalize truncate">
                        {item.name}
                      </h4>
                      <p className="text-gray-500 text-xs sm:text-sm truncate">
                        {item.role}
                      </p>
                    </div>

                    {/* Rating Stars */}
                    <div className="hidden sm:flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center mt-6 sm:mt-8 gap-4">
          <button
            onClick={() =>
              setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
            }
            className="p-2 sm:p-2.5 rounded-full bg-white shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300 group"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-green-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                  index === i
                    ? "bg-green-600 w-6 sm:w-8"
                    : "bg-gray-300 w-2 sm:w-2.5 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setIndex((prev) => (prev + 1) % testimonials.length)}
            className="p-2 sm:p-2.5 rounded-full bg-white shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300 group"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-green-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Trust Badge */}
        <div className="mt-8 sm:mt-10 md:mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-green-50 rounded-full border border-green-200">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs sm:text-sm font-semibold text-green-800">
              Trusted by 20,000+ students
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
