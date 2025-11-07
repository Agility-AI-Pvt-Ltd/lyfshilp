import { Lightbulb, UsersRound, Briefcase } from "lucide-react";
import WaveBg from "../assets/career/wave-bg.svg";

export default function OlympiadSection5() {
  const features = [
    {
      icon: <Lightbulb className="w-8 h-8 text-green-600 mx-auto" />,
      title:
        "Discover their X-Factor their unique strengths, passions, and capabilities",
    },
    {
      icon: <UsersRound className="w-8 h-8 text-green-600 mx-auto" />,
      title:
        "Gain exposure to real-world problem-solving and innovation-driven learning",
    },
    {
      icon: <Briefcase className="w-8 h-8 text-green-600 mx-auto" />,
      title:
        "Build career readiness and verified credentials for higher education and global opportunities",
    },
  ];

  return (
    <section className="relative py-20 bg-[#faedd9] overflow-hidden">
      {/* 🌊 Wave Background */}
      <img
        src={WaveBg}
        alt="wave background"
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none select-none opacity-25"
      />

      {/* 💡 Content Section */}
      <div className="relative container mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Why <span className="text-green-600">FutureX?</span>
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Where Students Meet the Real World Problems and solve it using their
          practical thoughts. The Olympiad enables students to:
        </p>

        {/* 🌟 Features Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-8 text-center flex flex-col items-center justify-center hover:shadow-lg hover:-translate-y-1 transition duration-300 min-h-[180px]"
            >
              {/* Icon */}
              <div className="mb-4">{feature.icon}</div>

              {/* Title */}
              <h4 className="font-semibold text-base text-gray-800 leading-relaxed max-w-[280px]">
                {feature.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
