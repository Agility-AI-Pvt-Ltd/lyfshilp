import { useState, useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa"; // ✅ React Icon used like in Footer
import api from "../api/axios.js";

import teacherIcon from "../assets/workshopimg/teacherIcon.svg";
import studentIcon from "../assets/workshopimg/studentIcon.svg";
import corporateIcon from "../assets/workshopimg/corporateIcon.svg";
import studySmartIcon from "../assets/workshopimg/Micon2.svg";
import communicationIcon from "../assets/workshopimg/Micon3.svg";
import creativityIcon from "../assets/workshopimg/Micon4.svg";
import boyLeft from "../assets/workshopimg/boyleft.svg";
import boyRight from "../assets/workshopimg/boyright.svg";
import clickArrow from "../assets/workshopimg/clickArrow.svg";
import inculcationIcon from "../assets/workshopimg/Micon1.svg";
import logicIcon from "../assets/workshopimg/Micon5.svg";
import gamingIcon from "../assets/workshopimg/Micon6.svg";


import empowerMan1 from "../assets/workshopimg/empowerman1.svg";
import empowerMan2 from "../assets/workshopimg/empowerman2.svg";
import empowerMan3 from "../assets/workshopimg/empowerman3.svg";

// 📸 Gallery images
import workshopMain from "/images/workshopmain7.svg";
import img1 from "/images/workshopMain3.svg";
import img2 from "/images/workshopmain2.svg";
import img3 from "/images/workshopmain4.svg";
import img4 from "/images/workshopMain.svg";
import img5 from "/images/workshopmain1.svg";
import img6 from "/images/workshopmain6.svg";
import img7 from "/images/workshopmain5.svg";
import SchoolLogo from "../components/SchoolLogo.jsx";

//career Fair 
import CareerFairSection from "../components/CareerFairSection.jsx";

export default function Workshop() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/918595034205", "_blank");
  };

  const images = [workshopMain, img1, img2, img3, img4, img5, img6, img7];
  const [expanded, setExpanded] = useState(false);
  const [mainImage, setMainImage] = useState(workshopMain);

  // 🎯 Intersection Observer for Trending Topics
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [showFloatingButtons, setShowFloatingButtons] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // 👇 Hide floating buttons when form visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFloatingButtons(!entry.isIntersecting);
      },
      { threshold: 0.3 }
    );
    if (formRef.current) observer.observe(formRef.current);
    return () => {
      if (formRef.current) observer.unobserve(formRef.current);
    };
  }, []);

  const handleImageClick = (img) => {
    if (expanded) setMainImage(img);
  };

  // 🧾 Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    organization: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ success: null, message: "" });

  // ✅ Regex-based Validation
  const validateForm = () => {
    const nameRegex = /^[A-Za-z\s]{2,50}$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const orgRegex = /^[A-Za-z0-9\s&.,'-]{2,100}$/;
    const msgRegex = /^.{0,500}$/;

    if (!nameRegex.test(formData.name.trim())) return "Please enter a valid full name.";
    if (!phoneRegex.test(formData.phone.trim())) return "Please enter a valid 10-digit phone number.";
    if (!emailRegex.test(formData.email.trim())) return "Please enter a valid email address.";
    if (formData.organization && !orgRegex.test(formData.organization.trim()))
      return "Organization name contains invalid characters.";
    if (!msgRegex.test(formData.message.trim())) return "Message must be under 500 characters.";
    return null;
  };

  // ✏️ Handle input & sanitize
  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitized = value.replace(/[<>$]/g, "");
    setFormData({ ...formData, [name]: sanitized });
  };

  // 📡 Submit to Backend (with validation)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const error = validateForm();
    if (error) {
      setStatus({ success: false, message: error });
      return;
    }

    setLoading(true);
    setStatus({ success: null, message: "" });

    try {
      await api.post("/workshop/register", {
        ...formData,
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim().toLowerCase(),
        organization: formData.organization.trim(),
        message: formData.message.trim(),
      });

      setStatus({ success: true, message: "Workshop request submitted successfully!" });
      setFormData({ name: "", phone: "", email: "", organization: "", message: "" });

      setTimeout(() => setStatus({ success: null, message: "" }), 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus({
        success: false,
        message: error.response?.data?.message || "Failed to submit form. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans mt-14 sm:mt-18">
        {/* 🌟 Hero Section */}
      <section className="bg-[#FFF8EE] text-center px-4 py-10 sm:py-8">
        <h1 className="text-2xl sm:text-6xl font-bold text-gray-900">
          Workshops that Inspire
        </h1>
        <p className="mt-2 text-green-600 text-lg sm:text-2xl font-semibold">
          Curiosity, Creativity and Change
        </p>

        {/* 🖼️ Main Image Section */}
        <div className="bg-[#FFF8EE] mt-10 flex justify-center items-center relative px-2">
          {!expanded && (
            <div className="absolute left-[8%] sm:left-[12%] md:left-[18%] top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
              <p className="text-gray-700 text-sm sm:text-base font-semibold mb-2">
                Click & View
              </p>
              <img
                src={clickArrow}
                alt="Click arrow"
                className="w-10 sm:w-14 md:w-16 animate-pulse"
              />
            </div>
          )}

          <div
            onClick={() => setExpanded(!expanded)}
            className="relative cursor-pointer"
          >
            {!expanded && (
              <>
                <img
                  src={img5}
                  alt=""
                  className="absolute w-56 sm:w-64 md:w-72 h-56 sm:h-64 md:h-72 object-cover rounded-3xl shadow-lg opacity-40 blur-[2px] -rotate-12 -translate-x-6 translate-y-6 z-0"
                />
                <img
                  src={img4}
                  alt=""
                  className="absolute w-56 sm:w-64 md:w-72 h-56 sm:h-64 md:h-72 object-cover rounded-3xl shadow-lg opacity-50 blur-[1.5px] rotate-8 translate-x-10 -translate-y-6 z-0"
                />
                <img
                  src={img3}
                  alt=""
                  className="absolute w-56 sm:w-64 md:w-72 h-56 sm:h-64 md:h-72 object-cover rounded-3xl shadow-lg opacity-60 blur-[1px] -rotate-6 -translate-x-5 -translate-y-3 z-10"
                />
              </>
            )}
            <img
              src={mainImage}
              alt="Workshop main"
              className="relative w-64 sm:w-72 md:w-80 h-64 sm:h-72 md:h-80 object-cover rounded-3xl shadow-2xl z-30 transition-all duration-500"
            />
          </div>
        </div>

        {expanded && (
          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4 transition-all duration-500">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Workshop ${i + 1}`}
                onClick={() => handleImageClick(img)}
                className={`w-20 sm:w-24 md:w-28 h-20 sm:h-24 md:h-28 object-cover rounded-xl cursor-pointer border-4 transition-all duration-300 hover:scale-110 ${
                  mainImage === img
                    ? "border-green-600 scale-110 shadow-lg"
                    : "border-gray-200"
                }`}
              />
            ))}
          </div>
        )}
      </section>

      <div> <CareerFairSection /> </div> 
      <div> <SchoolLogo/> </div> 

      {/* 🌱 Empower Section */}
      <section className="bg-[#FFF8EE] py-10 px-4 sm:px-8 flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-12 relative overflow-hidden">
        {/* Left Side Text */}
        <div className="max-w-lg">
          <h2 className="text-xl sm:text-3xl font-bold text-gray-900">
            Workshops That <span className="text-green-600">Empower</span> Every Learner
          </h2>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            Teacher, Student or Corporate we design growth-driven learning experiences for all.
          </p>

          <div className="mt-5 space-y-3">
            {[
              { icon: teacherIcon, text: "Teachers Capacity Building" },
              { icon: studentIcon, text: "Student Training and Learning" },
              { icon: corporateIcon, text: "Corporate Capacity Building" },
            ].map(({ icon, text }, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <img src={icon} alt={text} className="h-7 w-7 sm:h-8 sm:w-8" />
                <span className="font-medium text-gray-800 text-sm sm:text-base">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Rotating Image Stack */}
        <div className="relative w-[280px] sm:w-[340px] h-[220px] sm:h-[260px] flex items-center justify-center">
          <img
            src={empowerMan1}
            alt="Empower 1"
            className="absolute w-full h-full object-cover rounded-2xl shadow-xl transition-all duration-1000 ease-in-out animate-rotateImage1"
          />
          <img
            src={empowerMan2}
            alt="Empower 2"
            className="absolute w-full h-full object-cover rounded-2xl shadow-xl transition-all duration-1000 ease-in-out animate-rotateImage2"
          />
          <img
            src={empowerMan3}
            alt="Empower 3"
            className="absolute w-full h-full object-cover rounded-2xl shadow-xl transition-all duration-1000 ease-in-out animate-rotateImage3"
          />
        </div>
      </section>

{/* 💡 Trending Topics — Infinite Right-to-Left Scroll */}
<section className="py-10 px-4 sm:px-8 bg-white">
 <h3 className="text-center text-xl sm:text-4xl font-bold text-gray-900 mb-10">
  Most Trending Topics from <span className="text-green-700">Workshops</span>
</h3>

  <div className="overflow-hidden relative">
    <div className="flex animate-scrollLoop hover:[animation-play-state:paused] space-x-6 w-max">
      {/* 🔁 Repeat twice for seamless infinite scroll */}
      {[...Array(2)].map((_, loopIndex) => (
        <div key={loopIndex} className="flex space-x-6">
          {[
            {
              icon: inculcationIcon,
              bgColor: "bg-[#D8F3DC]",
              text: "Inculcation of AI to improve student learning outcome",
            },
            {
              icon: studySmartIcon,
              bgColor: "bg-[#FFF3B0]",
              text: "Study Smart to excel in exam",
            },
            {
              icon: communicationIcon,
              bgColor: "bg-[#FFE5B4]",
              text: "Communication workshop on Conflict Resolution",
            },
            {
              icon: creativityIcon,
              bgColor: "bg-[#D8F3DC]",
              text: "AI-User Capacity Building",
            },
            {
              icon: inculcationIcon,
              bgColor: "bg-[#FFE5B4]",
              text: "Career Exploration in the New Age",
            },
            {
              icon: logicIcon,
              bgColor: "bg-[#D8F3DC]",
              text: "Future Skills for the AI Age",
            },
            {
              icon: studySmartIcon,
              bgColor: "bg-[#FFF3B0]",
              text: "Smart Preparation for CUET, CLAT & IPMAT",
            },            {
              icon: creativityIcon,
              bgColor: "bg-[#FFE5B4]",
              text: "Learn How to Learn: Scientific Study Techniques",
            },            {
              icon: communicationIcon,
              bgColor: "bg-[#D8F3DC]",
              text: "Communication, Collaboration & Conflict Resolution",
            },            {
              icon: logicIcon,
              bgColor: "bg-[#FFF3B0]",
              text: "AI in Education: From Tools to Transformation",
            },            {
              icon: creativityIcon,
              bgColor: "bg-[#FFE5B4]",
              text: "Entrepreneurship & Innovation for Teens",
            },            {
              icon: gamingIcon,
              bgColor: "bg-[#FFF3B0]",
              text: "Critical Thinking & Problem Solving MasterClass",
            },            {
              icon: inculcationIcon,
              bgColor: "bg-[#D8F3DC]",
              text: "Building Growth Mindset in Classrooms",
            },            {
              icon: logicIcon,
              bgColor: "bg-[#FFF3D0]",
              text: "Building a Growth Mindset in Classrooms",
            },
          ].map(({ icon, bgColor, text }, i) => (
            <div
              key={`${loopIndex}-${i}`}
              className="flex items-center rounded-2xl overflow-hidden bg-white shadow-md border border-gray-100 w-[280px] sm:w-[340px] flex-shrink-0"
            >
              <div
                className={`${bgColor} flex items-center justify-center w-24 h-24 flex-shrink-0`}
              >
                <img
                  src={icon}
                  alt={text}
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain transform transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="px-4 py-3 text-left">
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base leading-snug">
                  {text}
                </h4>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
</section>

      {/* 📞 Contact Form */}
      <section ref={formRef} className="bg-[#FFF8EE] py-12 px-4 sm:px-8 relative overflow-hidden">
        <h2 className="text-center text-xl sm:text-3xl font-bold text-gray-900 mb-6">
          Reach <span className="text-green-600">Out Now!</span>
        </h2>
        <p className="text-center text-gray-600 text-sm mb-8">
          Want to book a workshop? Contact us now we'll answer your query as soon as possible.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center relative gap-0">
          <div className="hidden md:flex justify-end w-1/3 relative z-20 -mr-4">
            <img src={boyLeft} alt="Left character" className="h-64 md:h-72 object-cover rounded-2xl scale-110 -translate-x-3" />
          </div>

          <form
            onSubmit={handleSubmit}
            id="workshop-form"
            className="bg-white rounded-2xl shadow-xl p-5 sm:p-8 w-full max-w-md flex flex-col justify-center mx-auto z-10 relative"
          >
            <h3 className="text-center text-lg sm:text-xl font-semibold text-green-700 mb-3">
              Request a Workshop to Lyfshilp Academy
            </h3>

            {status.message && (
              <p className={`text-center text-sm mb-3 font-medium ${status.success ? "text-green-600" : "text-red-500"}`}>
                {status.message}
              </p>
            )}

            {/* Inputs unchanged */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500" />
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email ID" required className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500" />
              <input type="text" name="organization" value={formData.organization} onChange={handleChange} placeholder="School or Company Name" className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500" />
            </div>

            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message" rows="3" className="border border-gray-300 rounded-lg px-3 py-2 text-sm mb-4 focus:ring-2 focus:ring-green-500"></textarea>

            <button type="submit" disabled={loading} className={`w-full ${loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"} text-white py-2 rounded-full font-medium transition`}>
              {loading ? "Submitting..." : "Submit Now"}
            </button>

            <p className="text-center text-gray-400 text-sm my-2">OR</p>

            <button
              type="button"
              onClick={handleWhatsAppClick}
              className="w-full border border-green-600 text-green-600 py-2 rounded-full font-medium hover:bg-green-50 transition flex items-center justify-center gap-2"
            >
              <FaWhatsapp className="text-green-600 text-lg" /> WhatsApp Now
            </button>
          </form>

          <div className="hidden md:flex justify-start w-1/3 relative z-20 -ml-4">
            <img src={boyRight} alt="Right character" className="h-64 md:h-72 object-cover rounded-2xl scale-110 translate-x-3" />
          </div>
        </div>
      </section>

      {/* Floating WhatsApp + Register Buttons */}
      {showFloatingButtons && (
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
          <button
            onClick={handleWhatsAppClick}
            className="bg-green-600 hover:bg-green-700 text-white rounded-full p-3 shadow-lg flex items-center justify-center transition"
          >
            <FaWhatsapp className="text-2xl" />
          </button>
          <a
            href="#workshop-form"
            className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-full shadow-md font-medium transition text-center"
          >
            Register For Workshop
          </a>
        </div>
      )}

  <style>
  {`
    /* 🌟 Rotating Images Animation */
    @keyframes rotateImage1 {
      0% { 
        opacity: 1; 
        z-index: 30; 
        transform: scale(1) rotate(0deg) translateX(0); 
      }
      33.33% { 
        opacity: 0.6; 
        z-index: 10; 
        transform: scale(0.85) rotate(8deg) translateX(40px); 
      }
      66.66% { 
        opacity: 0.6; 
        z-index: 10; 
        transform: scale(0.85) rotate(-8deg) translateX(-40px); 
      }
      100% { 
        opacity: 1; 
        z-index: 30; 
        transform: scale(1) rotate(0deg) translateX(0); 
      }
    }

    @keyframes rotateImage2 {
      0% { 
        opacity: 0.6; 
        z-index: 10; 
        transform: scale(0.85) rotate(8deg) translateX(40px); 
      }
      33.33% { 
        opacity: 0.6; 
        z-index: 10; 
        transform: scale(0.85) rotate(-8deg) translateX(-40px); 
      }
      66.66% { 
        opacity: 1; 
        z-index: 30; 
        transform: scale(1) rotate(0deg) translateX(0); 
      }
      100% { 
        opacity: 0.6; 
        z-index: 10; 
        transform: scale(0.85) rotate(8deg) translateX(40px); 
      }
    }

    @keyframes rotateImage3 {
      0% { 
        opacity: 0.6; 
        z-index: 10; 
        transform: scale(0.85) rotate(-8deg) translateX(-40px); 
      }
      33.33% { 
        opacity: 1; 
        z-index: 30; 
        transform: scale(1) rotate(0deg) translateX(0); 
      }
      66.66% { 
        opacity: 0.6; 
        z-index: 10; 
        transform: scale(0.85) rotate(8deg) translateX(40px); 
      }
      100% { 
        opacity: 0.6; 
        z-index: 10; 
        transform: scale(0.85) rotate(-8deg) translateX(-40px); 
      }
    }

    .animate-rotateImage1 {
      animation: rotateImage1 9s infinite ease-in-out;
    }
    .animate-rotateImage2 {
      animation: rotateImage2 9s infinite ease-in-out;
    }
    .animate-rotateImage3 {
      animation: rotateImage3 9s infinite ease-in-out;
    }

    /* 💫 Popup Card Animation */
    @keyframes popupCard {
      0% {
        opacity: 0;
        transform: translateY(30px) scale(0.9);
      }
      60% {
        transform: translateY(-8px) scale(1.02);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .animate-popupCard {
      animation: popupCard 0.6s ease-out forwards;
    }
  `}
</style>

    </div>
  );
}
