import { Link, Outlet } from "react-router-dom";
import Version3Measure from "./Version3Measure";

const Version3 = () => {
  return (
    <>
      <main>
        <div className="flex justify-around">
          <Link className="" to="/v3/measurement">
            Målninger
          </Link>
          <Link className="" to="/v3/suggested">
            Vejl. Indst.
          </Link>
        </div>

        <h1>Indjustering af ventilationsanlæg efter proportionalmetoden</h1>
        <Outlet />
      </main>
    </>
  );
};

export default Version3;
