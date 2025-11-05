import { ArrowRight } from "lucide-react";

export default function VerbalAbility() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-10 px-6 md:px-20 py-14 bg-white">
      {/* 🎥 Left side - YouTube video */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="aspect-video w-full max-w-xl rounded-2xl overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/Vf0AdL2LD3o?si=uEiPedeS3TxMcdjB" // ✅ Replace VIDEO_ID with your YouTube video ID
            title="Master Verbal Ability"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* 🧠 Right side - Text content */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        {/* Small badge */}
        <div className="inline-block bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
          For Free
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold leading-snug mb-4">
          <span className="text-green-700">Master Verbal Ability</span>
          <br />
          <span className="text-gray-900">with Experts</span>
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-lg mb-8">
          Build a strong foundation in English for CUET, IPMAT, and CLAT with
          topic-wise video lessons. Learn key grammar concepts like Parts of
          Speech, Nouns, and Subject-Verb Agreement simplified for your exam
          success.
        </p>

        {/* Button */}
        <a
          href="https://www.youtube.com/watch?v=Vf0AdL2LD3o" // ✅ Replace with actual playlist link
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
