// src/components/CourseCard.jsx
import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <article className="p-6 border rounded-xl shadow hover:shadow-lg transition bg-white">
      {/* Thumbnail */}
      <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mb-4">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>

      {/* Course Title */}
      <h3 className="font-semibold text-lg mb-2">
        <Link
          to={`/courses/${course.id}`}
          className="hover:underline text-blue-600"
        >
          {course.title}
        </Link>
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
        {course.description}
      </p>

      {/* Instructor */}
      <p className="text-xs text-gray-500 mb-4">
        Instructor: <span className="font-medium">{course.instructor}</span>
      </p>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <Link
          to={`/courses/${course.id}`}
          className="px-3 py-1 rounded-lg border text-sm text-blue-600 hover:bg-blue-50"
        >
          View
        </Link>
        <button className="px-3 py-1 rounded-lg bg-orange-500 text-white text-sm hover:bg-orange-600">
          Enroll
        </button>
      </div>
    </article>
  );
}
