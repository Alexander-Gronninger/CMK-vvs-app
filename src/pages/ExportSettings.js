import { useContext, useState } from "react";
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

  const handleLinkCreation = () => {
    const link = `${currentSiteLink}${encodeDataArray(version3Data)}`;
    setLinkCreation(link);
  };

  return (
    <>
      <main>
        <h1>Test page for exporting context settings</h1>
        <button onClick={handleLinkCreation}>Click me to generate link</button>
        <Link to={linkCreation}>Go to generated link</Link>
      </main>
    </>
  );
};

export default ExportSettings;
