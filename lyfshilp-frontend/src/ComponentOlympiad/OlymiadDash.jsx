import { Link } from "react-router-dom";
import financeImg from "../assets/Olympiadimg/Financeimg.jpg";
import aiImg from "../assets/Olympiadimg/Aiimg.jpg";
import employImg from "../assets/Olympiadimg/Empimg.png";
import entreImg from "../assets/Olympiadimg/Entrepimg.jpg";

export default function OlympiadDash() {
  const olympiads = [
    {
      title: "Finance Management Fellowship",
      image: financeImg,
      desc: "28 Questions • Quiz Type • 20 minutes",
      link: "/olympiad/finance",
    },
    {
      title: "Artificial Intelligence Fellowship",
      image: aiImg,
      desc: "28 Questions • Quiz Type • 20 minutes",
      link: "/olympiad/ai",
    },
    {
      title: "Employability Skills Fellowship",
      image: employImg,
      desc: "28 Questions • Quiz Type • 20 minutes",
      link: "/olympiad/employability",
    },
    {
      title: "Entrepreneurship Fellowship",
      image: entreImg,
      desc: "28 Questions • Quiz Type • 20 minutes",
      link: "/olympiad/entrepreneurship",
    },
  ];

  return (
    <section className="bg-[#FFF8EE] py-16 px-6 md:px-12 lg:px-20 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">
        Choose your <span className="text-green-600">Fellowship</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {olympiads.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
          >
            {/* Full image at the top */}
            <div className="w-full h-40 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-55 h-55 object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>

            {/* Text and button below */}
            <div className="p-6 flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mb-6">{item.desc}</p>
              <Link
                to={item.link}
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-2 rounded-full shadow-md transition-all duration-300"
              >
                Explore Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
