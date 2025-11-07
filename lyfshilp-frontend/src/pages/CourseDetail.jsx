// src/pages/CourseDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios.js";

export default function CourseDetail() {
  const { id } = useParams(); // extract course id from route
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch course detail on mount
  useEffect(() => {
    api
      .get(`/courses/${id}`)
      .then((res) => setCourse(res.data.data)) // backend sends { data: {...} }
      .catch((err) => {
        console.error("Error fetching course detail:", err);
        setCourse(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Loading state
  if (loading) return <p className="p-6 text-center">Loading course...</p>;

  // If course not found
  if (!course) return <p className="p-6 text-center">Course not found</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Course Title */}
      <h2 className="text-3xl font-bold mb-4 text-center">{course.title}</h2>

      {/* Course Description */}
      <p className="text-gray-700 mb-4">{course.description}</p>

      {/* Instructor Info */}
      <p className="text-sm text-gray-500 mb-6">
        Instructor: <span className="font-medium">{course.instructor}</span>
      </p>

      {/* Quizzes Section */}
      {course.tests && course.tests.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3">Quizzes</h3>
          <ul className="space-y-2">
            {course.tests.map((t) => (
              <li
                key={t.id}
                className="p-3 border rounded-lg shadow-sm bg-gray-50"
              >
                <p className="font-medium">{t.title}</p>
                <p className="text-sm text-gray-600">
                  Max Score: {t.maxScore}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
