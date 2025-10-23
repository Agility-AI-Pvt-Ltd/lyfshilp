import { useState, useEffect } from "react";
import SaraImg from "../assets/testimonial/sara.png";
import AnnaImg from "../assets/testimonial/anna.png";
import LiamImg from "../assets/testimonial/liam.png";

export default function Testimonials() {
  const testimonials = [
    {
      text: "A very insightful, productive and all encompassing discussion! At the end of the session, I felt all my queries well answered, my fears and concerns addressed. I'd highly recommend parents to avail counselling sessions and discover actionable insights!",
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
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const getClassName = (idx) => {
    // Mobile: Only show current card
    if (isMobile) {
      if (idx === index) {
        return "z-20 scale-100 opacity-100";
      }
      return "opacity-0 pointer-events-none absolute";
    }

    // Desktop: Show 3 cards with side previews
    if (idx === index) {
      return "z-20 scale-100 opacity-100"; // center card
    }
    if (idx === (index + 1) % testimonials.length) {
      return "z-10 scale-90 opacity-60 translate-x-[90%]"; // right card
    }
    if (idx === (index - 1 + testimonials.length) % testimonials.length) {
      return "z-10 scale-90 opacity-60 -translate-x-[90%]"; // left card
    }
    return "opacity-0 pointer-events-none absolute";
  };

  return (
    <section className="py-12 sm:py-16 md:py-16 bg-gray-50">
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
        <div className="relative flex justify-center items-center overflow-hidden h-[380px] sm:h-[350px] md:h-[320px] lg:h-[300px]">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className={`absolute transition-all duration-700 ease-in-out transform 
                w-[90%] sm:w-[85%] md:w-[70%] lg:w-[50%] xl:w-[45%]
                ${getClassName(idx)}`}
            >
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 p-5 sm:p-6 md:p-7 lg:p-8 min-h-[280px] sm:min-h-[260px] md:min-h-[240px] flex flex-col">
                
                {/* Testimonial Text */}
                <div className="flex-grow mb-4 sm:mb-5">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-600 mb-2 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed text-left line-clamp-6 sm:line-clamp-5">
                    {item.text}
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
                    <p className="text-gray-500 text-xs sm:text-sm truncate">{item.role}</p>
                  </div>
                  
                  {/* Rating Stars */}
                  <div className="hidden sm:flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center mt-6 sm:mt-8 gap-4">
          
          {/* Previous Button */}
          <button
            onClick={() => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            className="p-2 sm:p-2.5 rounded-full bg-white shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300 group"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                  index === i ? "bg-green-600 w-6 sm:w-8" : "bg-gray-300 w-2 sm:w-2.5 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => setIndex((prev) => (prev + 1) % testimonials.length)}
            className="p-2 sm:p-2.5 rounded-full bg-white shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300 group"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Trust Badge */}
        <div className="mt-8 sm:mt-10 md:mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-green-50 rounded-full border border-green-200">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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