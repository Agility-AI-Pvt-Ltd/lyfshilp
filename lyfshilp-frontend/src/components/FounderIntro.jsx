// src/components/Founder.jsx
import founderImg from "../assets/SharadSir.svg";

export default function Founderintro() {
  return (
    <section className="py-16 bg-green-1000"> {/* <-- Background green */}
      <div className="container mx-auto px-5 flex flex-col md:flex-row items-center gap-10">
        <img
          src={founderImg}
          alt="Founder"
          className="w-50 h-80 aspect-square object-cover shadow-lg rounded-lg" 
        />
        <div>
          <h2 className="text-3xl font-bold text-green-400">
            About Our Founder
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed max-w-3xl text-justify">
            Sharad is an accomplished educator with a BTech from NSUT, Delhi, an
            MBA from IRMA, Gujarat and an LLB in progress from the Campus Law
            Centre, Faculty of Law, University of Delhi. He has received PhD
            calls from IIM Ahmedabad, IIT Kanpur, and XLRI. Sharad has worked
            with the United Nations, Tata Trusts, and Amul, and has repeatedly
            scored 98+ percentile in the CAT.
            <br />
            <br />
            With 9+ years of teaching and mentoring experience, he emphasizes
            the importance of socio-emotional and personality development
            alongside academic excellence.
            <br />
            <br />
            Sharad has also served as a Consultant to the Government of
            Rajasthan, focusing on training school principals, panchayats, and
            teachers to improve student learning outcomes in Churu district.
          </p>
        </div>
      </div>
    </section>
  );
}
