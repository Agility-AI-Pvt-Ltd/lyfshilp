import { useState, useEffect } from "react";
import laptopImg from "/laptop.svg";
import academyLogo from "../assets/Lyfshilplogo.svg";
import cursorImg from "../assets/podcastimg/cursor.png";
import ExploreYoutubeSection from "../components/ExploreYoutubeSection";

export default function Podcast() {
  const [subscribed, setSubscribed] = useState(false);
  const [showMainVideo, setShowMainVideo] = useState(false);

  // 🔁 Auto toggle subscribe every 3s
  useEffect(() => {
    const interval = setInterval(() => setSubscribed((prev) => !prev), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* 🎙️ Podcast Section */}
      <section className="w-full bg-white pt-24 pb-20">
        <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            Lyfshilp Academy{" "}
            <span className="text-green-600">Podcast</span> 🎙️
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed">
            Conversations that inspire learning, growth & future readiness.
          </p>

          {/* 💻 Laptop Section */}
          <div className="relative flex justify-center -mt-6 pb-12">
            <img
              src={laptopImg}
              alt="Podcast Laptop"
              className="w-[800px] max-w-full drop-shadow-2xl"
              loading="lazy"
            />

            {/* Overlay Card */}
            <div className="absolute top-[22%] left-1/2 -translate-x-1/2 w-[60%] sm:w-[50%] h-[35%] bg-white rounded-xl shadow-xl p-4 sm:p-6 flex flex-col items-center gap-4 animate-fadeIn">
              {/* Header */}
              <div className="flex items-center justify-between w-full">
                <div className="text-left w-full">
                  <h3 className="text-lg sm:text-xl font-bold">
                    LYFSHILP ACADEMY
                  </h3>
                  <p className="text-gray-500 text-sm tracking-wide">
                    EDUCATION
                  </p>
                  <div className="border-t border-gray-300 my-2"></div>
                </div>
                <img
                  src={academyLogo}
                  alt="Academy Logo"
                  className="w-10 h-10 sm:w-14 sm:h-14"
                  loading="lazy"
                />
              </div>

              {/* Subscribe Button */}
              <div
                className={`relative px-6 sm:px-12 py-3 sm:py-4 rounded-md text-white font-bold text-base sm:text-xl transition-all duration-700 ${
                  subscribed ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {subscribed ? "SUBSCRIBED" : "SUBSCRIBE NOW"}

                {/* Cursor Animation */}
                {!subscribed && (
                  <img
                    src={cursorImg}
                    alt="Cursor"
                    className="absolute -right-4 sm:-right-6 top-1/2 w-6 sm:w-8 h-6 sm:h-8 animate-bounce"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          </div>

          {/* 🌟 Featured Episodes */}
          <div className="text-left mt-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Featured <span className="text-green-600">Episodes</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed">
              Our podcast features top educators, leaders, and learners discussing
              education, careers, and future skills — with stories, insights, and inspiration.
            </p>

            {/* 🎬 Main Video */}
            <div className="w-full mb-6">
              {!showMainVideo ? (
                <div
                  className="relative w-full h-[220px] sm:h-[400px] md:h-[500px] bg-black rounded-lg shadow-lg border-4 border-yellow-400 cursor-pointer overflow-hidden"
                  onClick={() => setShowMainVideo(true)}
                >
                  <img
                    src="https://img.youtube.com/vi/mZzXvoVX_4c/maxresdefault.jpg"
                    alt="Podcast Thumbnail"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-white text-5xl sm:text-6xl bg-black/40">
                    ▶
                  </div>
                </div>
              ) : (
                <iframe
                  className="w-full h-[220px] sm:h-[400px] md:h-[500px] rounded-lg shadow-lg border-4 border-yellow-400"
                  src="https://www.youtube.com/embed/mZzXvoVX_4c?autoplay=1"
                  title="Lyfshilp Academy Podcast"
                  frameBorder="0"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>

            {/* 🎥 Related Videos */}
            <h3 className="text-lg sm:text-xl font-semibold mb-3">
              Related Videos
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4">
              <iframe
                className="w-56 sm:w-64 h-36 sm:h-40 rounded-lg shadow-md flex-shrink-0"
                src="https://www.youtube.com/embed/1Bp5oBhTxf8?si=IqsW7vU73apdc1nQ"
                title="Related Video 1"
                frameBorder="0"
                loading="lazy"
                allowFullScreen
              ></iframe>
              <iframe
                className="w-56 sm:w-64 h-36 sm:h-40 rounded-lg shadow-md flex-shrink-0"
                src="https://www.youtube.com/embed/8Sq5bszxNto"
                title="Related Video 2"
                frameBorder="0"
                loading="lazy"
                allowFullScreen
              ></iframe>
              <iframe
                className="w-56 sm:w-64 h-36 sm:h-40 rounded-lg shadow-md flex-shrink-0"
                src="https://www.youtube.com/embed/LKoqr5JGHWU"
                title="Related Video 3"
                frameBorder="0"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      {/* 🌿 Explore Youtube Section */}
      <ExploreYoutubeSection />
    </div>
  );
}
