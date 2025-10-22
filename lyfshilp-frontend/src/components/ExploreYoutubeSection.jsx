import ExploreEmoji from "../assets/ExploreYoutube/explore-emoji.svg"; 
import YoutubeEmoji from "../assets/ExploreYoutube/youtube-emoji.svg"; 

export default function ExploreYoutubeSection() {
  return (
    <section className="relative z-20 -mb-5"> {/* footer ke upar overlap */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cards Wrapper - no visible gap */}
        <div className="flex flex-col md:flex-row justify-center items-stretch md:gap-0 gap-0">
          
          {/* Explore Now Card */}
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

          {/* YouTube Card */}
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
                Know about Us more through our Youtube Channel
              </h3>
            </div>

            {/* Responsive YouTube Embed */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
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
