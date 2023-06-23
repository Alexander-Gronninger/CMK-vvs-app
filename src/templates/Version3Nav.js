import { Link, Outlet } from "react-router-dom";

const Version3Nav = () => {
  return (
    <>
      <nav className="bg-black p-6 flex space-between">
        <Link
          className="text-white border-2 border-white rounded-2xl p-2"
          to="/v3/measurement"
        >
          Skab opgave
        </Link>
        <Link
          className="text-white border-2 border-white rounded-2xl p-2"
          to="/v3/suggested"
        >
          Udfør opgave
        </Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Version3Nav;
