import { useContext, useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import SaveElementAsImage from "./SaveElementAsImage";
import GF2Context from "../context/GF2Context";
import { toast } from "react-toastify";

////////////////////////////////////////////////////////////////
// For sharing the settings, either copying a link, or showing / printing a QR code linking to the link
// It links to /ref... which is pages/Ref.js
//

const GF2TeacherQRLink = () => {
  const { GF2Data } = useContext(GF2Context);
  const [linkCreation, setLinkCreation] = useState();

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
    setLinkCreation(
      `https://evu-vvs-app-elev.netlify.app/ref${encodeDataArray(GF2Data)}`
    );
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

  /* check if device is phone, and then disable print function */
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

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
        {/* If mobile then dont show print button, as phone browsers dont support it */}
        {!isMobile && (
          <button
            className="m-auto block border-2 border-solid border-secondaryBG rounded p-1 col-start-1 col-end-2"
            onClick={handlePrint}
          >
            Print QR kode
          </button>
        )}
      </div>
    </>
  );
};

export default GF2TeacherQRLink;
