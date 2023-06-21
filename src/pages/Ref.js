import { useLocation, useNavigate } from "react-router-dom";
import Version3Context from "../context/Version3Context";
import { useContext } from "react";

const Ref = () => {
  const { version3Data, setVersion3Data } = useContext(Version3Context);
  const location = useLocation();
  const navigate = useNavigate();

  const decodeDataArray = (encodedData) => {
    const decodedData = decodeURIComponent(encodedData);
    return JSON.parse(decodedData);
  };

  // Component to handle setting the data from the URL query parameter

  const searchParams = new URLSearchParams(location.search);
  const encodedData = searchParams.get("data");

  if (encodedData) {
    const decodedData = decodeDataArray(encodedData);
    console.log("updating...");
    console.log(version3Data);

    setVersion3Data(decodedData);
  }

  navigate("/");

  return (
    <>
      {/* <button onClick={() => DataFromURL()}>
        Click to fetch data from link
      </button> */}
    </>
  );
};

export default Ref;
