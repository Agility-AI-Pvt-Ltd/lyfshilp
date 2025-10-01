import { useEffect, useState } from "react";
import api from "../api/axios";

import AboutLyfshilp from "../ComponentsAboutus/AboutLyfshilp";
import SuccessNumbers from "../ComponentsAboutus/SuccessNumbers";
import FounderSection from "../ComponentsAboutus/FoundrerSection"

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      <AboutLyfshilp />
      <SuccessNumbers/>
      <FounderSection/>
    </div>
  );
}

