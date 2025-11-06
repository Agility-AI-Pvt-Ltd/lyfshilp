// ✅ Import all school logos from src/assets/workshopimg
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
import dps from "../assets/workshopimg/dps.svg"; // ✅ fixed path

export default function SchoolLogo() {
  const schools = [
    { name: "Delhi Public School, Mathura Road, Delhi", logo: dps },
    { name: "Uttam School For Girls, Shastri Nagar, Ghaziabad", logo: usfg },
    { name: "K.R. Mangalam World School, Greater Kailash-2, Delhi", logo: kmgs },
    { name: "Bharat Ram Global School, Shakti Khand-2, Indirapuram, Ghaziabad", logo: brgs },
    { name: "St. Mary's Sr. Secondary School, Mayur Vihar, Delhi", logo: coc },
    { name: "Indraprastha International School, Dwarka, Delhi", logo: IPth },
    { name: "JKG International School, Vijay Nagar, Ghaziabad", logo: jkgis },
    { name: "Ramjas School, Pusa Road, Delhi", logo: rspr },
    { name: "Platinum Valley International School, Surya Nagar, Ghaziabad", logo: pvis },
    { name: "St. Thomas School, Indirapuram, Ghaziabad", logo: sths },
    { name: "St. Thomas School, Loni Road, Ghaziabad", logo: sths },
    { name: "St. Andrews World School, Indirapuram, Ghaziabad", logo: saws },
    { name: "Guru Harikishan Public School, India Gate Road, Delhi", logo: ghps },
    { name: "Gurukul The School, Ghaziabad", logo: gts },
    { name: "The Shri Ram Universal School, Loni Road, Ghaziabad", logo: tsrus },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-12 px-4 sm:px-8 md:px-16 bg-pink-50 text-center">
      {/* 🏫 Section Title */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 mb-8 sm:mb-10 lg:mb-14">
        Schools We’ve Conducted{" "}
        <span className="text-green-700">Sessions In</span>
      </h2>

      {/* 🎓 Logo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-10 place-items-center max-w-7xl mx-auto">
        {schools.map((school, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center group"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300">
              <img
                src={school.logo}
                alt={school.name}
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <p className="text-xs sm:text-sm md:text-base font-medium text-gray-700 mt-3 sm:mt-4 leading-snug px-2">
              {school.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
