// src/components/JoinLearnSection.jsx 
import handshakeIcon from "../assets/Olympiadimg/join.svg";
import LyfshilpLogo from "../assets/LyfshilpLogo.png";
import agilityLogo from "../assets/Olympiadimg/agility-logo.svg";

export default function JoinLearnSection() {
  return (
    <section className="bg-[#FFF2D6] flex items-center justify-center py-10 px-3 sm:px-4">
      
      <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center gap-4 max-w-4xl w-full mx-auto">
        
        {/* Left - Square Image Box */}
        <div className="w-full max-w-[320px] mx-auto rounded-md overflow-hidden">
          <img
            src={handshakeIcon}
            alt="Collaboration handshake"
            className="w-full h-full object-contain shadow-none"
          />
        </div>

        {/* Right - Info Box */}
 <div className="bg-white p-6 flex flex-col justify-center border border-black rounded-md w-full">
          <h2 className="text-lg sm:text-3xl font-extrabold text-gray-900 mb-4 text-center md:text-left">
            A Purpose-Built Partnership of :
          </h2>

          {/* Logos Row */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
            
            <div className="flex items-center gap-0">
              <img
                src={LyfshilpLogo}
                alt="Lyfshilp logo"
                className="h-22 w-20 object-contain"
              />
              <span className="text-gray-600 font-extrabold text-base">
                Lyfshilp Academy
              </span>
            </div>

            {/* Divider */}
            <span className="font-extrabold text-gray-400">&</span>

            <div className="flex items-center gap-2">
              <img
                src={agilityLogo}
                alt="Agility AI logo"
                className="h-12 w-auto object-contain"
              />
              <span className="text-gray-600 font-extrabold text-base">
                Agility AI
              </span>
            </div>
          </div>

          <p className="text-black text-sm sm:text-base leading-relaxed max-w-md text-center md:text-left mx-auto md:mx-0">
            A Rare Convergence of Education and Industry Leadership with Long-Term Impact
          </p>
        </div>
      </div>
    </section>
  );
}
