import olympiadImg from "/images/charboy.svg";
import green01 from "/images/green01.svg";

export default function OlympiadSection1() {
  return (
    <section className="pb-8 pt- sm:py-16 lg:pb-20 px-4 sm:px-8 md:px-12 lg:px-20 bg-[#FFF8EE] overflow-hidden">
      
      {/* 🟩 Top Heading */}
      <div className="text-center mb-10 sm:mb-14 lg:mb-20">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          How it <span className="text-green-600">works?</span>
        </h2>
        <p className="mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
          This isn’t just a competition; it’s a complete learning journey. 
          We’ve designed our Olympiad to support you, challenge you, and help you grow.
        </p>
      </div>

      {/* 🧩 Step 1 Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 lg:gap-16">
        
        {/* Left Side - Green background + character */}
        <div className="flex justify-center relative w-full">
          <img
            src={green01}
            alt="Step background"
            className="w-44 sm:w-56 md:w-64 lg:w-72 xl:w-80"
          />
          <img
            src={olympiadImg}
            alt="Olympiad character"
            className="absolute w-36 sm:w-48 md:w-56 lg:w-64 xl:w-72 bottom-0 -top-6 sm:-top-10 md:-top-16 lg:-top-20"
          />
        </div>

        {/* Right Side - Text */}
        <div className="text-center md:text-left mt-4 sm:mt-0 md:-mt-6">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-snug">
            Create Account on <br />
            <span className="text-green-600 font-extrabold italic">
              Edumaniax
            </span>
          </h3>
          <p className="mt-3 text-gray-600 text-sm sm:text-base lg:text-lg max-w-md mx-auto md:mx-0 px-2">
            Students should register via the Edumaniax portal to participate in the Olympiad.
          </p>
        </div>
      </div>
    </section>
  );
}
