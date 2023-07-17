import { useLocation, useNavigate } from "react-router-dom";
import Version3Context from "../context/Version3Context";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import LoadingDots from "../components/LoadingDots";

const Ref = () => {
  const { setVersion3Data } = useContext(Version3Context);
  const location = useLocation();
  const navigate = useNavigate();

  const decodeDataArray = (encodedData) => {
    const decodedData = decodeURIComponent(encodedData);
    return JSON.parse(decodedData);
  };

  // Component to handle setting the data from the URL query parameter

  const searchParams = new URLSearchParams(location.search);
  const encodedData = searchParams.get("data");

  useEffect(() => {
    if (encodedData) {
      const decodedData = decodeDataArray(encodedData);

      setVersion3Data(decodedData);
    }

    toast.success("Data importeret", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setTimeout(() => navigate("/GF2/"), 500);
  }, [encodedData, navigate, setVersion3Data]);

  return (
    <>
      <LoadingDots />
      <img src="../images/spinner.gif" alt="loading" />
    </>
  );
};

export default Ref;
