import { useState } from "react";

const faqs = [
  {
    question: "Do I need coaching for CUET, IPMAT and CLAT?",
    answer:
      "You don’t need coaching for CUET, IPMAT or CLAT but the right guidance can make a big difference.These exams are competitive and strategy-driven, not just syllabus-based.Structured coaching gives you clarity, speed practice and consistent improvement.Most top scorers rely on expert support to avoid guesswork and save time.At Lyfshilp Academy, we simply help you prepare smarter and perform with confidence.",
  },
  {
    question: "What services do you provide for cuet, ipmat and clat preparation?",
    answer:
      "We offer complete CUET, IPMAT and CLAT preparation with top-notch faculty and small, focused batches.Students get one-to-one mentorship, personalised guidance and structured study plans. Our program includes high-quality books, class lecture notes in PDF form and detailed revision modules.You also get full access to our online test series with exam-level mocks and analytics.Simply put, Lyfshilp Academy gives you everything you need to prepare better, faster and smarter.",
  },
  {
    question: "how your institute helps us in counselling process?",
    answer:
      "We guide you through the entire counselling process so you never feel lost.Our team helps you shortlist the right colleges, fill forms correctly and understand cutoffs and seat trends.We walk you through preference order, document preparation and all post-result steps.You also get personalised guidance based on your scores, career goals and course choices.Basically, we make sure your hard work in the exam actually converts into the best possible college.",
  },
  {
    question: "How do you support students who feel academically weak? Do you have systems in place to help them catch up and improve?",
    answer:
      "We work closely with students who feel they’re starting from behind.Our small batches and one-to-one mentorship help us identify exactly where they struggle.We give them extra support through foundation classes, personalised doubt sessions and step-by-step practice.Their progress is tracked weekly so we can adjust the plan and keep them improving.With the right guidance and consistent support, even the so-called weak students end up performing brilliantly.",
  },
  {
    question: "How are mock tests important?",
    answer:
      "Mock tests are crucial because they turn your preparation into real exam performance.They help you understand the actual pattern, difficulty level and time pressure of CUET, IPMAT and CLAT.With every mock, you learn how to manage time, avoid mistakes and build speed and accuracy. They also show your weak areas so we can fix them with targeted revision.Simply put, mocks are the closest rehearsal to the real exam and a major reason why toppers score high.",
  },
  {
    question: "Can I prepare for the CUET exam on my own without coaching?",
    answer:
      "Yes, you can prepare for CUET on your own, but self-study works only if you’re disciplined and know exactly what to study.CUET is highly competitive, and most students struggle with strategy, practice and consistency when preparing alone.At Lyfshilp Academy, we simplify the process with structured classes, mock tests, study plans and personalised mentorship.This helps you avoid confusion, save time and improve faster.Self-study is possible, but guided preparation gives you a far better chance of scoring high and getting your preferred college..",
  },
  {
    question: " How can I balance my board exam preparation along with CUET, IPMAT or CLAT preparation?",
    answer:
      "Balancing boards with entrance prep becomes easy when you follow the right structure.We help you create a timetable that aligns school topics with entrance concepts so your effort counts for both.Our classes focus on smart techniques, regular practice and quick revisions that don’t overload you.Weekly targets and doubt sessions keep you on track without disturbing your board studies.With proper planning and the right guidance, students comfortably manage both and score well in each..",
  },
  {
    question: "What is the right time to start preparing for CUET, IPMAT and CLAT??",
    answer:
      "The best time to start preparing for CUET, IPMAT and CLAT is from Class 11 or the beginning of Class 12.Starting early helps you build strong basics and avoid last-minute pressure.But even if you start late, a focused 6–8 month plan works well with the right guidance.At Lyfshilp Academy, we create personalised timelines based on when you join so you never feel behind.The goal is simple: start as early as you can, and prepare smartly from day one.",
  },
  {
    question: "How does Edumaniax help student?",
    answer:
      "Edumaniax helps students by building 21st-century skills like AI, finance , communication and leadership through hands-on learning, preparing them for future success",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Need Help?
          </h2>
          <p className="text-3xl md:text-4xl font-bold text-green-600 mt-2">
            Start First Here
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {faqs.map((item, idx) => (
            <div
              key={idx}
              className="bg-green-50 border border-green-100 rounded-lg px-6 py-4 cursor-pointer hover:bg-green-100 transition"
            >
              <div
                onClick={() => toggleFAQ(idx)}
                className="flex justify-between items-center"
              >
                <span className="text-gray-800 font-medium">
                  {item.question}
                </span>
                <span
                  className={`transition-transform duration-300 ${
                    openIndex === idx ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </div>

              {/* Answer */}
              {openIndex === idx && (
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
