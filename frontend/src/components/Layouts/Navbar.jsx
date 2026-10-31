import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { navItems } from "../../static/data";

function Navbar({ active, mobile = false }) {
  const { pathname } = useLocation();

  return (
    <nav aria-label={mobile ? "Mobile navigation" : "Main navigation"} className={mobile ? "flex flex-col" : "flex items-center gap-7"}>
      {navItems.map(({ title, url }) => (
        <Link
          key={url}
          to={url}
          className={`group relative ${mobile ? "rounded-lg px-4 py-3 text-ink-700 hover:bg-[#6366F1]/10 hover:text-[#6366F1]" : "rounded-full px-3 py-2 text-white/85 hover:bg-[#6366F1]/20 hover:text-[#C7D2FE]"} text-[14px] font-medium transition-all duration-200 ${pathname === url || active === title ? mobile ? "bg-[#6366F1]/10 font-semibold text-[#6366F1]" : "bg-[#6366F1]/20 font-semibold text-[#C7D2FE]" : ""}`}
        >
          {title}
          <span
            aria-hidden="true"
            className={`absolute bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[#FFBB38] transition-all duration-300 group-hover:w-1/2 ${pathname === url || active === title ? "w-1/2" : "w-0"}`}
          />
        </Link>
      ))}
    </nav>
  );
}

export default Navbar;
