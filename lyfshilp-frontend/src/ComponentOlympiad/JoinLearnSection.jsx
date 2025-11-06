// src/components/JoinLearnSection.jsx 
import handshakeIcon from "../assets/Olympiadimg/join.svg";
import edumaniaxLogo from "../assets/Olympiadimg/edumaniax-logo.svg";
import agilityLogo from "../assets/Olympiadimg/agility-logo.svg";

export default function JoinLearnSection() {
  return (
    <section className="bg-[#FFF2D6] flex items-center justify-center py-10 px-3 sm:px-4">
      {/* Combined flex container for both boxes */}
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 max-w-4xl w-full mx-auto">
        
        {/* Left - Square Image Box */}
        <div className="w-full md:w-[280px] aspect-square flex-shrink-0 border border-black rounded-md overflow-hidden">
          <img
            src={handshakeIcon}
            alt="Collaboration handshake"
            className="w-full h-full object-cover border-none shadow-none" // 🟢 removed any inner border/shadow
          />
        </div>

        {/* Right - Info Box */}
        <div className="bg-white p-6 flex-1 flex flex-col justify-center border border-black rounded-md">
          <h2 className="text-lg sm:text-2xl font-extrabold text-gray-900 mb-5 text-center md:text-left">
            In Collaboration With:
          </h2>

          {/* Logos Row */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mb-5">
            {/* Edumaniax */}
            <div className="flex items-center gap-2">
              <img
                src={edumaniaxLogo}
                alt="Edumaniax logo"
                className="h-8 w-auto object-contain"
              />
              <span className="text-green-600 font-extrabold text-base">
                Edumaniax
              </span>
            </div>

            {/* Divider */}
            <div className="h-5 w-px bg-gray-300"></div>

            {/* Agility AI */}
            <div className="flex items-center gap-2">
              <img
                src={agilityLogo}
                alt="Agility AI logo"
                className="h-8 w-auto object-contain"
              />
              <span className="text-gray-900 font-extrabold text-base">
                Agility AI
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-md text-center md:text-left mx-auto md:mx-0">
            Together, we’re redefining the Future of Education where students
            don’t just prepare for exams, they prepare for life.
          </p>
        </div>
      </div>
    </section>
  );
}
