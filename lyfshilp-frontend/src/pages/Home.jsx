import { useEffect, useState } from "react";
import api from "../api/axios";

import Hero from "../components/Hero";
import Founder from "../components/Founder";
import VideoMap from "../components/VideoMap";
import CourseCard from "../components/CourseCard";
import Exams from "../components/Exams";
import DailyUpdate from "../pages/DailyUpdate";
import ExamStats from "../components/ExamStats";
import OfferingSection from "../components/OfferingSection";
import FounderIntro from "../components/FounderIntro";
import StepsSection from "../components/StepsSection";
import EdumaniaxBoxSection from "../components/EdumaniaxBoxSection";
import Testimonials from "../components/Testimonials";
import VisionMission from "../components/VisionMission";
import FaqSection from "../components/FaqSection";
import ExploreYoutubeSection from "../components/ExploreYoutubeSection";
import EdumaniaxVideo from "../components/EdumaniaxVideo";
export default function Home() {
  const [courses, setCourses] = useState([]);
  const [testSeries, setTestSeries] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingTestSeries, setLoadingTestSeries] = useState(true);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses");
        setCourses(res.data.data || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setCourses([]);
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, []);

  // Fetch test series
  useEffect(() => {
    const fetchTestSeries = async () => {
      try {
        const res = await api.get("/testseries");
        setTestSeries(res.data || []);
      } catch (err) {
        console.error("Error fetching test series:", err);
        setTestSeries([]);
      } finally {
        setLoadingTestSeries(false);
      }
    };

    fetchTestSeries();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <Hero />

      <ExamStats />
      <OfferingSection />
      <FounderIntro />
      <EdumaniaxVideo />
      <StepsSection />
      <EdumaniaxBoxSection />
      <Testimonials />

      {/* 🌿 Vision & Mission Section */}
      <VisionMission />

      <FaqSection />

      {/* Courses Section
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-5">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Our Courses
          </h2>
          <p className="text-center text-gray-600 mt-2">
            Choose from a wide range of competitive exam courses
          </p>

          {loadingCourses ? (
            <p className="text-center mt-6">Loading courses...</p>
          ) : (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))
              ) : (
                <p className="text-center col-span-3 text-gray-600">
                  No courses available.
                </p>
              )}
            </div>
          )}
        </div>
      </section> */}

      {/* Test Series Section
      <section className="py-16 bg-white">
        <div className="container mx-auto px-5">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Test Series
          </h2>
          <p className="text-center text-gray-600 mt-2">
            Practice with our latest test series
          </p>

          {loadingTestSeries ? (
            <p className="text-center mt-6">Loading test series...</p>
          ) : (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {testSeries.length > 0 ? (
                testSeries.map((test) => (
                  <div
                    key={test.id}
                    className="p-6 bg-gray-100 rounded-xl shadow hover:shadow-lg transition"
                  >
                    <h3 className="text-xl font-semibold text-gray-800">
                      {test.title}
                    </h3>
                    <p className="text-gray-600 mt-2">{test.description}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Date: {test.date}
                    </p>
                    <p className="text-sm text-gray-500">
                      Total Tests: {test.total_tests}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center col-span-3 text-gray-600">
                  No test series available.
                </p>
              )}
            </div>
          )}
        </div>
      </section> */}

      {/* Exams Section
      <Exams /> */}

      {/* Founder Section
      <Founder /> */}

      {/* Daily Updates Section (after Founder)
      <section className="py-16 bg-gray-50">
        <DailyUpdate />
      </section> */}

      {/* Video + Map Section
      <VideoMap /> */}
    </>
  );
}
