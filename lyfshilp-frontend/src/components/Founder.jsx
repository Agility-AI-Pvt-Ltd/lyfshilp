import founderImg from "../assets/founder.png";

export default function Founder() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-5 flex flex-col md:flex-row items-center gap-10">
        <img src={founderImg} alt="Founder" className="w-56 h-56 rounded-full object-cover shadow-lg" />
        <div>
          <h2 className="text-3xl font-bold text-lyf-blue">About Our Founder</h2>
          <p className="mt-4 text-gray-600 leading-relaxed max-w-3xl text-justify">
            Sharad is an accomplished educator with a BTech from NSUT, Delhi, an MBA from IRMA...
          </p>
        </div>
      </div>
    </section>
  );
}
