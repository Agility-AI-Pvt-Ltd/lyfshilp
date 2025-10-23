import { useNavigate } from "react-router-dom";

export default function ExamPrep() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-[#FFF8EE] px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
        Choose Your Exam Preparation Path
      </h1>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-3xl justify-center">
        <button
          onClick={() => handleNavigate("/cuet")}
          className="bg-green-600 text-white py-4 px-10 rounded-full text-lg font-medium hover:bg-green-700 transition w-full md:w-auto"
        >
          CUET
        </button>

        <button
          onClick={() => handleNavigate("/clat")}
          className="bg-green-600 text-white py-4 px-10 rounded-full text-lg font-medium hover:bg-green-700 transition w-full md:w-auto"
        >
          CLAT
        </button>

        <button
          onClick={() => handleNavigate("/ipmat")}
          className="bg-green-600 text-white py-4 px-10 rounded-full text-lg font-medium hover:bg-green-700 transition w-full md:w-auto"
        >
          IPMAT
        </button>
      </div>
    </section>
  );
}
