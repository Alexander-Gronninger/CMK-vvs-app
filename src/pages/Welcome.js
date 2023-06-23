import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <main>
      <h1 className="m-auto mb-10 text-center font-semibold">
        Velkommen til VVS-appen
      </h1>

      <p className="text-center my-2">Vælg mellem version 2 og 3</p>

      <div className="mx-auto max-w-fit p-2 flex gap-2">
        <Link className="border-2 border-black rounded-lg p-2" to="/v2/create">
          Version 2
        </Link>
        <Link
          className="border-2 border-black rounded-lg p-2"
          to="/v3/measurement"
        >
          Version 3
        </Link>
      </div>
    </main>
  );
};

export default Welcome;
