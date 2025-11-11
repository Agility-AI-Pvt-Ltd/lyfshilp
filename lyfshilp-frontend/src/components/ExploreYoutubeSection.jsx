import { useEffect, useState } from "react";
import ExploreEmoji from "../assets/ExploreYoutube/explore-emoji.svg";
import YoutubeEmoji from "../assets/ExploreYoutube/youtube-emoji.svg";
import api from "../api/axios.js"; // ✅ using same axios instance

// 🔗 Convert any YouTube link to embed format
const getEmbedUrl = (url) => {
  if (!url) return "";
  if (!url.startsWith("http")) return `https://www.youtube.com/embed/${url}`;
  if (url.includes("youtu.be")) {
    const id = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  if (url.includes("youtube.com/watch?v=")) {
    const id = url.split("v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  if (url.includes("youtube.com/embed/")) return url;
  return url;
};

export default function ExploreYoutubeSection() {
  const [mainVideo, setMainVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🟢 Fetch LAST podcast (latest entry)
  useEffect(() => {
    const fetchMainVideo = async () => {
      try {
        const res = await api.get("/podcast/all");
        if (res.data?.success && Array.isArray(res.data.data)) {
          const data = res.data.data;
          setMainVideo(data[data.length - 1] || null); // ✅ last index
        }
      } catch (err) {
        console.error("Error fetching main video:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMainVideo();
  }, []);

  return (
    <section className="relative z-20 -mb-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cards Wrapper */}
        <div className="flex flex-col md:flex-row justify-center items-stretch md:gap-0 gap-0">
          
          {/* 🧭 Explore Now Card */}
          <div
            className="bg-white border border-gray-200 rounded-none md:rounded-l-2xl md:rounded-r-none shadow-xl 
                       p-8 sm:p-10 flex flex-col items-center text-center 
                       transition-transform transform hover:-translate-y-2 
                       w-full sm:w-[360px] md:w-[320px] lg:w-[340px]
                       h-auto md:h-[400px]"
          >
            <img
              src={ExploreEmoji}
              alt="Explore Emoji"
              className="w-24 sm:w-28 h-auto mb-6"
            />
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-6 leading-snug">
              Find the right result, with <br /> the smart preparation
            </h3>
            <a
              href="https://lyfshilpacademy.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <button className="w-full py-3 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition">
                Explore Now
              </button>
            </a>
          </div>

          {/* 🎥 YouTube Card */}
          <div
            className="bg-white border border-gray-200 rounded-none md:rounded-r-2xl md:rounded-l-none shadow-xl 
                       p-6 sm:p-8 flex flex-col 
                       transition-transform transform hover:-translate-y-2
                       w-full sm:w-[500px] md:w-[600px] lg:w-[610px]
                       h-auto md:h-[400px]"
          >
            <div className="flex items-center gap-3 mb-4 flex-wrap justify-center md:justify-start text-center md:text-left">
              <img
                src={YoutubeEmoji}
                alt="YouTube Emoji"
                className="w-7 h-7 sm:w-8 sm:h-8"
              />
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                Know about us more through our YouTube Channel
              </h3>
            </div>

            {/* 🎬 Dynamic YouTube Embed */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden">
              {loading ? (
                <div className="flex items-center justify-center w-full h-full bg-gray-50 text-gray-500 text-sm animate-pulse">
                  Loading video...
                </div>
              ) : mainVideo ? (
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`${getEmbedUrl(mainVideo.videoUrl)}?autoplay=0`}
                  title={mainVideo.title || "Lyfshilp Academy Podcast"}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-500">
                  No video available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
