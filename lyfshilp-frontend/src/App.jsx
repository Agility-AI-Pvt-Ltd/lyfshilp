import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Courses from "./pages/Courses.jsx";
import CourseDetail from "./pages/CourseDetail.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DailyUpdates from "./pages/DailyUpdate.jsx";
import TestSeries from "./pages/TestSeries.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Careers from "./pages/Careers.jsx";
import ExamPrep from "./pages/ExamPrep.jsx";
import Olympiad from "./pages/Olympiad.jsx";
import TermsConditions from "./pages/TermsConditions.jsx";
import CuetPage from "./pages/CuetPage.jsx";
import ClatPage from "./pages/ClatPage.jsx";
import IpmatPage from "./pages/IpmatPage.jsx";
import NotFound from "./pages/NotFound.jsx";

import Job1 from "./pages/Job1.jsx";
import Job2 from "./pages/Job2.jsx";
import Job3 from "./pages/Job3.jsx";
import Job4 from "./pages/Job4.jsx";

import Intern1 from "./pages/Intern1.jsx";
import Intern2 from "./pages/Intern2.jsx";
import Intern3 from "./pages/Intern3.jsx";

import Financepage from "./pages/Financepage.jsx";
import Aipage from "./pages/Aipage.jsx";
import Employabilitypage from "./pages/Employabilitypage.jsx";
import Entrepreneurshippage from "./pages/Entrepreneurshippage.jsx";
import Workshop from "./pages/Workshop.jsx";

import Podcast from "./pages/Podcast.jsx";
import Internships from "./pages/Internships.jsx";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";


import { AuthProvider } from "./contexts/AuthContext.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

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
            <Route path="*" element={<NotFound />} />
            
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
