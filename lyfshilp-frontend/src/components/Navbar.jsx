export default function Navbar() {
  return (
    <nav className="bg-yellow-100 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src="/logo.png" alt="Lyfshilp Logo" className="h-10 mr-2" />
          <span className="font-bold text-gray-600">LYFSHILP ACADEMY</span>
        </a>

        {/* Links */}
        <ul className="hidden md:flex space-x-6 font-medium">
          <li><a href="/" className="hover:text-yellow-600">Home</a></li>
          <li><a href="/courses" className="hover:text-yellow-600">Courses</a></li>
          <li><a href="/testseries" className="hover:text-yellow-600">Test Series</a></li>
          <li><a href="/updates" className="hover:text-yellow-600">Daily Updates</a></li>
          <li><a href="/login" className="bg-orange-400 px-4 py-1 rounded-full text-white">Login</a></li>
          <li><a href="/signup" className="bg-red-500 px-4 py-1 rounded-full text-white">Signup</a></li>
        </ul>
      </div>
    </nav>
  );
}
