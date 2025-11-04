import Firstpart from "../ComponentCUET/Firstpart.jsx";
import Secondpart from "../ComponentCUET/Secondpart.jsx";
import Thirdpart from "../ComponentCUET/Thirdpart.jsx";
import CallBackForm from "../components/CallBackForm.jsx";
import VerbalAbility from "../components/VerbalAbility.jsx";


export default function CuetPage() {
  return (
    <div className="w-full bg-white">

      <Firstpart/>
      <Secondpart/>
      <VerbalAbility/>
      <CallBackForm pageName="CUET" />
      <Thirdpart/>  
    
      
    </div>
  );
}