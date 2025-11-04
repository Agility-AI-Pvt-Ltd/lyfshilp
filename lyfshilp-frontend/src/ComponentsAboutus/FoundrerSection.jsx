import Sharadimg from "../assets/Aboutimg/Sharad.svg";
import Shreyaimg from "../assets/Aboutimg/Shreya.svg";
import Saurabhimg from "../assets/Aboutimg/Saurabh.svg";
import { FaLinkedin } from "react-icons/fa";

export default function FoundersSection() {
  const founders = [
    {
      img: Sharadimg,
      name: "Sharad Raaj Ustav",
      role: "Founder & CEO",
      linkedin:
        "https://www.linkedin.com/in/sharadrajutsav?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_appv",
      bio: `A curious mind with degrees in Engineering, Management and Law, Sharad has explored education, business and development across organizations like the United Nations, Amul and Piramal Foundation. His journey from boardrooms to classrooms inspired Lyfshilp Academy, where he’s on a mission to make learning fun, relevant, and future-ready.

      His mantra: “If learning feels like a chore, you’re doing it wrong.”`,
    },
    {
      img: Shreyaimg,
      name: "Shreya Sinha",
      role: "Co-Founder",
      linkedin:
        "https://www.linkedin.com/in/shreya-sinha2802?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      bio: `An Engineer turned Educator, Shreya brings creativity and empathy to everything she designs. Her experience in Digital Marketing at Piramal Pharma and later with the Piramal Foundation gave her a unique blend of analytical thinking and human-centered design helping her understand how young minds learn best, through curiosity and play.

      Her belief: “When students feel seen, learning takes care of itself.”`,
    },
    {
      img: Saurabhimg,
      name: "Saurabh Jain",
      role: "Co-Founder",
      linkedin: "https://www.linkedin.com/in/ca-saurabh-jain-8a014034/",
      bio: `A Chartered Accountant who believes numbers and learning can be equally exciting, Saurabh brings financial discipline and strategic clarity to Lyfshilp’s vision. Having worked with multiple startups and education ventures, he ensures the academy grows with purpose and sustainability all while keeping the joy of learning at the center.

      His philosophy: “Strong foundations build not just balance sheets but better learners.”`,
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
          Meet the Minds behind{" "}
          <span className="text-[#1DB954]">Lyfshilp Academy</span>
        </h2>
        <p className="mt-6 text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Behind every student’s success is a visionary founder who blends
          expertise in education, technology, and mentorship to create
          transformative learning experiences.
        </p>

        {/* Team Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {founders.map((founder, index) => (
            <div
              key={index}
              className="group bg-gray-50 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col border border-gray-100 transform hover:-translate-y-2 hover:scale-[1.02]"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={founder.img}
                  alt={founder.name}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/50 to-transparent text-white py-4 px-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-200">{founder.role}</p>
                    <h3 className="font-semibold text-lg">{founder.name}</h3>
                  </div>
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#0A66C2] text-2xl transition"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>

              {/* Bio */}
              <div className="px-6 py-6 text-left flex-grow">
                <p className="text-gray-700 text-[15px] leading-relaxed tracking-wide whitespace-pre-line font-light">
                  {founder.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
