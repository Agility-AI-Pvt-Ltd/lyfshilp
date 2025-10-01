export default function VideoMap() {
  return (
    <section className="py-12 bg-gradient-to-r from-sky-50 to-cyan-50">
      <div className="container mx-auto px-5">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Video & Location
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Learn more about us and find our location easily
        </p>

        {/* Row layout */}
        <div className="mt-10 grid grid-cols-2 gap-8">
          {/* Video Box */}
          <div className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition">
            <iframe
              className="w-full h-72 rounded-lg"
              src="https://www.youtube.com/embed/lxRlXFkgADQ"
              title="YouTube"
              allowFullScreen
            ></iframe>
            <p className="mt-3 text-center font-semibold text-gray-700">
              Introduction Video
            </p>
          </div>
          {/* Map Box */} 
        <div className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition">
          <iframe
           className="w-full h-72 rounded-lg"
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.833366048109!2d77.20759331508395!3d28.61393998242316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd1f0d5e7e25%3A0xbdbb2c2c69d5c8d9!2sConnaught%20Place%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1695222512345"
           title="map"
           allowFullScreen
           loading="lazy"
           referrerPolicy="no-referrer-when-downgrade"
           ></iframe>
           <p className="mt-3 text-center font-semibold text-gray-700">
           Our Location
           </p>
           </div>
        </div>
      </div>
    </section>
  );
}
