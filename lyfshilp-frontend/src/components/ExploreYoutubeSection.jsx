import ExploreEmoji from "../assets/ExploreYoutube/explore-emoji.svg"; 
import YoutubeEmoji from "../assets/ExploreYoutube/youtube-emoji.svg"; 

export default function ExploreYoutubeSection() {
  return (
    <section className="relative z-20 -mb-5"> {/* footer ke upar overlap */}
      <div className="container mx-auto px-6">
        
        {/* Cards Wrapper - flex with no gap */}
        <div className="flex flex-col md:flex-row md:gap-0 justify-center items-stretch">
          
          {/* Explore Now Card */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl 
                          p-10 flex flex-col items-center text-center 
                          transition-transform transform hover:-translate-y-2 
                          h-[400px] w-[320px]">
            <img
              src={ExploreEmoji}
              alt="Explore Emoji"
              className="w-28 h-28 mb-6"
            />
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6 leading-snug">
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

          {/* YouTube Card */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl 
                          p-8 flex flex-col transition-transform transform hover:-translate-y-2
                          h-[400px] w-[610px]">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={YoutubeEmoji}
                alt="YouTube Emoji"
                className="w-8 h-8"
              />
              <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                Know about Us more through our Youtube Channel
              </h3>
            </div>

            {/* YouTube Embed */}
            <div className="relative w-full flex-1">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                src="https://www.youtube.com/embed/mZzXvoVX_4c"
                title="Lyfshilp Academy Teaser"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
