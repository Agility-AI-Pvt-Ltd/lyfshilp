import OlympiadSection from "../ComponentOlympiad/OlympiadSection.jsx";
import OlympiadSection1 from "../ComponentOlympiad/OlympiadSection1.jsx";
import OlympiadSection2 from "../ComponentOlympiad/OlympiadSection2.jsx";
import OlympiadSection3 from "../ComponentOlympiad/OlympiadSection3.jsx";
import OlympiadSection4 from "../ComponentOlympiad/OlympiadSection4.jsx";
import OlympiadSection5 from "../ComponentOlympiad/OlympiadSection5.jsx";
import JoinLearnSection from "../ComponentOlympiad/JoinLearnSection.jsx";
import OlympiadDash from "../ComponentOlympiad/OlymiadDash.jsx";
import RewardsSection from "../ComponentOlympiad/RewardSection.jsx";

export default function Olympiad() {
  return (
    <div className="w-full bg-white">

      <OlympiadSection/>
      <OlympiadSection1/>
      <OlympiadSection2/>
      <OlympiadSection3/>
      <OlympiadSection4/>
      <OlympiadSection5/>
      <OlympiadDash/>
      <RewardsSection/>
      <JoinLearnSection/>
      
    </div>
  );
}