
import olympiadImg from "/thinker.svg"; 

export default function ThinkOlym() {
  return (
    <section className="py-10 px-2 md:px-16 bg-white">
      <div className="grid md:grid-cols-2 items-center gap-10">
        
        {/* Left Side Image */}
        <div className="flex justify-center">
          <img 
            src={olympiadImg} 
            alt="Olympiad illustration" 
            className="max-w-sm md:max-w-md rounded-xl"
          />
        </div>

        {/* Right Side Text */}
        <div>
          <h2 className="text-2xl md:text-5xl font-bold leading-snug">
            Not just <span className="text-green-600">another Olympiad</span>
          </h2>
          <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
            Go beyond rote learning our Olympiads focus on real-world 
            application, problem-solving, and AI-powered feedback to make every 
            challenge a step toward growth.
          </p>
        </div>
      </div>
    </section>
  );
}
