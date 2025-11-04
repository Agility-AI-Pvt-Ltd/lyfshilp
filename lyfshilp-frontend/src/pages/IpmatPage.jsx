import Firstpart from "../ComponentIPMAT/Firstpart.jsx";
import Secondpart from "../ComponentIPMAT/Secondpart.jsx";
import Thirdpart from "../ComponentIPMAT/Thirdpart.jsx";
import CallBackForm from "../components/CallBackForm.jsx";
import VerbalAbility from "../components/VerbalAbility.jsx";


export default function IpmatPage() {
  return (
    <div className="w-full bg-white">

      <Firstpart/>
      <Secondpart/>
      <VerbalAbility/>
      <CallBackForm pageName="IPMAT/JIPMAT" />
      <Thirdpart/>  
       
    </div>
  );
}