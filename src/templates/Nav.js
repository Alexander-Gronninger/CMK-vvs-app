import { Link, Outlet } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav className="bg-black p-6 flex space-between">
        <Link
          className="text-white border-2 border-white rounded-2xl p-2"
          to="/create"
        >
          Skab opgave
        </Link>
        <Link
          className="text-white border-2 border-white rounded-2xl p-2"
          to="/assignment"
        >
          Udfør opgave
        </Link>
        <Link
          className="text-white border-2 border-white rounded-2xl p-2"
          to="/v3/measurement"
        >
          Version 3
        </Link>
      </nav>
      <Outlet />
    </>
  );
};

export default Nav;
