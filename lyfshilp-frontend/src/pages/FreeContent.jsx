import { useState } from "react";
import api from "../api/axios.js";

// 🧠 Helper: YouTube embed converter
const getEmbedUrl = (url) => {
  if (!url) return "";
  if (url.includes("youtu.be")) {
    return `https://www.youtube.com/embed/${url.split("youtu.be/")[1].split("?")[0]}`;
  }
  if (url.includes("watch?v=")) {
    return `https://www.youtube.com/embed/${url.split("v=")[1].split("&")[0]}`;
  }
  if (url.includes("embed")) return url;
  return `https://www.youtube.com/embed/${url}`;
};

const isValidYoutube = (url) =>
  url && (url.includes("youtu.be") || url.includes("youtube.com"));

// 🎥 DATA
const freeContentData = {
  CUET: {
    subjects: [
      {
        title: "General Aptitude Test (GAT) - Quant",
        video: "https://youtu.be/Vp1J9KcmxsM",
        playlistUrl: "https://www.youtube.com/watch?v=Vp1J9KcmxsM&list=PL8bYh1-B5eAba9n4r1VbeQlmo9rBdbuMT",
      },
      {
        title: "English Language",
        video: "https://youtu.be/Vf0AdL2LD3o",
        playlistUrl: "https://www.youtube.com/watch?v=Vf0AdL2LD3o&list=PL8bYh1-B5eAac4czpc72V2dnz68C_-fKW",
      },
      {
        title: "General Aptitude Test (GAT) - Logical Reasoning",
        video: "https://youtu.be/DGNIKVa7gMs",
        playlistUrl: "https://www.youtube.com/watch?v=DGNIKVa7gMs&list=PL8bYh1-B5eAbbsRkqweGUxUnZblO4Q_qL",
      },
      {
        title: "General Aptitude Test (GAT) - General Knowledge",
        video: "https://youtu.be/ZE6XxABksTc",
        playlistUrl: "https://www.youtube.com/watch?v=ZE6XxABksTc&list=PL8bYh1-B5eAbd6qqdQj7qSq0N55MqL-XV",
      },
      {
        title: "History",
        video: "https:......",// coming soon video url nhi hai aur tbtk iska playlist button bhi hide rhe
        playlistUrl: "https://www.youtube.com/playlist?list=CUET_HISTORY",
      },
      {
        title: "Political Science",
        video: "https:............",// coming soon video url nhi hai aur tbtk iska playlist button bhi hide rhe 
        playlistUrl: "https://www.youtube.com/playlist?list=CUET_POLITY",
      },
      {
        title: "Geography",
        video: "https:............",// coming soon video url nhi hai aur tbtk iska playlist button bhi hide rhe
        playlistUrl: "https://www.youtube.com/playlist?list=CUET_GEOGRAPHY",
      },
      {
        title: "Economics",
        video: "https:.......",//coming soon
        playlistUrl: "https://www.youtube.com/playlist?list=CUET_ECONOMICS",
      },
    ],
  },

  
  CLAT: {
    subjects: [
      {
        title: "Verbal Reasoning",
        video: "https://youtu.be/Vf0AdL2LD3o",
        playlistUrl: "https://www.youtube.com/watch?v=Vf0AdL2LD3o&list=PL8bYh1-B5eAac4czpc72V2dnz68C_-fKW",
      },
      {
        title: "General Knowledge",
        video: "https://youtu.be/ZE6XxABksTc",
        playlistUrl: "https://www.youtube.com/watch?v=ZE6XxABksTc&list=PL8bYh1-B5eAbd6qqdQj7qSq0N55MqL-XV",
      },
      {
        title: "Quantitative Aptitude",
        video: "https://youtu.be/Vp1J9KcmxsM",
        playlistUrl: "https://www.youtube.com/watch?v=Vp1J9KcmxsM&list=PL8bYh1-B5eAba9n4r1VbeQlmo9rBdbuMT",
      },
    ],
  },

  IPMAT: {
    subjects: [
      {
        title: "Quantitative Aptitude",
        video: "https://youtu.be/Vp1J9KcmxsM",
        playlistUrl: "https://www.youtube.com/watch?v=Vp1J9KcmxsM&list=PL8bYh1-B5eAba9n4r1VbeQlmo9rBdbuMT",
      },
      {
        title: "Verbal Ability",
        video: "https://youtu.be/Vf0AdL2LD3o",
        playlistUrl: "https://www.youtube.com/watch?v=Vf0AdL2LD3o&list=PL8bYh1-B5eAac4czpc72V2dnz68C_-fKW",
      },
       {
        title: "Logical Reasoning",
        video: "https://youtu.be/DGNIKVa7gMs",
        playlistUrl: "https://www.youtube.com/watch?v=DGNIKVa7gMs&list=PL8bYh1-B5eAbbsRkqweGUxUnZblO4Q_qL",
      },
    ],
  },
};

export default function FreeContent() {
  const [activeSection, setActiveSection] = useState("CUET");
  const [showPdfPopup, setShowPdfPopup] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const COURSES = ["CUET", "CLAT", "IPMAT"];
  const [pdfForm, setPdfForm] = useState({
  name: "",
  phone: "",
  email: "",
});
const [loading, setLoading] = useState(false);
const [formMsg, setFormMsg] = useState("");
const [formMsgType, setFormMsgType] = useState(""); // "success" | "error"
// ✅ Validators
const phoneRegex = /^[6-9]\d{9}$/; // Indian 10-digit number
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const submitPdfForm = async (e) => {
  e.preventDefault();

if (!pdfForm.name || !pdfForm.phone || !pdfForm.email) {
  setFormMsg(" Please fill all details");
  setFormMsgType("error");
  return;
}

if (!phoneRegex.test(pdfForm.phone)) {
  setFormMsg(" Enter a valid 10-digit mobile number");
  setFormMsgType("error");
  return;
}

if (!emailRegex.test(pdfForm.email)) {
  setFormMsg(" Enter a valid email address");
  setFormMsgType("error");
  return;
}

  if (selectedCourses.length === 0) {
    setFormMsg(" Please select at least one course");
    setFormMsgType("error");
    return;
  }

  try {
    setLoading(true);

    await api.post("/daily-pdf/register", {
      ...pdfForm,
      courses: selectedCourses,
    });

    setFormMsg("Daily PDFs enabled! Check your email.");
    setFormMsgType("success");

    setPdfForm({ name: "", phone: "", email: "" });
    setSelectedCourses([]);

    // ⏱️ auto hide in 2 minutes
    setTimeout(() => {
      setFormMsg("");
      setFormMsgType("");
      setShowPdfPopup(false);
    }, 2000); // 2 min

  } catch (err) {
    console.error(err);
    setFormMsg("❌ Something went wrong. Try again.");
    setFormMsgType("error");
  } finally {
    setLoading(false);
  }
};

const toggleCourse = (course) => {
  setSelectedCourses((prev) =>
    prev.includes(course)
      ? prev.filter((c) => c !== course)
      : [...prev, course]
  );
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 pt-24 pb-16 px-4 sm:px-6 lg:px-12">
      
      {/* Decorative background elements */}
      <div className="fixed top-20 right-10 w-64 h-64 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="fixed bottom-20 left-10 w-80 h-80 bg-yellow-200 rounded-full opacity-20 blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 🔥 HERO SECTION */}
        <div className="text-center mb-16">
          <div className="inline-block bg-green-100 px-4 py-2 rounded-full mb-4">
            <span className="text-green-700 font-semibold text-sm">100% Free • No Hidden Costs</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight">
            The Lyfshilp{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              "Selection" Hub
            </span>
          </h1>

          <p className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
            Free CUET, IPMAT & CLAT Prep 2026
          </p>

          <p className="text-gray-700 text-base sm:text-lg max-w-3xl mx-auto mb-8">
            No Gates. No Paywalls. Just high-quality resources to help you reach your dream campus.
          </p>

          {/* 🚨 ALERT BOX */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-400 rounded-2xl p-6 sm:p-8 shadow-xl max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="text-4xl"></div>
              <div className="flex-1 text-left">
                <h3 className="font-bold text-xl sm:text-2xl mb-2 text-gray-900">
                  CUET 2026 Registration is LIVE!
                </h3>
                <p className="text-gray-700 text-sm sm:text-base mb-4">
                  Don&apos;t make a mistake on your form. Download the{" "}
                  <span className="font-bold text-green-600">NTA Subject Selection Guide</span> or book a{" "}
                  <span className="font-bold text-green-600">Free 15-min Counselling</span> with our mentors.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://wa.me/9871700767"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp for Help
                  </a>

                  <a
                    href="/CUET2026.pdf"
                    download
                    className="flex items-center justify-center gap-2 bg-white border-2 border-green-600 text-green-700 hover:bg-green-50 px-6 py-3 rounded-xl font-semibold shadow-md transition-all hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF Guide
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🔘 SECTION SELECTOR */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-8">
            Choose Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              Path
            </span>
          </h2>

          <div className="flex justify-center gap-4 flex-wrap">
            {["CUET", "CLAT", "IPMAT"].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg
                  ${
                    activeSection === section
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-xl"
                      : "bg-white text-gray-700 border-2 border-gray-200 hover:border-green-600"
                  }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>

<div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border mb-12">

  <h3 className="text-2xl text-center sm:text-3xl font-black mb-8">
    {activeSection}{" "}
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
      Free Videos
    </span>
  </h3>

<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
{freeContentData[activeSection].subjects.map((item, index) => {
  const hasVideo = isValidYoutube(item.video);

  return (
    <div
      key={index}
      className="bg-white rounded-2xl shadow-lg border p-4"
    >
      {/* 🎥 VIDEO OR COMING SOON */}
      {hasVideo ? (
        <iframe
          src={getEmbedUrl(item.video)}
          title={item.title}
          className="w-full h-48 rounded-xl mb-3"
          allowFullScreen
        />
      ) : (
        <div className="h-52 flex items-center justify-center rounded-xl  text-gray-500 text-2xl font-bold">
          Coming Soon
        </div>
      )}

      {/* SUBJECT NAME */}
      <h4 className="font-bold text-gray-800 text-center mb-2">
        {item.title}
      </h4>

      {/* PLAYLIST BUTTON (ONLY IF VIDEO EXISTS) */}
      {hasVideo && (
        <div className="text-center">
          <a
            href={item.playlistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-semibold text-blue-600 hover:underline"
          >
            ▶ View Full Playlist
          </a>
        </div>
      )}
    </div>
  );
})}
</div>
</div>

        {/* ❤️ CONSISTENCY + SUBSCRIBE */}
        <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl p-8 sm:p-12 shadow-2xl border border-green-200 mb-12">
          <h3 className="text-3xl sm:text-4xl font-black text-center mb-6">
            Love the{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
              Free Videos?
            </span>
          </h3>

          <p className="text-center text-gray-700 text-lg max-w-3xl mx-auto mb-8">
            Subscribe to the{" "}
            <span className="font-bold text-green-700">
              Lyfshilp YouTube Channel
            </span>{" "}
            and sign up to receive{" "}
            <span className="font-bold">Daily Current Affairs PDFs</span>.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <a
              href="https://www.youtube.com/@LyfshilpAcademy"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105"
            >
              ▶ Subscribe on YouTube
            </a>

<button
  onClick={() => setShowPdfPopup(true)}
  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105"
>
  Get Daily PDFs (Free)
</button>

          </div>

<div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-6 max-w-4xl mx-auto">
  <p className="text-gray-800 font-medium text-center">
    While you can learn everything from our <b>free hub</b>,{" "}
    <span className="text-red-600 font-bold">90% students fail</span>{" "}
    because of lack of <b>consistency</b> and <b>doubt-clearing</b>.
    If you don’t want to be part of that 90%, this is where the difference begins{" "}
    <a
      href="https://wa.me/9871700767"
      target="_blank"
      rel="noopener noreferrer"
  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 
             text-white px-4 py-2 rounded-xl font-semibold shadow-lg 
             transition-all hover:scale-105 w-fit mx-auto mt-4"
    >
      → Get In Touch
      <svg
        className="w-4 h-4 ml-1"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  </p>
</div>

        </div>
          {/* Bottom CTA */}
          <div className="mt-8 text-center bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6">
            <p className="text-gray-700 mb-4">
              <span className="font-bold">Want more resources?</span> Join our community for exclusive content!
            </p>
            <a
              href="https://whatsapp.com/channel/0029VadNNTZDJ6GwkeqieW1g"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all hover:scale-105"
            >
              Join WhatsApp Community
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
        {/* 📩 DAILY PDF POPUP */}
{showPdfPopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">

      {/* Close */}
      <button
        onClick={() => setShowPdfPopup(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
      >
        ✕
      </button>

      <h3 className="text-2xl font-black text-center mb-2">
        Get Daily PDFs
      </h3>

      <p className="text-sm text-gray-600 text-center mb-6">
        Enter your details to receive daily current affairs PDFs on WhatsApp.
      </p>

     <form className="space-y-4" onSubmit={submitPdfForm}>

<input
  type="text"
  required
  className="border p-2 rounded-lg"
  placeholder="Full Name"
  value={pdfForm.name}
  onChange={(e) => setPdfForm({ ...pdfForm, name: e.target.value })}
/>

<input
  type="tel"
  required
  maxLength={10}
  className="border p-2 rounded-lg"
  placeholder="Phone Number"
  value={pdfForm.phone}
  onChange={(e) =>
    setPdfForm({
      ...pdfForm,
      phone: e.target.value.replace(/\D/g, ""),
    })
  }
/>

<input
  type="email"
  required
  className="w-full border p-2 rounded-lg"
  placeholder="Email Address"
  value={pdfForm.email}
  onChange={(e) => setPdfForm({ ...pdfForm, email: e.target.value })}
/>


        {/* Course Multi Select */}
<div className="relative">
  <button
    type="button"
    onClick={() => setOpen(!open)}
    className="w-full border p-3 rounded-lg text-left bg-white"
  >
    {selectedCourses.length > 0
      ? selectedCourses.join(", ")
      : "Select Course(s)"}
  </button>

  {open && (
    <div className="mt-2 w-full bg-white border rounded-lg shadow-lg">
      {COURSES.map((course) => (
        <label
          key={course}
          className="flex items-center gap-2 px-4 py-2 hover:bg-green-50 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={selectedCourses.includes(course)}
            onChange={() => toggleCourse(course)}
          />
          {course}
        </label>
      ))}
    </div>
  )}
</div>

<button
  type="submit"
  disabled={loading}
  className={`w-full py-3 rounded-xl font-bold text-white transition ${
    loading
      ? "bg-green-400 cursor-not-allowed"
      : "bg-green-600 hover:bg-green-700"
  }`}
>
  {loading ? "Submitting..." : "Get Free Access"}
</button>

          {formMsg && (
  <div
    className={`text-sm text-center font-semibold ${
      formMsgType === "success" ? "text-green-600" : "text-red-600"
    }`}
  >
    {formMsg}
  </div>
)}
      </form>
    </div>
  </div>
)}
      </div>
  );
}
