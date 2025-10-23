import OlympiadSection from "../ComponentOlympiad/OlympiadSection";
import ThinkOlym from "../ComponentOlympiad/ThinkOlym";
import RecogSection from "../ComponentOlympiad/RecogSection";
import JoinLearnSection from "../ComponentOlympiad/JoinLearnSection";
import OlympiadDash from "../ComponentOlympiad/OlymiadDash";

export default function Olympiad() {
  return (
    <div className="w-full bg-white">

      <OlympiadSection/>  
      <ThinkOlym/>
      <RecogSection/>
      <OlympiadDash/>
      <JoinLearnSection/>
      
    </div>
  );
}