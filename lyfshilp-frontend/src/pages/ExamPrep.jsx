import { useNavigate } from "react-router-dom";

export default function ExamPrep() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <section className="bg-[#FFF8EE] min-h-screen flex flex-col items-center px-4 sm:px-6 md:px-10 pt-20 md:pt-22 pb-10">
      {/* 🌟 Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 sm:mb-10 text-center leading-tight">
        Choose Your Exam Preparation Path
      </h1>

      {/* 📚 Exam Buttons */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 w-full max-w-3xl justify-center mb-12">
        {["CUET", "CLAT", "IPMAT"].map((exam, i) => (
          <button
            key={i}
            onClick={() => handleNavigate(`/${exam.toLowerCase()}`)}
            className="bg-green-600 text-white py-3 sm:py-4 px-8 sm:px-10 rounded-full text-base sm:text-lg font-medium hover:bg-green-700 transition w-full sm:w-auto"
          >
            {exam}
          </button>
        ))}
      </div>

      {/* 🏆 Students with Success */}
<div className="w-full max-w-6xl text-center mb-20 px-4">
  <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-10">
    Our Students with <span className="text-green-600">Success</span>
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
    {[
      {
        name: "Divy Singh",
        exam: "BBA",
        institute: "Delhi Technical University",
        image: "/images/Divy.png",
      },
      {
        name: "Khushi Chaudhry",
        exam: "B.Sc Statistics",
        institute: "Hindu College, DU",
        image: "/images/Khushi.png",
      },
      {
        name: "Aishani Bhargavi",
        exam: "B.A. (H) Economics",
        institute: "VIPS, IP University",
        image: "/images/Aishani.png",
      },
      {
        name: "Sukrit Sharma",
        exam: "BBA",
        institute: "Maharaja Surajmal Institute of Technology",
        image: "/images/Sukrit.png",
      },
      {
        name: "Manvi Malhotra",
        exam: "B.A. Liberal Arts (Psychology)",
        institute: "University Campus, IP University",
        image: "/images/Manvi.png",
      },
      {
        name: "Aadya Singh",
        exam: "B.Sc HHA",
        institute: "Indian Institute of Hotel Management, Mumbai",
        image: "/images/Aadya.png",
      },
      {
        name: "Samriddhi Vadera",
        exam: "Law, IPM",
        institute: "NALSAR Hyderabad, Symbiosis, Manipal",
        image: "/images/Samriddhi.png",
      },
      {
        name: "Trishaan Pandit",
        exam: "IPM",
        institute: "IIM Amritsar, IIM Sirmaur, NALSAR Hyderabad, NMIMS Mumbai",
        image: "/images/Trishaan.png",
      },
      {
        name: "Mokshad Garg",
        exam: "B.Sc HHA",
        institute: "Indian Institute of Hotel Management, Pusa Road",
        image: "/images/Mokshad.png",
      },
    ].map((student, index) => (
      <div
        key={index}
        className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-between hover:shadow-xl transition duration-300"
      >
        <img
          src={student.image}
          alt={student.name}
          className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full mb-4 border-4 border-green-600"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {student.name}
          </h3>
          <p className="text-green-600 font-sans text-sm sm:text-base">
            {student.exam}
          </p>
          <p className="text-green-600 font-bold text-sm sm:text-base mt-1 leading-snug">
            {student.institute}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>


      {/* 🎬 Testimonials Section (YouTube Shorts) */}
      <div className="w-full max-w-6xl text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8">
          Hear from Our <span className="text-green-600">Students</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-4">
          {[
            "https://www.youtube.com/embed/cbx0KC_Naqg",
            "https://www.youtube.com/embed/xTsXWKQuuTU",
            "https://www.youtube.com/embed/GWhFbrO1x0g",
          ].map((videoUrl, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-300 bg-black aspect-[9/16]"
            >
              <iframe
                className="w-full h-full"
                src={`${videoUrl}?rel=0&modestbranding=1`}
                title={`Student Testimonial ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
