// src/components/Internships.jsx
import InternIntro from "../componentInternships/InternIntro.jsx";
import InternWhy from "../componentInternships/InternWhy.jsx";
import Internshipcareer from "../componentInternships/Internshipcareer.jsx";

export default function Internships() {
  return (
    <div className="w-full bg-white">
      {/* First Section */}
      <InternIntro />

      {/* Second Section */}
      <InternWhy />

      <Internshipcareer/>
    </div>
  );
}