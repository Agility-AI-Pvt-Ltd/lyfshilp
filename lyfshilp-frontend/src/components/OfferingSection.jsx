// src/components/OfferingsSection.jsx
import React from "react";
import { Link } from "react-router-dom";

import classroomImg from "../assets/classroomImg.svg";
import circleImg from "../assets/circleImg.png";
import edumaniaxBig from "../assets/EdumaniaxBig.png";
import competitiveImg from "../assets/CompetitiveImg.png"; 

export default function OfferingsSection() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-20 sm:px-6 lg:px-8">
       {/* Heading */}
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-gray-900">
          What we offer at{" "}
          <span className="text-green-600 font-extrabold">Lyfshilp Academy</span>
        </h2>
        <p className="mt-3 text-center text-gray-600 text-sm sm:text-base">
          Gain clarity &amp; achieve your expert goals with expert guidance
        </p>

        {/* GRID */}
        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-10">
            {/* Competitive Exam Preparation */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition flex flex-col">
              <div className="overflow-hidden rounded-t-2xl">
                <img
                  src={competitiveImg}
                  alt="Competitive Exam"
                  className="w-full h-48 object-contain bg-gray-50"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-900">
                  Competitive Exam Preparation
                </h3>
                <p className="mt-4 text-base text-gray-600 leading-relaxed flex-grow">
                  AI-powered mock tests, expert faculty, and personalized strategies
                  for CLAT, CUET, IPMAT/JIPMAT and more.
                </p>
              <Link
                 to="/exam-prep"
                className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700 transition"
              >
               Learn More <span aria-hidden>→</span>
              </Link>
              </div>
            </div>

            {/* Classroom Image */}
            <div className="overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition">
              <img
                src={classroomImg}
                alt="Workshop classroom"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>

          {/* MIDDLE COLUMN */}
          <div className="flex flex-col gap-10">
            {/* Career Profiling */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition flex flex-col">
              <div className="overflow-hidden rounded-t-2xl">
                <img
                  src={circleImg}
                  alt="Lyfshilp Circle"
                  className="w-full h-48 object-contain bg-gray-50"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-900">
                  Career Profiling &amp; Guidance from Experts
                </h3>
                <p className="mt-4 text-base text-gray-600 leading-relaxed flex-grow">
                  Psychometric assessments and one-on-one mentoring to help
                  students discover their strengths and choose the right career path.
                </p>
                <a
                  href="https://lyfshilpacademy.edumilestones.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700 transition"
                >
                  Learn More <span aria-hidden>→</span>
                </a>
              </div>
            </div>

            {/* Free Capacity-Building Workshops */}
            <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-900">
                Free Capacity-Building Workshops
              </h3>
              <p className="mt-4 text-base text-gray-600 leading-relaxed flex-grow">
                Special sessions for teachers and students focusing on AI, ICT
                integration and gamified learning methods delivered across
                schools and colleges to inspire future-ready education.
              </p>
              <a
                href="/workshop"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700 transition"
              >
                Learn More <span aria-hidden>→</span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-10">
            {/* EduManiax */}
            <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-900">
                EduManiax - Gamified Skill Learning
              </h3>
              <p className="mt-4 text-base text-gray-600 leading-relaxed flex-grow">
                Interactive, NEP 2020-aligned modules in AI, Finance, Law,
                Communication and Entrepreneurship for Classes 6–12.
              </p>
              <a
                href="https://edumaniax.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700 transition"
              >
                Learn More <span aria-hidden>→</span>
              </a>
            </div>

            {/* Edumaniax Image */}
            <div className="overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition">
              <img
                src={edumaniaxBig}
                alt="Edumaniax"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
