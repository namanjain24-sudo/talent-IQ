import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookOpenIcon, LayoutDashboardIcon, SparklesIcon, LogOutIcon } from "lucide-react";
import authService from "../lib/auth";

function Navbar({ onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await authService.logout();
      if (onLogout) onLogout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/login");
    }
  };

  return (
    <nav className="bg-base-200/50 backdrop-blur-md border-b border-primary/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          className="group flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
        >
          <div className="size-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <SparklesIcon className="size-5 text-primary" />
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-lg text-primary font-mono tracking-wide">
              TALENT IQ
            </span>
            <span className="text-xs text-base-content/50 font-medium -mt-1">Code Together</span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {/* PROBLEMS PAGE LINK */}
          <Link
            to={"/problems"}
            className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2
              ${
                isActive("/problems")
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "hover:bg-base-300/50 text-base-content/70 hover:text-base-content"
              }
              
              `}
          >
            <BookOpenIcon className="size-4" />
            <span className="font-medium hidden sm:inline">Problems</span>
          </Link>

          {/* DASHBOARD PAGE LINK */}
          <Link
            to={"/dashboard"}
            className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2
              ${
                isActive("/dashboard")
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "hover:bg-base-300/50 text-base-content/70 hover:text-base-content"
              }
              
              `}
          >
            <LayoutDashboardIcon className="size-4" />
            <span className="font-medium hidden sm:inline">Dashboard</span>
          </Link>

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="ml-2 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-base-300/50 text-base-content/70 hover:text-base-content transition-all duration-200"
          >
            <LogOutIcon className="size-4" />
            <span className="font-medium hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;