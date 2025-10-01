// src/components/JoinLearnersSection.jsx
import joinImg from "../assets/Olympiadimg/join.svg"; // <-- apna actual image ka naam use karo

export default function JoinLearnSection() {
  return (
    <section className="py-10 px-2 md:px-16 bg-yellow-100">
      <div className="grid md:grid-cols-2 items-center gap-10">
        
        {/* Left Side Image */}
        <div className="flex justify-center">
          <img 
            src={joinImg} 
            alt="Join learners illustration" 
            className="max-w-sm md:max-w-md rounded-xl"
          />
        </div>

        {/* Right Side Text */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Join 15,000+ learners shaping their future with us!
          </h2>
          <ul className="mt-4 space-y-2 text-gray-700 text-base md:text-lg">
            <li>• Prepare with AI-powered mock tests and Olympiads</li>
            <li>• Learn in a safe, inclusive, and growth-driven environment</li>
            <li>• Access mentorship, workshops, and career tools</li>
            <li>• Build future-ready skills beyond exams</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
