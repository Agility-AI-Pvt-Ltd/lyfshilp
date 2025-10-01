// src/components/Internships.jsx
import InternIntro from "../componentInternships/InternIntro";
import InternWhy from "../componentInternships/InternWhy";
import Internshipcareer from "../componentInternships/Internshipcareer";

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