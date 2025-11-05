// ✅ Import all school logos from src/assets/workshopimg
import IPth from "../assets/workshopimg/IPth.svg";
import usfg from "../assets/workshopimg/usfg.svg";
import ghps from "../assets/workshopimg/ghps.svg";
import kmgs from "../assets/workshopimg/kmgs.svg";
import brgs from "../assets/workshopimg/brgs.svg";
import coc from "../assets/workshopimg/coc.svg";
import gts from "../assets/workshopimg/gts.svg";
import jkgis from "../assets/workshopimg/jkgis.svg";
import pvis from "../assets/workshopimg/pvis.svg";
import rspr from "../assets/workshopimg/rspr.svg";
import saws from "../assets/workshopimg/saws.svg";
import sths from "../assets/workshopimg/sths.svg";
import tsrus from "../assets/workshopimg/tsrus.svg";

export default function SchoolLogo() {
  const schools = [
    { name: "Indraprastha International School", logo: IPth },
    { name: "Uttam School For Girls", logo: usfg },
    { name: "Guru Harikishan Public School", logo: ghps },
    { name: "K.R. Mangalam World School", logo: kmgs },
    { name: "Bharat Ram Global School", logo: brgs },
    { name: "St. Marry's Sr. Secondary School", logo: coc },
    { name: "Gurukul The School", logo: gts },
    { name: "JKG International School", logo: jkgis },
    { name: "Platinum Valley International School", logo: pvis },
    { name: "Ramjas School", logo: rspr },
    { name: "St. Andrews World School", logo: saws },
    { name: "St. Thommas School", logo: sths },
    { name: "The Shri Ram Universal School", logo: tsrus },
  ];

  return (
    <section className="py-16 px-6 md:px-20 bg-pink-50 text-center">
      {/* 🏫 Section Title */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-10">
        Schools We’ve Conducted <span className="text-green-700">Sessions In</span>
      </h2>

      {/* 🎓 Logo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 place-items-center">
        {schools.map((school, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center group"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300">
              <img
                src={school.logo}
                alt={school.name}
                className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <p className="text-sm sm:text-base font-medium text-gray-700 mt-3">
              {school.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
