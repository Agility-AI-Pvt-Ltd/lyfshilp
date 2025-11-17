import Firstpart from "../ComponentCUET/Firstpart.jsx";
import Secondpart from "../ComponentCUET/Secondpart.jsx";
import Thirdpart from "../ComponentCUET/Thirdpart.jsx";
import ContactsForm from "../components/ContactsForm.jsx";
import VerbalAbility from "../components/VerbalAbility.jsx";


export default function CuetPage() {
  return (
    <div className="w-full bg-white">

      <Firstpart/>
      <Secondpart/>
      <VerbalAbility/>
      <ContactsForm pageName="CUET"/>
      <Thirdpart/>  
    
      
    </div>
  );
}