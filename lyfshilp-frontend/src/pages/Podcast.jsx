import { useState, useEffect } from "react";
import laptopImg from "/laptop.svg";
import academyLogo from "../assets/Lyfshilplogo.svg";
import cursorImg from "../assets/podcastimg/cursor.png";
import ExploreYoutubeSection from "../components/ExploreYoutubeSection.jsx";
import api from "../api/axios.js";

// 🧠 Helper — convert any YouTube URL to embeddable format
const getEmbedUrl = (url) => {
  if (!url) return "";

  if (!url.startsWith("http")) {
    return `https://www.youtube.com/embed/${url}`;
  }
  if (url.includes("youtu.be")) {
    const id = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  if (url.includes("youtube.com/watch?v=")) {
    const id = url.split("v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  if (url.includes("youtube.com/embed/")) {
    return url;
  }
  return url;
};

export default function Podcast() {
  const [subscribed, setSubscribed] = useState(false);
  const [podcasts, setPodcasts] = useState([]);
  const [mainVideo, setMainVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);

  // 🟢 Fetch podcasts
  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const res = await api.get("/podcast/all");
        if (res.data?.success && Array.isArray(res.data.data)) {
          setPodcasts(res.data.data);
          setMainVideo(res.data.data[0] || null);
        }
      } catch (err) {
        console.error("Error fetching podcasts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPodcasts();
  }, []);

  // 🌍 Wait for full page load (images + iframes)
  useEffect(() => {
    const handleLoad = () => setPageLoaded(true);

    if (document.readyState === "complete") {
      setPageLoaded(true);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  // 🔁 Subscribe animation
  useEffect(() => {
    const interval = setInterval(() => setSubscribed((prev) => !prev), 3000);
    return () => clearInterval(interval);
  }, []);

  // ⏳ Combined Loading State
  if (loading || !pageLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-gray-600 text-lg animate-pulse">Loading podcasts...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 🎙️ Podcast Section */}
      <section className="w-full bg-white pt-24 pb-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            Lyfshilp Academy <span className="text-green-600">Podcast</span> 🎙️
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed">
            Conversations that inspire learning, growth & future readiness.
          </p>

          {/* 💻 Laptop Section */}
          <div
            className="relative flex justify-center items-center -mt-6 pb-12"
            style={{ minHeight: "400px" }}
          >
            <img
              src={laptopImg}
              alt="Podcast Laptop"
              className="w-[800px] max-w-full drop-shadow-2xl opacity-0 transition-opacity duration-500"
              onLoad={(e) => (e.currentTarget.style.opacity = 1)}
            />
            <div className="absolute top-[22%] left-1/2 -translate-x-1/2 w-[60%] sm:w-[50%] h-[35%] bg-white rounded-xl shadow-xl p-4 sm:p-6 flex flex-col items-center gap-4 transition-opacity duration-700 opacity-100">
              <div className="flex items-center justify-between w-full">
                <div className="text-left w-full">
                  <h3 className="text-lg sm:text-xl font-bold">LYFSHILP ACADEMY</h3>
                  <p className="text-gray-500 text-sm tracking-wide">EDUCATION</p>
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
              education, careers, and future skills with stories, insights, and inspiration.
            </p>

            {/* 🎬 Main Video */}
            {mainVideo && (
              <div className="w-full mb-6">
                <iframe
                  className="w-full h-[220px] sm:h-[400px] md:h-[500px] rounded-lg shadow-lg border-4 border-yellow-400"
                  src={`${getEmbedUrl(mainVideo.videoUrl)}?autoplay=0`}
                  title={mainVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {/* 🎥 Related Videos */}
            {podcasts.length > 1 && (
              <>
                <h3 className="text-lg sm:text-xl font-semibold mb-3">
                  Related Videos
                </h3>
                <div className="relative">
                  <div
                    id="relatedScroll"
                    className="flex gap-4 overflow-x-auto pb-4 scroll-smooth no-scrollbar"
                    onScroll={(e) => {
                      const el = e.target;
                      const leftBtn = document.getElementById("scrollLeftBtn");
                      const rightBtn = document.getElementById("scrollRightBtn");

                      if (el.scrollLeft <= 10)
                        leftBtn.classList.add("opacity-0", "pointer-events-none");
                      else leftBtn.classList.remove("opacity-0", "pointer-events-none");

                      if (el.scrollWidth - el.clientWidth - el.scrollLeft <= 10)
                        rightBtn.classList.add("opacity-0", "pointer-events-none");
                      else rightBtn.classList.remove("opacity-0", "pointer-events-none");
                    }}
                  >
                    {podcasts.slice(1).map((podcast) => (
                      <iframe
                        key={podcast.id}
                        className="w-56 sm:w-64 h-36 sm:h-40 rounded-lg shadow-md flex-shrink-0"
                        src={getEmbedUrl(podcast.videoUrl)}
                        title={podcast.title}
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    ))}
                  </div>

                  {/* ⬅️ Left */}
                  <button
                    id="scrollLeftBtn"
                    onClick={() =>
                      document.getElementById("relatedScroll").scrollBy({
                        left: -300,
                        behavior: "smooth",
                      })
                    }
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800/60 hover:bg-gray-800 text-white p-3 rounded-full shadow-md z-10 transition-all duration-300 hidden sm:flex opacity-0 pointer-events-none"
                  >
                    <span className="text-lg">❮</span>
                  </button>

                  {/* ➡️ Right */}
                  <button
                    id="scrollRightBtn"
                    onClick={() =>
                      document.getElementById("relatedScroll").scrollBy({
                        left: 300,
                        behavior: "smooth",
                      })
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800/60 hover:bg-gray-800 text-white p-3 rounded-full shadow-md z-10 transition-all duration-300 hidden sm:flex"
                  >
                    <span className="text-lg">❯</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 🌿 Explore Youtube Section */}
      <ExploreYoutubeSection />
    </div>
  );
}
