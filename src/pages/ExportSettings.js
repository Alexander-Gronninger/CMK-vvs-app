import { useContext, useEffect, useState } from "react";
import Version3Context from "../context/Version3Context";
import { Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import SaveElementAsImage from "../components/SaveElementAsImage";

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
    printWindow.print();
  }

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
      <p>QR kode: skan med en anden telefon for at åbne linket</p>
      <div class="bg-white p-4 w-fit h-fit m-auto">
        <QRCodeCanvas
          id="QR-code"
          size={256}
          className="p-0 m-0"
          value={linkCreation}
        />
      </div>
      <button
        class="m-auto block border-2 border-solid border-secondaryBG rounded p-2 my-4"
        onClick={() => SaveElementAsImage("QR-code", "VVSQR.png")}
      >
        Download QR billede
      </button>
      <button
        class="m-auto block border-2 border-solid border-secondaryBG rounded p-2 my-4"
        onClick={handlePrint}
      >
        Print QR kode
      </button>
    </>
  );
};

export default ExportSettings;
