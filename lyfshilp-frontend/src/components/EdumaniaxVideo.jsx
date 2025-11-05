import React from "react";

export default function EdumaniaxVideo() {
  return (
    <section className="bg-gray-50 py-16 px-6 sm:px-10 flex flex-col items-center text-center">
      {/* 🎬 Heading */}
      <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
        Experience <span className="text-[#1DB954]">Edumaniax</span>
      </h2>

      <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mb-12 leading-relaxed">
        Dive into our world of joyful learning where curiosity meets creativity,
        and education becomes an exciting adventure.
      </p>

      {/* 🎞️ Video Section */}
      <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.02] bg-black">
        <video
          controls
          className="w-full h-[260px] sm:h-[360px] md:h-[440px] lg:h-[480px] object-cover rounded-3xl"
          poster="/images/edumaniax-thumbnail.png"
        >
          <source src="/videos/edumaniax.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
