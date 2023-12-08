import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import LoadingDots from "../components/LoadingDots";
import GF2Context from "../context/GF2Context";
import { createCookie } from "../functions/Cookie";

const Ref = () => {
  const { setGF2Data } = useContext(GF2Context);
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

      setGF2Data(decodedData);
      createCookie(decodedData);
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

    setTimeout(() => navigate("/"), 500);
  }, [encodedData, navigate, setGF2Data]);

  return (
    <>
      <LoadingDots />
      <img src="../images/spinner.gif" alt="loading" />
    </>
  );
};

export default Ref;
