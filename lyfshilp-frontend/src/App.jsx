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
import ExamPrep from "./pages/ExamPrep.jsx";
import Olympiad from "./pages/Olympiad";
import TermsConditions from "./pages/TermsConditions";
import CuetPage from "./pages/CuetPage";
import ClatPage from "./pages/ClatPage";
import IpmatPage from "./pages/IpmatPage";

import Job1 from "./pages/Job1";
import Job2 from "./pages/Job2";
import Job3 from "./pages/Job3";
import Job4 from "./pages/Job4";

import Intern1 from "./pages/Intern1";
import Intern2 from "./pages/Intern2";
import Intern3 from "./pages/Intern3";

import Financepage from "./pages/Financepage";
import Aipage from "./pages/Aipage";
import Employabilitypage from "./pages/Employabilitypage";
import Entrepreneurshippage from "./pages/Entrepreneurshippage";
import Workshop from "./pages/Workshop.jsx";

import Podcast from "./pages/Podcast";
import Internships from "./pages/Internships";

import Header from "./components/Header";
import Footer from "./components/Footer";


import { AuthProvider } from "./contexts/AuthContext";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

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
            <Route path="/workshop" element={<Workshop />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/career" element={<Careers />} />
            <Route path="/career/job1" element={<Job1 />} /> 
            <Route path="/career/job2" element={<Job2 />} /> 
            <Route path="/career/job3" element={<Job3 />} /> 
            <Route path="/career/job4" element={<Job4 />} /> 
            <Route path="/career/frontend" element={<Intern1 />} /> 
            <Route path="/career/ui-ux" element={<Intern2 />} /> 
            <Route path="/career/marketing" element={<Intern3 />} />
            <Route path="/podcast" element={<Podcast />} />
            <Route path="/internships" element={<Internships />} />
            <Route path="/exam-prep" element={<ExamPrep />} />
            <Route path="/olympiad" element={<Olympiad />} />
            <Route path="/termsconditions" element={<TermsConditions />} />
            <Route path="/cuet" element={<CuetPage />} />
            <Route path="/clat" element={<ClatPage />} />
            <Route path="/ipmat" element={<IpmatPage />} />
            <Route path="/olympiad/finance" element={<Financepage />} />
            <Route path="/olympiad/ai" element={<Aipage />} />
            <Route path="/olympiad/employability" element={<Employabilitypage />} />
            <Route path="/olympiad/entrepreneurship" element={<Entrepreneurshippage />} />
            
            <Route 
                path="/dashboard" 
                element={
                <ProtectedRoute>
                <Dashboard />
                </ProtectedRoute>} />


            {/* Admin Protected Route */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </AuthProvider>
  );
}
