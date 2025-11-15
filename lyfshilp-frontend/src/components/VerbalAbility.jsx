import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/axios.js";

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

export default function VerbalAbility() {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await api.get("/podcast/all");

        if (res.data?.success && Array.isArray(res.data.data)) {
          const data = res.data.data;

          // ✅ FINAL FIX: LAST SECOND VIDEO
          setVideo(data[data.length - 2] || null);
        }
      } catch (err) {
        console.error("Error loading video:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, []);

  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-10 px-6 md:px-20 py-14 bg-white">
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="aspect-video w-full max-w-xl rounded-2xl overflow-hidden shadow-lg">
          {loading ? (
            <div className="flex items-center justify-center w-full h-full bg-gray-50 text-gray-500 text-sm animate-pulse">
              Loading video...
            </div>
          ) : video ? (
            <iframe
              className="w-full h-full"
              src={`${getEmbedUrl(video.videoUrl)}?autoplay=0`}
              title={video.title || "Verbal Ability Video"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-500">
              No video available
            </div>
          )}
        </div>
      </div>

      <div className="w-full md:w-1/2 text-center md:text-left">
        <div className="inline-block bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
          For Free
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold leading-snug mb-4">
          <span className="text-green-700">Master Verbal Ability</span>
          <br />
          <span className="text-gray-900">with Experts</span>
        </h2>

        <p className="text-gray-600 text-lg mb-8">
          Build a strong foundation in English with topic-wise lessons covering
          grammar, reading, and exam preparation for CUET, IPMAT, and CLAT.
        </p>

        <a
          href={video ? video.videoUrl : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-green-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-green-700 transition-all"
        >
          Watch Full Playlist
          <ArrowRight className="ml-2" size={20} />
        </a>
      </div>
    </section>
  );
}
