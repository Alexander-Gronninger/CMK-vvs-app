import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <main>
      <h1 className="">Velkommen til VVS-appen</h1>
      <p className="">
        Indjustering af ventilationsanlæg efter proportionalmetoden
      </p>

      <div className="border-2 border-black mx-auto max-w-fit p-2 flex gap-2 rounded-3xl">
        <Link className="" to="/Create">
          Lav en opgave
        </Link>
        <Link className="" to="/Assignment">
          Åben en opgave
        </Link>
      </div>
    </main>
  );
};

export default Welcome;
