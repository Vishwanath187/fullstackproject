import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Treat these as PUBLIC pages
  const publicRoutes = ["/", "/about", "/contact"];
  const isPublicPage = publicRoutes.includes(location.pathname);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/", { replace: true });
  };

  return (
    <div className="w-full h-14 bg-black text-white flex justify-between items-center px-6">
      {/* LEFT */}
      <h1 className="text-xl font-bold tracking-wide">
        Digital Library
      </h1>

      {/* RIGHT */}
      <div className="flex gap-6 text-sm font-medium items-center">
        {isPublicPage ? (
          <>
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>

            <Link to="/about" className="hover:text-gray-300">
              About
            </Link>

            <Link to="/contact" className="hover:text-gray-300">
              Contact
            </Link>

            <Link
              to="/login"
              className="border border-white px-4 py-1 rounded hover:bg-white hover:text-black transition"
            >
              Admin
            </Link>
          </>
        ) : (
          <>
            <Link to="/home" className="hover:text-gray-300">
              Books
            </Link>

            <Link to="/student" className="hover:text-gray-300">
              Students
            </Link>

            <Link to="/borrow-history" className="hover:text-gray-300">
              Transactions
            </Link>


            <button
              onClick={handleLogout}
              className="border border-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
