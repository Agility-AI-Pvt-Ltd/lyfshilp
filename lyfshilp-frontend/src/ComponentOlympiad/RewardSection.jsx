import { useState, useEffect } from "react";
import stars from "../assets/Olympiadimg/stars.svg";
import trophy from "../assets/Olympiadimg/trophy.svg";
import certificate from "../assets/Olympiadimg/certificate.svg";

export default function RewardsSection() {
  const rewards = [
    {
      title: "Rewards For Every Participant",
      color: "bg-[#B6F7A5]",
      hoverColor: "bg-green-100",
      image: stars,
      details: [
        "Digital Certificate (with All-India Rank & QR verification)",
        "Exciting Giveaways like smartwatches & headphones",
        "Personalized Skill Report on future-readiness",
      ],
      strokeColor: "text-[#1E7A1E]",
    },
    {
      title: "Rewards For National Achievers",
      color: "bg-[#FFE388]",
      hoverColor: "bg-yellow-100",
      image: trophy,
      details: [
        { rank: "Top 3 Winners:", desc: "₹50K–₹1L Grant, Trophy, Mentorship, Media Feature" },
        { rank: "Top 10:", desc: "Mentorship + Tablet + 2-Year Edumaniax Access" },
        { rank: "Top 50:", desc: "Elite Certificate + 3-Day Bootcamp" },
        { rank: "Top 100:", desc: "Featured in FutureX National Talent Report" },
      ],
      strokeColor: "text-[#B47C00]",
    },
    {
      title: "Reward For School & Students",
      color: "bg-[#BEEAFF]",
      hoverColor: "bg-blue-100",
      image: certificate,
      details: [
        { label: "Schools:", value: "Best Future-Ready, Innovation, Academic Impact, Tech-Forward" },
        { label: "Students:", value: "Future Innovator, Young Entrepreneur, Rising Star, Changemaker" },
      ],
      strokeColor: "text-[#004E9A]",
    },
  ];

  return (
    <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-20 text-center bg-[#FFF8EE]">
      {/* 🏆 Section Heading */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-8 sm:mb-10 md:mb-12 gap-6 md:gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug">
            What you will get from this <br className="hidden sm:block" />
            <span className="text-green-700">FutureX Fellowship?</span>
          </h2>
        </div>
        <p className="text-gray-600 text-xs sm:text-sm md:text-base mt-2 md:mt-0 md:w-1/2 text-center md:text-left leading-relaxed max-w-xl">
          All Top 63 students (National Winners, Finalists & Elite Performers)
          receive digitally verified credentials co-issued by Edumanix and
          Agility AI, recognized for higher education and global career
          portfolios.
        </p>
      </div>

      {/* 🎁 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 md:gap-8">
        {rewards.map((reward, i) => (
          <RewardCard key={i} reward={reward} />
        ))}
      </div>
    </section>
  );
}

function RewardCard({ reward }) {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Corrected: useEffect for detecting mobile/tablet
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // On mobile, toggle on click instead of hover
  const handleInteraction = () => {
    if (isMobile) setHovered(!hovered);
  };

  return (
    <div
      className={`relative rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg transition-all duration-500 cursor-pointer ${reward.color} ${
        hovered ? reward.hoverColor + " scale-[1.02] sm:scale-[1.03]" : ""
      }`}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      onClick={handleInteraction}
    >
      {!hovered ? (
        // 🔹 Default (Before Hover/Click)
        <div className="flex flex-col items-center justify-center h-60 sm:h-64 md:h-72">
          <img
            src={reward.image}
            alt={reward.title}
            className="w-full h-full object-contain -mt-4 sm:-mt-6"
          />
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 px-2">
            {reward.title}
          </h3>
          <div
            className={`mt-1 sm:mt-2 inline-block text-sm sm:text-base font-semibold ${reward.strokeColor}`}
          >
            <div className="border-b-[3px] sm:border-b-[4px] border-current rounded-full px-3 sm:px-4 py-1">
              {isMobile ? "Tap to Reveal" : "Hover to Reveal"}
            </div>
          </div>
        </div>
      ) : reward.title === "Rewards For National Achievers" ? (
        // 🟡 Hover content for National Achievers
        <div className="flex flex-col justify-center items-start h-60 sm:h-64 md:h-72 text-left">
          <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-gray-900 mb-3 sm:mb-4 leading-snug">
            Rewards that go beyond medals
          </h3>
          <ul className="space-y-1.5 sm:space-y-2 text-gray-800 font-medium w-full">
            {reward.details.map((d, idx) => (
              <li
                key={idx}
                className="bg-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-md border border-gray-200 text-xs sm:text-sm shadow-sm"
              >
                <span className="font-bold">{d.rank}</span> {d.desc}
              </li>
            ))}
          </ul>
        </div>
      ) : reward.title === "Reward For School & Students" ? (
        // 🔵 Hover content for School & Students
        <div className="flex flex-col justify-center items-start h-60 sm:h-64 md:h-72 text-left">
          <h3 className="text-base sm:text-lg md:text-xl -mt-6 sm:-mt-8 md:-mt-10 font-extrabold text-gray-900 mb-3 sm:mb-4 leading-snug">
            Celebrating excellence in learning
          </h3>
          <ul className="space-y-2 sm:space-y-3 text-gray-800 font-medium w-full">
            {reward.details.map((d, idx) => (
              <li
                key={idx}
                className="bg-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-md border border-gray-200 text-xs sm:text-sm shadow-sm"
              >
                <span className="font-bold">{d.label}</span> {d.value}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        // 🟢 Default hover for Every Participant
        <div className="flex flex-col justify-center items-start h-60 sm:h-64 md:h-72 text-left">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
            Get recognized and rewarded for participation
          </h3>
          <ul className="space-y-1.5 sm:space-y-2 text-gray-800 font-medium w-full">
            {reward.details.map((d, idx) => (
              <li
                key={idx}
                className="bg-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-md border border-gray-200 text-xs sm:text-sm shadow-sm"
              >
                {d}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
 