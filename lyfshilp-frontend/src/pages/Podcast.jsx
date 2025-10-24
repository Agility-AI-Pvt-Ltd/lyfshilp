// src/components/PodcastSection.jsx
import { useState, useEffect } from "react";
import laptopImg from "../assets/laptop.svg";
import academyLogo from "../assets/Lyfshilplogo.svg";
import cursorImg from "../assets/podcastimg/cursor.png";

export default function Podcast() {
  const [subscribed, setSubscribed] = useState(false);
  const [showMainVideo, setShowMainVideo] = useState(false);

  // Auto toggle subscribe
  useEffect(() => {
    const interval = setInterval(() => {
      setSubscribed((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-white pt-20 pb-16">
      <div className="max-w-5xl mx-auto text-center px-4">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Lyfshilp Academy{" "}
          <span className="text-green-600">Podcast</span> 🎙️
        </h2>
        <p className="text-gray-600 mb-6">
          Conversations that inspire learning, growth & future readiness
        </p>

        {/* Laptop container */}
        <div className="relative flex justify-center -mt-8 pb-10">
          {/* Laptop Image */}
          <img
            src={laptopImg}
            alt="Podcast Laptop"
            className="w-[800px] max-w-full drop-shadow-2xl"
            loading="lazy"
          />

          {/* Overlay Card inside Laptop */}
          <div className="absolute top-[22%] left-1/2 -translate-x-1/2 w-[50%] h-[35%] bg-white rounded-xl shadow-xl p-6 flex flex-col items-center gap-4 animate-fadeIn">
            {/* Top: Name + Logo */}
            <div className="flex items-center justify-between w-full">
              <div className="text-left w-full">
                <h3 className="text-xl font-bold">LYFSHILP ACADEMY</h3>
                <p className="text-gray-500 tracking-wide">EDUCATION</p>
                <div className="border-t border-gray-300 my-2"></div>
              </div>
              <img
                src={academyLogo}
                alt="Academy Logo"
                className="w-14 h-14"
                loading="lazy"
              />
            </div>

            {/* Subscribe Text (auto toggle) */}
            <div
              className={`relative px-12 py-4 rounded-md text-white font-bold text-xl transition-all duration-700 ${
                subscribed ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {subscribed ? "SUBSCRIBED" : "SUBSCRIBE NOW"}

              {/* Cursor Image Overlay */}
              {!subscribed && (
                <img
                  src={cursorImg}
                  alt="Cursor"
                  className="absolute -right-6 top-1/2 w-8 h-8 animate-bounce"
                  loading="lazy"
                />
              )}
            </div>
          </div>
        </div>

        {/* ------------------- Featured Episodes Section ------------------- */}
        <div className="text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Featured <span className="text-green-600">Episodes</span>
          </h2>
          <p className="text-gray-600 mb-6">
            Our podcast features top educators, leaders, and learners discussing education,
            careers and future skills – with stories, insights and inspiration.
          </p>

          {/* Main Video (lazy load with thumbnail) */}
          <div className="w-full mb-6">
            {!showMainVideo ? (
              <div
                className="relative w-full h-[500px] bg-black rounded-lg shadow-lg border-4 border-yellow-400 cursor-pointer overflow-hidden"
                onClick={() => setShowMainVideo(true)}
              >
                <img
                  src="https://img.youtube.com/vi/mZzXvoVX_4c/maxresdefault.jpg"
                  alt="Podcast Thumbnail"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center text-white text-6xl bg-black/40">
                  ▶
                </div>
              </div>
            ) : (
              <iframe
                className="w-full h-[500px] rounded-lg shadow-lg border-4 border-yellow-400"
                src="https://www.youtube.com/embed/mZzXvoVX_4c?autoplay=1"
                title="Lyfshilp Academy Podcast"
                frameBorder="0"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>

          {/* Related Videos */}
          <h3 className="text-lg font-semibold mb-3">Related Videos</h3>
          <div className="flex gap-4 overflow-x-auto pb-4">
            <iframe
              className="w-64 h-40 rounded-lg shadow-md"
              src="https://www.youtube.com/embed/1Bp5oBhTxf8?si=IqsW7vU73apdc1nQ"
              title="Related Video 1"
              frameBorder="0"
              loading="lazy"
              allowFullScreen
            ></iframe>
            <iframe
              className="w-64 h-40 rounded-lg shadow-md"
              src="https://www.youtube.com/embed/8Sq5bszxNto"
              title="Related Video 2"
              frameBorder="0"
              loading="lazy"
              allowFullScreen
            ></iframe>
            <iframe
              className="w-64 h-40 rounded-lg shadow-md"
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
  );
}
