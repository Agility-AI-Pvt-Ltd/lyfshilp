import Firstsection from "../ComponentCLAT/Firstsection.jsx";
import Secondsection from "../ComponentCLAT/Secondsection.jsx";
import Thirdsection from "../ComponentCLAT/Thirdsection.jsx";
import CallBackForm from "../components/CallBackForm.jsx";
import VerbalAbility from "../components/VerbalAbility.jsx";


export default function ClatPage() {
  return (
    <div className="w-full bg-white">

      <Firstsection />
      <Secondsection />
      <VerbalAbility/>
      <CallBackForm pageName="CLAT" />
      <Thirdsection/>  
    
      
    </div>
  );
}