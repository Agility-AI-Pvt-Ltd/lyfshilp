// src/components/RecognitionSection.jsx
import recognitionImg from "/recognition.svg"; // <-- apne image ka actual naam update karo

export default function RecogSection() {
  return (
    <section className="py-10 px-2 md:px-16 bg-white">
      <div className="grid md:grid-cols-2 items-center gap-10">
        
        {/* Left Side Text */}
        <div>
          <h2 className="text-2xl md:text-5xl font-bold leading-snug">
            Recognized, <span className="text-green-600">Rewarding & Real</span>
          </h2>
          <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
            Earn certificates, build confidence, and gain national recognition
            while competing in engaging, gamified quizzes that turn knowledge 
            into lasting skills.
          </p>
        </div>

        {/* Right Side Image */}
        <div className="flex justify-center">
          <img 
            src={recognitionImg} 
            alt="Recognition illustration" 
            className="max-w-sm md:max-w-md rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}
