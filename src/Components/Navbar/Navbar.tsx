import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../Routes/routes";
import type { NavItem } from "../../Types/navbarType";

const navItem: NavItem[] = [
  {
    path: ROUTES.DASHBOARD,
    label: "Dashboard",
  },
  {
    path: ROUTES.BOOK_SLOT,
    label: "Book Slot",
  },
  {
    path: ROUTES.VIEW_AND_MANAGE,
    label: "View & Manage",
  },
  {
    path: ROUTES.PARKING_HISTORY,
    label: "History",
  },
];

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav className="bg-blue-300 w-full h-12 flex justify-between items-center px-5">
      <div>
        <Link to={ROUTES.HOME} className="text-2xl">
          PLMS
        </Link>
      </div>

      <div className="flex items-center gap-5">
        {navItem.map((item: NavItem) => (
          <div key={item.path}>
            <Link
              to={item.path}
              className={`hover:border-b-2 pb-1 ${pathname === item.path ? "border-b-2" : ""}`}
            >
              {item.label}
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
