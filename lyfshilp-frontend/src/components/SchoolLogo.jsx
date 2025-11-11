// ✅ Import all school logos
import IPth from "../assets/workshopimg/IPth.svg";
import usfg from "../assets/workshopimg/usfg.svg";
import ghps from "../assets/workshopimg/ghps.svg";
import kmgs from "../assets/workshopimg/kmgs.svg";
import brgs from "../assets/workshopimg/brgss.svg";
import coc from "../assets/workshopimg/coc.svg";
import gts from "../assets/workshopimg/gts.svg";
import jkgis from "../assets/workshopimg/jkgis.svg";
import pvis from "../assets/workshopimg/pvis.svg";
import rspr from "../assets/workshopimg/rspr.svg";
import saws from "../assets/workshopimg/saws.svg";
import sths from "../assets/workshopimg/sths.svg";
import tsrus from "../assets/workshopimg/tsrus.svg";
import dps from "../assets/workshopimg/dps.svg";
import srs from "../assets/workshopimg/srslogo.svg";

export default function SchoolLogo() {
  const schools = [
    { logo: srs},
    { logo: dps },
    { logo: usfg },
    { logo: kmgs },
    { logo: brgs },
    { logo: coc },
    { logo: IPth },
    { logo: jkgis },
    { logo: rspr },
    { logo: pvis },
    { logo: sths },
    { logo: saws },
    { logo: ghps },
    { logo: gts },
    { logo: tsrus },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-12 px-4 sm:px-8 md:px-16 bg-white text-center overflow-hidden">
      {/* 🏫 Section Title */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 mb-8 sm:mb-10 lg:mb-14">
        Schools We’ve Conducted{" "}
        <span className="text-green-700">Sessions In</span>
      </h2>

      {/* 🏫 Infinite Scrolling Logos */}
      <div className="relative overflow-hidden">
        <div className="flex animate-scrollLoop hover:[animation-play-state:paused] space-x-10 w-max">
          {/* 🔁 Duplicate the list twice for seamless loop */}
          {[...Array(2)].map((_, loopIndex) => (
            <div key={loopIndex} className="flex space-x-10">
              {schools.map((school, i) => (
                <div
                  key={`${loopIndex}-${i}`}
                  className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-[#FFF8EE] rounded-full shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src={school.logo}
                    alt="School logo"
                    className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
