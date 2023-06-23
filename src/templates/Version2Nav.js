import { Link, Outlet } from "react-router-dom";

const Version2Nav = () => {
  const css = "text-primaryText p-[2px] px-2 m-0 leading-6 text-base";
  return (
    <>
      <nav className="bg-secondaryBG p-2 flex px-4">
        <Link className={css} to="/v2/create">
          Skab opgave
        </Link>
        <p className={css}>|</p>
        <Link className={css} to="/v2/assignment">
          Udfør opgave
        </Link>
      </nav>
      <main className="my-2 mx-6">
        <Outlet />
      </main>
    </>
  );
};

export default Version2Nav;
