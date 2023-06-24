import { useContext, useEffect, useState } from "react";
import Version3Context from "../context/Version3Context";
import { Link } from "react-router-dom";

const ExportSettings = () => {
  const [linkCreation, setLinkCreation] = useState();
  const { version3Data } = useContext(Version3Context);

  const currentSiteLink = window.location.href.replace(
    window.location.pathname,
    "/ref"
  );

  /* Creating link */
  const encodeDataArray = (dataArray) => {
    const encodedData = encodeURIComponent(JSON.stringify(dataArray));
    return `?data=${encodedData}`;
  };

  useEffect(() => {
    const link = `${currentSiteLink}${encodeDataArray(version3Data)}`;
    setLinkCreation(link);
  }, [currentSiteLink, version3Data]);

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(linkCreation)
      .then(() => {
        alert("Link copied to clipboard!");
        /* Fix with better notification message, toastify */
      })
      .catch((error) => {
        console.error("Failed to copy link:", error);
        /* Fix with better notification message, toastify */
      });
  };

  return (
    <>
      <h1 className="text-center font-semibold">
        Test side til at dele indstillinger i v3, via link og eller QR kode
      </h1>
      <button
        className="m-auto block border-2 border-solid border-secondaryBG rounded p-1 my-4"
        onClick={handleCopyLink}
      >
        Kopier linket
      </button>
      <p className="text-center">Kopier manuelt</p>
      <p className="whitespace-nowrap overflow-scroll">{linkCreation}</p>
      <Link
        className="mx-auto w-fit block border-2 border-solid border-secondaryBG rounded p-2 my-4"
        to={linkCreation}
      >
        Klik for at teste linket
      </Link>
    </>
  );
};

export default ExportSettings;
