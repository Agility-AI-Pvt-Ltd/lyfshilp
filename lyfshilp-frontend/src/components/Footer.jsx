import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiYoutube } from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../assets/Lyfshilplogo.svg";

export default function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg,#071a11,#030c07)",
        borderTop: "1px solid rgba(0,200,150,.1)",
      }}
      className="text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-12">
          <div className="flex flex-col sm:flex-row items-start gap-16 w-full sm:w-auto">
            <div className="flex flex-col items-start text-left">
              <a
                href="https://lyfshilpacademy.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 mb-4"
              >
                <img src={Logo} alt="Lyfshilp Logo" className="w-8 h-8" />
                <h2 className="text-lg font-semibold">Lyfshilp Academy</h2>
              </a>

              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "rgba(255,255,255,.55)" }}
              >
                Join Lyfshilp Academy and experience <br /> the future of education.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.facebook.com/LyfShilpAcademy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full transition"
                  style={{ border: "1px solid rgba(0,200,150,.35)" }}
                >
                  <FaFacebookF size={14} />
                </a>
                <a
                  href="https://www.instagram.com/lyfshilpacademy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full transition"
                  style={{ border: "1px solid rgba(0,200,150,.35)" }}
                >
                  <FaInstagram size={14} />
                </a>
                <a
                  href="https://x.com/agilityai564?t=VOuMBE1FriLj77VXi-P7Cw&s=08"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full transition"
                  style={{ border: "1px solid rgba(0,200,150,.35)" }}
                >
                  <FaXTwitter size={14} />
                </a>
                <a
                  href="https://www.linkedin.com/company/lyfshilp-academy/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full transition"
                  style={{ border: "1px solid rgba(0,200,150,.35)" }}
                >
                  <FaLinkedinIn size={14} />
                </a>
                <a
                  href="https://www.youtube.com/@LyfShilpAcademy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full transition"
                  style={{ border: "1px solid rgba(0,200,150,.35)" }}
                >
                  <SiYoutube size={14} />
                </a>
                <a
                  href="https://wa.me/917042671115"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full transition"
                  style={{ border: "1px solid rgba(0,200,150,.35)" }}
                >
                  <FaWhatsapp size={14} />
                </a>
              </div>
            </div>

            <div className="text-pretty sm:ml-24">
              <h3 className="font-semibold mb-4 text-lg">Navigate</h3>

              <ul
                className="grid grid-cols-3 sm:grid-cols-3 gap-y-3 gap-x-6 text-sm"
                style={{ color: "rgba(255,255,255,.62)" }}
              >
                <li><Link to="/" className="hover:text-white">Home</Link></li>
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/exam-prep" className="hover:text-white">Exam Prep</Link></li>
                <li><Link to="/futureX" className="hover:text-white">FutureX</Link></li>
                <li><Link to="/workshop" className="hover:text-white">Workshops</Link></li>
                <li><Link to="/career" className="hover:text-white">Career</Link></li>
                <li><Link to="/internships" className="hover:text-white">Internships</Link></li>
                <li><Link to="/podcast" className="hover:text-white">Podcast</Link></li>
                <li>
                  <a
                    href="https://edumaniax.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    Edumaniax
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.lyfshilpacademy.in/privacypolicy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <Link to="/termsconditions" className="hover:text-white">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(0,200,150,.07)",
          padding: "28px 24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "rgba(255,255,255,.22)",
            fontFamily: "'DM Sans',sans-serif",
            fontSize: ".73rem",
          }}
        >
          © 2025 International FutureX Fellowship · Powered by Lyfshilp Academy
          &amp; Agility AI · Global Standards | International Impact
        </p>
        <div
          className="text-center text-xs sm:text-sm mt-2"
          style={{ color: "rgba(255,255,255,.32)" }}
        >
          © Copyright 2025, All Rights Reserved by Lyfshilp Academy
        </div>
      </div>
    </footer>
  );
}
