import Firstsection from "../ComponentCLAT/Firstsection.jsx";
import Secondsection from "../ComponentCLAT/Secondsection.jsx";
import Thirdsection from "../ComponentCLAT/Thirdsection.jsx";
import ContactsForm from "../components/ContactsForm.jsx";
import VerbalAbility from "../components/VerbalAbility.jsx";


export default function ClatPage() {
  return (
    <div className="w-full bg-white">

      <Firstsection />
      <Secondsection />
      <VerbalAbility/>
      <ContactsForm pageName="CLAT"/>
      <Thirdsection/>  
    
      
    </div>
  );
}