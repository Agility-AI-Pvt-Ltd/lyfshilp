import { useEffect, useState } from "react";
import api from "../api/axios";
import DailyUpdateCard from "../components/DailyUpdateCard";

export default function DailyUpdate() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    api
      .get("/updates")
      .then((res) => {
        console.log("API Response:", res.data);
        setUpdates(res.data);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setUpdates([]);
      });
  }, []);

  return (
    <div className="py-6 px-4 bg-gray-50 min-h-screen">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Daily Updates
      </h1>

      {updates.length === 0 ? (
        <p className="text-gray-600 text-center">No updates available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {updates.map((u) => (
            <DailyUpdateCard key={u.id} update={u} />
          ))}
        </div>
      )}
    </div>
  );
}
