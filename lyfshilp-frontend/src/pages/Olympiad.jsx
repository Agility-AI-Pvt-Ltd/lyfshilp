import OlympiadSection from "../ComponentOlympiad/OlympiadSection.jsx";
import OlympiadSection1a from "../ComponentOlympiad/OlympiadSection1a.jsx";
import OlympiadSection1b from "../ComponentOlympiad/OlympiadSection1b.jsx";
// import OlympiadSection1c from "../ComponentOlympiad/OlympiadSection1c.jsx";
import OlympiadSection1e from "../ComponentOlympiad/OlympiadSection1e.jsx";
import OlympiadSection2 from "../ComponentOlympiad/OlympiadSection2.jsx";
import OlympiadSection3 from "../ComponentOlympiad/OlympiadSection3.jsx";
import OlympiadSection4 from "../ComponentOlympiad/OlympiadSection4.jsx";

import OlympiadSection5 from "../ComponentOlympiad/olympiadSection5.jsx";

import OlympiadSection5 from "../ComponentOlympiad/OlympiadSection5.jsx";
import OlympiadSection7 from "../ComponentOlympiad/OlympiadSection7.jsx";

import JoinLearnSection from "../ComponentOlympiad/JoinLearnSection.jsx";
// import OlympiadSection7 from "../ComponentOlympiad/OlympiadSection7.jsx";
// import OlympiadDash from "../ComponentOlympiad/OlymiadDash.jsx";
// import RewardsSection from "../ComponentOlympiad/RewardSection.jsx";
import OlympiadSection6 from "../ComponentOlympiad/OlympiadSection6.jsx";
import OlympiadSection1s from "../ComponentOlympiad/OlympiadSection1s.jsx";

export default function Olympiad() {
  return (
    <div className="w-full bg-white">

      <OlympiadSection/>
      <OlympiadSection1a/>
      <OlympiadSection1b/>
      {/* <OlympiadSection1c/> */}
      <OlympiadSection1e/>
      <OlympiadSection1s/>
      <OlympiadSection2/>
      <OlympiadSection3/>
      <OlympiadSection4/>
      <OlympiadSection5/>
      <OlympiadSection6/>
      {/* <OlympiadSection7/> */}
      {/* <OlympiadDash/> */}
      {/* <RewardsSection/> */}
      <JoinLearnSection/>
      
    </div>
  );
}