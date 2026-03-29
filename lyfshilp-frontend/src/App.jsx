import { Routes, Route, useLocation } from "react-router-dom";

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
import FreeContent from "./pages/FreeContent.jsx";

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
import SummerProgramme from "./pages/SummerProgramme.jsx";
import ForSchools from "./pages/ForSchools.jsx";
import ForColleges from "./pages/ForColleges.jsx";
import CorporateAI from "./pages/CorporateAI.jsx";
import Podcasts from "./pages/Podcasts.jsx";

import Podcast from "./pages/Podcast.jsx";
import Internships from "./pages/Internships.jsx";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import { AuthProvider } from "./contexts/AuthContext.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ContactsForm from "./components/ContactsForm.jsx";

import GoogleAnalyticsTracker from "./utils/GoogleAnalyticsTracker.jsx";
import MetaPixelTracker from "./utils/MetaPixelTracker.jsx";
import HomeNew from "./newpages/HomeNew.jsx";

function BreadcrumbSchema() {
  const location = useLocation();
  const path = location.pathname || "/";

  // Home / landing pages: no breadcrumb schema
  if (path === "/" || path === "/home") return null;

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const segments = path.split("/").filter(Boolean);

  const formatSegment = (seg) => {
    const spaced = seg
      .replace(/[-_]/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .trim();
    return spaced
      .split(" ")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Lyfshilp Academy",
      item: origin ? `${origin}/` : "/",
    },
    ...segments.map((seg, i) => {
      const position = i + 2;
      const itemPath = segments.slice(0, i + 1).join("/");
      return {
        "@type": "ListItem",
        position,
        name: formatSegment(seg),
        item: origin ? `${origin}/${itemPath}` : `/${itemPath}`,
      };
    }),
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbJsonLd),
      }}
    />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        {/* Header (Navbar) */}
        <Header />

        {/* Main content */}
        <main className="flex-grow">
          <BreadcrumbSchema />
          <GoogleAnalyticsTracker />
          {/* Meta Pixel PageView Tracker */}
          <MetaPixelTracker />

          {/* Page Routes */}
          <Routes>
            <Route path="/" element={<HomeNew />} />

            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/testseries" element={<TestSeries />} />
            <Route path="/updates" element={<DailyUpdates />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/workshop" element={<Workshop />} />
            <Route path="/summer-programme" element={<SummerProgramme />} />
            <Route path="/for-schools" element={<ForSchools />} />
            <Route path="/for-colleges" element={<ForColleges />} />
            <Route path="/corporate-ai-upskilling" element={<CorporateAI />} />
            <Route path="/podcasts" element={<Podcast />} />
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
            <Route path="/futureX" element={<Olympiad />} />
            <Route path="/futurex-fellowship" element={<Olympiad />} />
            <Route path="/termsconditions" element={<TermsConditions />} />
            <Route path="/cuet" element={<CuetPage />} />
            <Route path="/clat" element={<ClatPage />} />
            <Route path="/ipmat" element={<IpmatPage />} />
            <Route path="/futureX/finance" element={<Financepage />} />
            <Route path="/futureX/ai" element={<Aipage />} />
            <Route
              path="/futureX/employability"
              element={<Employabilitypage />}
            />
            <Route
              path="/futureX/entrepreneurship"
              element={<Entrepreneurshippage />}
            />
            <Route path="/contact" element={<ContactsForm />} />
            <Route path="/free-content" element={<FreeContent />} />
            <Route path="*" element={<NotFound />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

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
