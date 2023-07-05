import { Link, Outlet } from "react-router-dom";

const GF2Nav = () => {
  const css = "text-primaryText p-[2px] px-2 m-0 leading-6 text-base";
  return (
    <>
      <nav className="bg-secondaryBG p-2 flex px-4">
        {/* <Link className={css} to="/v2/create">
          Skab opgave
        </Link>
        <p className={css}>|</p>
        <Link className={css} to="/v2/assignment">
          Udfør opgave
        </Link> */}

        {/* pushes the last element to the end of the container */}
        <div className="flex-grow"></div>

        <Link className={css} to="/">
          Vælg version
        </Link>
      </nav>
      <main className="my-2 mx-4">
        <Outlet />
      </main>
    </>
  );
};

export default GF2Nav;
