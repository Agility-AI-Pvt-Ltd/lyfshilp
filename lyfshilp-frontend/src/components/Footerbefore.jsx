import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export default function Footerbefore() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* About */}
        <div>
          <h3 className="text-2xl font-bold text-white">Lyfshilp Academy</h3>
          <p className="mt-4 text-sm leading-relaxed text-gray-400">
            Empowering students with the right guidance and resources 
            for competitive exams and career success.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-amber-400 mb-4">Quick Links</h4>
          <ul className="space-y-3">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/courses" className="hover:text-white transition">Courses</a></li>
            <li><a href="/daily" className="hover:text-white transition">Daily Updates</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-amber-400 mb-4">Contact Us</h4>
          <p className="mb-2">📍 Delhi, India</p>
          <p className="mb-2">📞 +91 98765 43210</p>
          <p>✉️ info@lyfshilpacademy.com</p>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold text-amber-400 mb-4">Follow Us</h4>
          <div className="flex gap-6 text-2xl">
            <a href="#" className="hover:text-blue-500 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-pink-500 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-400 transition"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-red-500 transition"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8">
        <p className="text-center text-sm text-gray-400 py-6">
          © {new Date().getFullYear()} Lyfshilp Academy. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
