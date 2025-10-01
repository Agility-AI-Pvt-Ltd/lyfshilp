export default function Exams() {
  const exams = [
    { title: "CUET UG Mathematics" },
    { title: "UPSC CSE Prelims" },
    { title: "SSC CGL" },
    { title: "Banking Exams" },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-5">
        <h2 className="text-3xl font-bold text-center text-gray-800">Trending Exams</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {exams.map((exam, i) => (
            <div
              key={i}
              className="w-72 bg-white rounded-lg shadow p-5 hover:shadow-lg transition"
            >
              <p className="font-semibold text-gray-700">{exam.title}</p>
              <p className="mt-2 text-sm text-gray-600">
                Practice with expert-designed mock tests and analysis.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
