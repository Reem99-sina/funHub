import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const linkStyle = (path: string) =>
    `px-3 py-2 rounded-md text-sm font-medium transition ${
      location.pathname === path
        ? "text-pink-600 font-semibold"
        : "text-gray-700 hover:text-pink-600"
    }`;

  return (
    <header className="w-full bg-white border-b border-gray-200 fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo / Site Name */}
        <Link to="/" className="text-xl font-bold text-pink-600">
          <img src="/logo.JPG" className="" />
        </Link>

        {/* Navigation Links */}
        <nav className="flex gap-4">
          <Link to="/" className={linkStyle("/")}>
            Home
          </Link>
          <Link to="/best-sites" className={linkStyle("/best-sites")}>
            Best Sites
          </Link>
      
        </nav>
      </div>
    </header>
  );
}
