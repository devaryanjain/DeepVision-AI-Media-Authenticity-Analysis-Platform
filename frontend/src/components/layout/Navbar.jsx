import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link
          to="/"
          className="text-3xl font-bold text-cyan-400 tracking-wide"
        >
          DeepVision AI
        </Link>

        <div className="flex gap-8">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-cyan-400 font-medium"
                : "text-slate-300 hover:text-cyan-400 transition"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/upload"
            className={({ isActive }) =>
              isActive
                ? "text-cyan-400 font-medium"
                : "text-slate-300 hover:text-cyan-400 transition"
            }
          >
            Upload
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive
                ? "text-cyan-400 font-medium"
                : "text-slate-300 hover:text-cyan-400 transition"
            }
          >
            History
          </NavLink>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;