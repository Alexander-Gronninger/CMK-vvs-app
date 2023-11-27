import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import SaveElementAsImage from "./SaveElementAsImage";
import GF2Context from "../context/GF2Context";
import { toast } from "react-toastify";

const GF2TeacherQRLink = () => {
  const [linkCreation, setLinkCreation] = useState();
  const { GF2Data } = useContext(GF2Context);

  const currentSiteLink = window.location.href.replace(
    window.location.pathname,
    "/GF2/ref"
  );

  /* Creating link */
  const encodeDataArray = (dataArray) => {
    const encodedData = encodeURIComponent(JSON.stringify(dataArray));
    return `?data=${encodedData}`;
  };

  useEffect(() => {
    const link = `${currentSiteLink}${encodeDataArray(GF2Data)}`;
    setLinkCreation(link);
  }, [currentSiteLink, GF2Data]);

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(linkCreation)
      .then(() => {
        toast.success("Link kopieret!");
      })
      .catch((error) => {
        toast.error("Link kan ikke kopieres! Tjek konsollen");
        console.log(error);
      });
  };

  function handlePrint() {
    const qrCodeCanvas = document.getElementById("QR-code");
    const qrCodeImage = new Image();
    qrCodeImage.src = qrCodeCanvas.toDataURL("image/png");

    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      "<html><head><title>Print QR Code</title></head><body>"
    );
    printWindow.document.write('<img src="' + qrCodeImage.src + '" />');
    printWindow.document.write("</body></html>");
    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.print();
      setTimeout(() => {
        printWindow.close();
      }, 50);
    };
  }

  return (
    <>
      <div className="grid gap-2">
        <h2 className="text-center font-semibold h-fit w-fit col-start-1 col-end-2 row-start-1 row-end-2">
          5. Generér QR kode eller kopier link
        </h2>
        <button
          className="m-auto block border-2 border-solid border-secondaryBG rounded p-1 col-start-1 col-end-2"
          onClick={handleCopyLink}
        >
          Kopier linket
        </button>
        <div className="bg-white p-2 w-[216px] h-fit m-auto col-start-2 col-end-3 row-start-1 row-end-6">
          <p className="text-center">QR kode</p>
          <QRCodeCanvas
            id="QR-code"
            size={200}
            className="p-0 m-0"
            value={linkCreation}
          />
        </div>
        <button
          className="m-auto block border-2 border-solid border-secondaryBG rounded p-1 col-start-1 col-end-2"
          onClick={() => SaveElementAsImage("QR-code", "VVS-QR.png")}
        >
          Download QR billede
        </button>
        <button
          className="m-auto block border-2 border-solid border-secondaryBG rounded p-1 col-start-1 col-end-2"
          onClick={handlePrint}
        >
          Print QR kode
        </button>
        <Link
          className="m-auto block border-2 border-solid border-secondaryBG rounded p-1 col-start-1 col-end-2 text-center"
          to={linkCreation}
        >
          Klik for at teste linket
        </Link>
      </div>
    </>
  );
};

export default GF2TeacherQRLink;