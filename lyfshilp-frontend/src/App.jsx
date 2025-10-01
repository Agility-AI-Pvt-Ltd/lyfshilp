import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DailyUpdates from "./pages/DailyUpdate";
import TestSeries from "./pages/TestSeries";
import AboutUs from "./pages/AboutUs";
import Careers from "./pages/Careers";
import Olympiad from "./pages/Olympiad";

import Job1 from "./pages/Job1";
import Job2 from "./pages/Job2";
import Job3 from "./pages/Job3";
import Job4 from "./pages/Job4";

import Intern1 from "./pages/Intern1";
import Intern2 from "./pages/Intern2";
import Intern3 from "./pages/Intern3";

import Podcast from "./pages/Podcast";
import Internships from "./pages/Internships";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ExploreYoutubeSection from "./components/ExploreYoutubeSection";

import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        {/* Header (Navbar) */}
        <Header />

        {/* Main content */}
        <main className="flex-grow">
          {/* Page Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/testseries" element={<TestSeries />} />
            <Route path="/updates" element={<DailyUpdates />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/career" element={<Careers />} />
            <Route path="/career/job1" element={<Job1 />} /> 
            <Route path="/career/job2" element={<Job2 />} /> 
            <Route path="/career/job3" element={<Job3 />} /> 
            <Route path="/career/job4" element={<Job4 />} /> 
            <Route path="/career/frontend" element={<Intern1 />} /> 
            <Route path="/career/ui-ux" element={<Intern2 />} /> 
            <Route path="/career/marketing" element={<Intern3 />} />
            <Route path="/podcast" element={<Podcast/>}/>
            <Route path="/internships" element={<Internships/>}/>
            <Route path="/olympiad" element={<Olympiad/>}/>

          </Routes>
        </main>

        {/* ExploreYoutubeSection */}
        <ExploreYoutubeSection />

        {/* Footer */}
        <Footer />
      </div>
    </AuthProvider>
  );
}
