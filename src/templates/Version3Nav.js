import { Link, Outlet } from "react-router-dom";

const Version3Nav = () => {
  const css = "text-primaryText p-[2px] px-2 m-0 leading-6 text-base";
  return (
    <>
      <nav className="bg-secondaryBG p-2 flex px-4">
        <Link className={css} to="/v3/measurement">
          Indtast
        </Link>
        <p className={css}>|</p>
        <Link className={css} to="/v3/suggested">
          Vejl. Inds.
        </Link>
      </nav>
      <main className="my-2 mx-4">
        <Outlet />
      </main>
    </>
  );
};

export default Version3Nav;
