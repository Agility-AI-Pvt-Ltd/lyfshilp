// src/pages/Courses.jsx
import { useEffect, useState } from "react";
import api from "../api/axios.js";
import CourseCard from "../components/CourseCard.jsx"; // ✅ import card

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/courses")
      .then((res) => {
        setCourses(res.data.data || []);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setCourses([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6 text-center">Loading courses...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Available Courses
      </h2>

      {courses.length === 0 ? (
        <p className="text-center">No courses available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map((c) => (
            <CourseCard key={c.id} course={c} />   
          ))}
        </div>
      )}
    </div>
  );
}
