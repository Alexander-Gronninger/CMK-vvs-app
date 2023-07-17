import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import SaveElementAsImage from "../components/SaveElementAsImage";
import GF2Context from "../context/GF2Context";
import { toast } from "react-toastify";

const ExportSettings = () => {
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
      <h1 className="text-center font-semibold">
        Del indstillinger via link eller QR kode
      </h1>
      <button
        className="m-auto block border-2 border-solid border-secondaryBG rounded p-1 my-4"
        onClick={handleCopyLink}
      >
        Kopier linket
      </button>
      <Link
        className="mx-auto w-fit block border-2 border-solid border-secondaryBG rounded p-2 my-4"
        to={linkCreation}
      >
        Klik for at teste linket
      </Link>
      <p>QR kode: skan med en anden telefon for at åbne linket</p>
      <div className="bg-white p-4 w-fit h-fit m-auto">
        <QRCodeCanvas
          id="QR-code"
          size={256}
          className="p-0 m-0"
          value={linkCreation}
        />
      </div>
      <button
        className="m-auto block border-2 border-solid border-secondaryBG rounded p-2 my-4"
        onClick={() => SaveElementAsImage("QR-code", "VVS-QR.png")}
      >
        Download QR billede
      </button>
      <button
        className="m-auto block border-2 border-solid border-secondaryBG rounded p-2 my-4"
        onClick={handlePrint}
      >
        Print QR kode
      </button>
    </>
  );
};

export default ExportSettings;
