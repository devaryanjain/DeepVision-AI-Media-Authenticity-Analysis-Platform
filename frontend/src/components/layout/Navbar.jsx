import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `transition ${
      isActive
        ? "text-cyan-400"
        : "text-slate-300 hover:text-cyan-400"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur border-b border-slate-800">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="text-xl font-bold text-cyan-400"
        >
          DeepVision AI
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/upload" className={linkClass}>
            Upload
          </NavLink>

          <NavLink to="/history" className={linkClass}>
            History
          </NavLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-slate-300"
          aria-label="Toggle navigation"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-6 py-5">
          <div className="flex flex-col gap-5 text-sm font-medium">

            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className={linkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/upload"
              onClick={() => setOpen(false)}
              className={linkClass}
            >
              Upload
            </NavLink>

            <NavLink
              to="/history"
              onClick={() => setOpen(false)}
              className={linkClass}
            >
              History
            </NavLink>

          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;