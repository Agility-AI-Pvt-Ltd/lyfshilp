// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center pt-24 pb-16 bg-gray-50 text-center px-4">
      <h1 className="text-6xl font-bold text-green-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-6">
        Looking for something else? Go back to the home page.
      </p>
      <Link
        to="/"
        className="px-5 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
      >
        Go to Home Page
      </Link>
    </div>
  );
}
