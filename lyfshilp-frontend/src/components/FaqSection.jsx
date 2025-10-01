import { useState } from "react";

const faqs = [
  {
    question: "Why should I prepare for entrance exams after class 12?",
    answer:
      "They help you get admission into top colleges and universities on merit",
  },
  {
    question: "When should I start preparing?",
    answer:
      "Ideally from class 11, but 6-8 months of focused study is enough",
  },
  {
    question: "Are board exam marks important?",
    answer:
      "Yes, minimum eligibility (50-60%) is required along with the entrance exam.",
  },
  {
    question: "Do I need coaching for CUET, IPMAT and CLAT?",
    answer:
      "Yes, coaching gives structures, strategies and expert guidance",
  },
  {
    question: "Why are mock test important?",
    answer:
      "They build speed, accuracy and confidance for the real exams",
  },
  {
    question: "How does Lyfshilp Academy help us in preparation of competitive exams?",
    answer:
      "With Expert faculty, small batches, study material, mocks and full admission support.",
  },
  {
    question: "How does Edumaniax help student?",
    answer:
      "Edumaniax helps students by building 21st-century skills like AI, finance , communication and leadership through hands-on learning, preparing them for future success",
  },
  {
    question: "How can I balance board and entrance preparation?",
    answer:
      "By following a timetable and practising smart study daily.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-white">
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
