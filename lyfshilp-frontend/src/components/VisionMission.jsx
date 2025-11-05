import React from "react";

export default function VisionMission() {
  return (
    <section className="bg-[#FFF8EE] py-16 px-6 sm:px-10 md:px-16">
      <div className="max-w-5xl mx-auto text-center">
        {/* 🌟 Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Our <span className="text-green-600">Vision</span> &{" "}
          <span className="text-green-600">Mission</span>
        </h2>

        <p className="text-gray-600 max-w-3xl mx-auto mb-16 text-base sm:text-lg">
          Empowering every student to learn joyfully, think creatively, and grow purposefully.
        </p>

        {/* 🎯 Vision Block */}
        <div className="bg-white rounded-3xl p-10 mb-9 shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-50 text-left">
          <h3 className="text-2xl font-semibold text-green-700 mb-4 flex items-center">
            <span className="text-3xl mr-2"></span> Vision
          </h3>
          <p className="text-gray-700 leading-relaxed">
            To reimagine learning as a joyful and empowering experience where every
            student discovers their potential, learns with curiosity and grows into a
            confident, future-ready individual.
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            We envision a world where learning is not forced but fun, not limited to exams
            but connected to real life and not about competition but about growth and
            purpose.
          </p>
        </div>

        {/* 🚀 Mission Block */}
        <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-50 text-left">
          <h3 className="text-2xl font-semibold text-green-700 mb-4 flex items-center">
            <span className="text-3xl mr-2"></span> Mission
          </h3>
          <p className="text-gray-700 leading-relaxed">
            At Lyfshilp Academy, our mission is to make learning engaging, relevant and
            inspiring so that students don’t need to be pushed to study; they want to learn.
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Through mentorship, gamified learning (EduManiax), and skill-building experiences,
            we guide students to:
          </p>
          <ul className="list-disc list-inside mt-3 text-gray-700 space-y-2">
            <li>Enjoy the process of learning rather than fear it.</li>
            <li>Prepare smartly for competitive exams like CUET, IPMAT, and CLAT.</li>
            <li>Discover their strengths and explore meaningful career paths.</li>
            <li>Build life skills that go beyond classrooms and textbooks.</li>
          </ul>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Because when learning becomes enjoyable, growth becomes natural and that’s the
            world Lyfshilp Academy is building.
          </p>
        </div>
      </div>
    </section>
  );
}
