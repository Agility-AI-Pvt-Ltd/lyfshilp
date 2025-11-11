import React, { useRef, useEffect, useState } from "react";

export default function CareerFairSection() {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const [isMuted1, setIsMuted1] = useState(true);
  const [isMuted2, setIsMuted2] = useState(true);

  useEffect(() => {
    const videos = [videoRef1.current, videoRef2.current];
    videos.forEach((video) => {
      if (!video) return;

      const playVideo = async () => {
        try {
          await video.play();
        } catch {
          console.warn("Autoplay blocked. Waiting for user interaction...");
          const handleUserClick = () => {
            video.play();
            window.removeEventListener("click", handleUserClick);
          };
          window.addEventListener("click", handleUserClick);
        }
      };
      playVideo();

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(video);
      return () => observer.disconnect();
    });
  }, []);

  const handleToggleMute = (videoRef, setMuteState, currentMute) => {
    const video = videoRef.current;
    if (video) video.muted = !currentMute;
    setMuteState(!currentMute);
  };

  return (
    <section className="bg-[#FFF8EE] py-10 sm:py-14 md:py-16 px-4 sm:px-10 flex flex-col md:flex-row items-center justify-center gap-10 overflow-hidden">
      {/* 🎬 Two Equal Videos Side-by-Side */}
      <div className="flex justify-center md:justify-start w-full md:w-auto gap-5 relative">
        {/* 🎥 First Video */}
        <div className="relative w-[260px] sm:w-[300px] md:w-[320px] h-[480px] sm:h-[540px] md:h-[550px] rounded-2xl overflow-hidden shadow-2xl bg-black">
          <video
            ref={videoRef1}
            src="/videos/career-fair.mp4"
            autoPlay
            loop
            playsInline
            muted
            preload="auto"
            className="w-full h-full object-cover"
          />

          {/* 🔊 Mute/Unmute Button */}
          <button
            onClick={() =>
              handleToggleMute(videoRef1, setIsMuted1, isMuted1)
            }
            className="absolute bottom-3 right-3 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-all duration-200"
          >
            {isMuted1 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M16.5 12L19 9.5l1.5 1.5L18 13.5l2.5 2.5L19 17.5 16.5 15l-2.5 2.5-1.5-1.5L15 13.5l-2.5-2.5 1.5-1.5L16.5 12zM3 9v6h4l5 5V4L7 9H3z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.03-3.75l1.26-1.26A6 6 0 0 1 19.5 12a6 6 0 0 1-3.77 5.51l-1.26-1.26A4.5 4.5 0 0 0 16.5 12z" />
              </svg>
            )}
          </button>
        </div>

        {/* 🎥 Second Video */}
        <div className="relative w-[260px] sm:w-[300px] md:w-[320px] h-[480px] sm:h-[540px] md:h-[550px] rounded-2xl overflow-hidden shadow-2xl bg-black">
          <video
            ref={videoRef2}
            src="/videos/career-fair-2.mp4"
            autoPlay
            loop
            playsInline
            muted
            preload="auto"
            className="w-full h-full object-cover"
          />

          {/* 🔊 Independent Mute/Unmute Button */}
          <button
            onClick={() =>
              handleToggleMute(videoRef2, setIsMuted2, isMuted2)
            }
            className="absolute bottom-3 right-3 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-all duration-200"
          >
            {isMuted2 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M16.5 12L19 9.5l1.5 1.5L18 13.5l2.5 2.5L19 17.5 16.5 15l-2.5 2.5-1.5-1.5L15 13.5l-2.5-2.5 1.5-1.5L16.5 12zM3 9v6h4l5 5V4L7 9H3z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.03-3.75l1.26-1.26A6 6 0 0 1 19.5 12a6 6 0 0 1-3.77 5.51l-1.26-1.26A4.5 4.5 0 0 0 16.5 12z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 📘 Text Section */}
      <div className="w-full md:flex-1 text-center md:text-left flex flex-col justify-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight">
          Career Fair <span className="text-green-600">Experience</span>
        </h2>

        <p className="text-gray-700 text-justify text-sm sm:text-base md:text-lg leading-relaxed tracking-wide">
          Empowering students through awareness, mentorship, and real
          opportunities one career fair at a time. At{" "}
          <span className="font-semibold text-green-600">Lyfshilp Academy</span>,
          career fairs have been an inspiring journey of engagement and impact.
          We connect directly with students, parents & educators guiding them
          toward informed academic and career choices.
          <br />
          <br />
          Students also explore our data-backed career profiling, CUET/IPMAT/CLAT
          prep, and mentorship programs that help them choose their paths with
          clarity and confidence. Each fair reaffirms our belief that with the
          right awareness, exposure, and mentorship, young minds can truly
          transform their futures.
          <br />
          <br />
          During these fairs, we introduce{" "}
          <span className="font-semibold text-green-600">Edumaniax</span> — a
          gamified 21st-century skill-building platform that makes learning fun,
          interactive, and purposeful. You too can explore Edumaniax and
          experience how it makes learning engaging and future-ready.
        </p>

        <button
          onClick={() => window.open("https://edumaniax.com/", "_blank")}
          className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-medium shadow-md hover:bg-green-700 transition mt-6 self-center md:self-start"
        >
          Explore To Edumaniax.com
        </button>
      </div>
    </section>
  );
}
