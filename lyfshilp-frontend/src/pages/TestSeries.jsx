import { useEffect, useState } from "react";
import api from "../api/axios";

export default function TestSeries() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/testseries")
      .then((res) => setTests(res.data || [])) // ✅ backend returns array
      .catch(() => setTests([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-6 text-center">Loading test series...</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Test Series</h1>

      {tests.length === 0 ? (
        <p className="text-center text-gray-600">No test series available.</p>
      ) : (
        <ul className="space-y-4">
          {tests.map((t) => (
            <li
              key={t.id}
              className="p-4 border rounded-lg shadow hover:shadow-md transition bg-white"
            >
              <h3 className="text-lg font-semibold">{t.title}</h3>
              <p className="text-gray-700 mt-1">{t.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                <span className="font-medium">{t.totalTests}</span> tests |{" "}
                {new Date(t.date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
