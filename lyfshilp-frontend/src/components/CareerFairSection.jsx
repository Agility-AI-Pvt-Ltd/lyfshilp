import React, { useRef, useEffect, useState } from "react";

export default function CareerFairSection() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video element has muted attribute for autoplay
    video.muted = true; // required before calling play()

    const playVideo = async () => {
      try {
        await video.play();
      } catch (err) {
        console.warn("Autoplay blocked. Waiting for user interaction...");
        const handleUserClick = () => {
          video.play();
          window.removeEventListener("click", handleUserClick);
        };
        window.addEventListener("click", handleUserClick);
      }
    };
    playVideo();

    // Auto mute/unmute based on scroll visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
            video.muted = false;
            setIsMuted(false);
          } else {
            video.pause();
            video.muted = true;
            setIsMuted(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const handleToggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  return (
    <section className="bg-[#FFF8EE] py-10 sm:py-14 md:py-16 px-4 sm:px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-10 md:gap-12">
      {/* 🎬 Video Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[300px] aspect-[9/16] rounded-2xl overflow-hidden shadow-xl bg-black">
          <video
            ref={videoRef}
            src="/videos/career-fair.mp4"
            autoPlay
            loop
            playsInline
            muted // ✅ real HTML attribute required for autoplay
            preload="auto"
            className="w-full h-full object-cover"
          />

          {/* 🔊 Mute/Unmute Button */}
          <button
            onClick={handleToggleMute}
            className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 p-1.5 sm:p-2 bg-black/50 rounded-full hover:bg-black/70 transition-all duration-200"
          >
            {isMuted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                className="w-4 h-4 sm:w-5 sm:h-5"
              >
                <path d="M16.5 12L19 9.5l1.5 1.5L18 13.5l2.5 2.5L19 17.5 16.5 15l-2.5 2.5-1.5-1.5L15 13.5l-2.5-2.5 1.5-1.5L16.5 12zM3 9v6h4l5 5V4L7 9H3z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                className="w-4 h-4 sm:w-5 sm:h-5"
              >
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.03-3.75l1.26-1.26A6 6 0 0 1 19.5 12a6 6 0 0 1-3.77 5.51l-1.26-1.26A4.5 4.5 0 0 0 16.5 12z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 📘 Text Section */}
      <div className="w-full md:w-1/2 text-center md:text-left px-1 sm:px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-5">
          Career Fair <span className="text-green-600">Experience</span>
        </h2>

        <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-5 sm:mb-6">
          Step into our vibrant{" "}
          <span className="font-semibold text-green-600">Career Fair</span>,
          where students explore exciting opportunities and interact directly
          with top universities, industry mentors, and recruiters.
          <br />
          <br />
          The event bridges the gap between academics and real-world exposure,
          empowering young minds to plan their careers with confidence.
        </p>

        <button
          onClick={() =>
            window.open("https://edumaniax.com/", "_blank")
          }
          className="bg-green-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-base sm:text-lg font-medium shadow-md hover:bg-green-700 transition"
        >
          Edumaniax.Com
        </button>
      </div>
    </section>
  );
}
