import olympiadImg from "/images/charboyfather.svg";
import green01 from "/images/blue03.svg";

export default function OlympiadSection3() {
  return (
    <section className="py-14 px-4 md:px-16 bg-[#FFF8EE]">
      {/* 🧩 Step 1 Section */}
      <div className="grid md:grid-cols-2 items-center gap-10">
        
        {/* Left Side - Background + Image */}
        <div className="flex justify-center relative">
          <img
            src={green01}
            alt="Step background"
            className="w-56 md:w-72"
          />

          <img
            src={olympiadImg}
            alt="Olympiad character"
            className="
              absolute 
              w-52 sm:w-44 md:w-72 lg:w-[18rem]         /* ✅ made bigger */
              bottom-0 
              -top-8 sm:-top-10 md:-top-20 lg:-top-22
              left-[175px] -translate-x-1/2
              md:left-auto md:translate-x-0
              md:right-28 lg:right-32         /* ✅ shifted slightly right */
            "
          />
        </div>

        {/* Right Side - Text */}
        <div className="text-center md:text-left  md:-mt-10">
          <h3 className="text-green-600 text-2xl md:text-4xl italic font-extrabold leading-snug">
            {/* ✅ removed italic from entire heading */}
            Mentorship & Study<br/> Material{" "}
            <span className="text-gray-900 font-extrabold not-italic">
              {/* ✅ ensured span is NOT italic */}
              Support
            </span>
          </h3>

          <p className="mt-3 text-gray-600 text-sm md:text-base max-w-md">
            Participants are guided by mentors throughout the
            preparation journey and are provided with time
            to time study resources and reading material.
          </p>
        </div>
      </div>
    </section>
  );
}
