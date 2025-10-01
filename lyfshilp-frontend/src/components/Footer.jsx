import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiYoutube } from "react-icons/si";
import { Link } from "react-router-dom";

import Logo from "../assets/Lyfshilplogo.svg"; 

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white">
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
        
        {/* Brand Section */}
        <div>
          <a
            href="https://lyfshilpacademy.co.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 mb-4"
          >
            <img src={Logo} alt="Lyfshilp Logo" className="w-8 h-8" />
            <h2 className="text-lg font-semibold">Lyfshilp Academy</h2>
          </a>

          <p className="text-gray-200 text-sm leading-relaxed mb-6">
            Join Lyfshilp Academy and experience <br /> the future of education.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/LyfShilpAcademy/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center border border-white rounded-full hover:bg-white hover:text-green-800 transition"
            >
              <FaFacebookF size={14} />
            </a>
            <a
              href="https://www.instagram.com/lyfshilpacademy/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center border border-white rounded-full hover:bg-white hover:text-green-800 transition"
            >
              <FaInstagram size={14} />
            </a>
            <a
              href="https://x.com/agilityai564?t=VOuMBE1FriLj77VXi-P7Cw&s=08"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center border border-white rounded-full hover:bg-white hover:text-green-800 transition"
            >
              <FaXTwitter size={14} />
            </a>
            <a
              href="https://www.linkedin.com/company/lyfshilp-academy/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center border border-white rounded-full hover:bg-white hover:text-green-800 transition"
            >
              <FaLinkedinIn size={14} />
            </a>
            <a
              href="https://www.youtube.com/@LyfShilpAcademy"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center border border-white rounded-full hover:bg-white hover:text-green-800 transition"
            >
              <SiYoutube size={14} />
            </a>
          </div>
        </div>

{/* Navigate */}
<div>
  <h3 className="font-semibold mb-4">Navigate</h3>
  <ul className="space-y-2 text-gray-200 text-sm">
    <li><Link to="/" className="hover:text-white">Home</Link></li>
    <li><Link to="/about" className="hover:text-white">About Us</Link></li>
    <li><Link to="https://lyfshilpacademy.co.in/" target="_blank" className="hover:text-white">Exam Prep</Link></li>
    <li><Link to="/olympiad" className="hover:text-white">Olympiad</Link></li>
    <li><Link to="/career" className="hover:text-white">Career</Link></li>
    <li><Link to="/internships" className="hover:text-white">Internships</Link></li>
  </ul>
</div>


        {/* Company */}
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li><a href="/podcast" className="hover:text-white">Podcast</a></li>
            {/* <li><a href="https://lyfshilp.com/terms" target="_blank" rel="noopener noreferrer" className="hover:text-white">Terms & Conditions</a></li>
            <li><a href="https://lyfshilp.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-white">Privacy Policy</a></li> */}
          </ul>
        </div>

        {/* Partners */}
        <div>
          <h3 className="font-semibold mb-4">Partners</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li><a href="https://edumaniax.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Edumaniax</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Border & Copyright */}
      <div className="border-t border-gray-400/30 mt-6">
        <div className="container mx-auto px-6 py-4 text-center text-sm text-gray-300">
          © Copyright 2025, All Rights Reserved by Lyfshilp Academy
        </div>
      </div>
    </footer>
  );
}
