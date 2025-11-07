import olympiadImg2 from "/images/chargirl2.svg";
import green02 from "/images/pink04.svg";

export default function OlympiadSection4() {
  return (
    <section className="py-4 sm:py-10 md:py-14 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#FFF8EE]">
      {/* 🧩 Step 2 Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 sm:gap-8 md:gap-0 max-w-7xl mx-auto">
        
        {/* 📝 Text Left Side */}
        <div className="text-center md:text-left order-2 md:order-1 mt-4 sm:mt-0 md:-mt-10 md:pl-20 lg:pl-40">
          <h3 className="text-green-600 text-xl sm:text-2xl md:text-3xl lg:text-4xl italic font-extrabold leading-snug px-4 sm:px-0">
            National & Global{" "}
            <span className="text-gray-900 font-extrabold not-italic">
              Assessment
            </span>
          </h3>

          <p className="mt-2 sm:mt-3 text-gray-600 text-xs sm:text-sm md:text-base max-w-md mx-auto md:mx-0 px-4 sm:px-0">
            A nationwide test identifies India's most future-
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            ready minds.
          </p>
        </div>

        {/* 🖼️ Image Right Side */}
        <div className="flex justify-center relative order-1 md:order-2 md:-ml-28 lg:-ml-52">
          {/* Background shape */}
          <img
            src={green02}
            alt="Step background"
            className="w-40 sm:w-48 md:w-56 lg:w-72"
          />
          
          {/* Girl image - Responsive positioning */}
          <img
            src={olympiadImg2}
            alt="Olympiad step illustration"
            className="
              absolute
              w-36 sm:w-44 md:w-52 lg:w-[18rem]
              bottom-0 
              -top-6 sm:-top-8 md:-top-10 lg:-top-12
              left-[175px] -translate-x-1/2
              md:left-auto md:translate-x-0
              md:right-40 lg:right-48
            "
          />
        </div>
      </div>
    </section>
  );
}