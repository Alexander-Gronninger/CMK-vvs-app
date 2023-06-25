import { useContext, useState } from "react";
import Version3Context from "../context/Version3Context";
import MeasureRow from "../components/MeasureRow";
import CalcSum from "../functions/CalcSum";
import SiteDescription from "../components/SiteDescription";
import H1 from "../components/H1";
import { Link } from "react-router-dom";
import InputSelect from "../functions/InputSelect";

const Version3Measure = () => {
  const { version3Data, setVersion3Data } = useContext(Version3Context);

  // ------------------------------------- //
  // Handling various inputs

  const [desiredMS, setDesiredMS] =
    useState(version3Data[0] && version3Data[0].desiredMS) || "";
  const [isMSSelected, setIsMSSelected] = useState(false);

  const handleDesiredMSChange = (e) => {
    const isValidInput = /^[\d]*%?$/.test(e.target.value);
    if (!isValidInput) {
      return console.log("only numbers are allowed");
    }
    if (e.target.value.length === 0) {
      setDesiredMS(0);
      return;
    }
    setIsMSSelected(true);
    setDesiredMS(e.target.value);
  };

  const handleDesiredMSBlur = (e) => {
    setIsMSSelected(false);
    const sanitizedInput = e.target.value.replace(/\s*\[m\/s\]$/, "");
    setDesiredMS(sanitizedInput);
    setVersion3Data((prevData) => {
      let newData = [...prevData];
      if (newData[0]) {
        newData[0].desiredMS = Number(sanitizedInput);
      }
      return newData;
    });
  };

  /* Opening input stuff */
  const [desiredOpening, setDesiredOpening] =
    useState(version3Data[0] && version3Data[0].desiredOpeningPercent) || "";

  /* the input needs to display different when it is blurred */
  const [isPercentSelected, setIsPercentSelected] = useState(false);

  const handleDesiredOpeningChange = (e) => {
    /* allows numbers and % for the input */
    const isValidInput = /^[\d.%,]*$/.test(e.target.value);
    if (
      !isValidInput ||
      Number(e.target.value) > 100 ||
      Number(e.target.value) < 0
    ) {
      return console.log("only numbers between 0 and 100 are allowed");
    }
    if (e.target.value.length === 0) {
      setDesiredOpening(0);
      return;
    }
    setIsPercentSelected(true);
    setDesiredOpening(e.target.value);
  };

  const handleDesiredOpeningBlur = (e) => {
    setIsPercentSelected(false);
    /* Getting the new input, limiting it to between 0-100 and converting to decimal value */
    const inputPercentage = e.target.value;
    /* allows numbers and % for the input */
    const isValidInput = /^[\d]*%?$/.test(inputPercentage);
    if (!isValidInput) {
      return console.log("only numbers are allowed");
    }

    /* prevents value being empty and resulting in displaying NaN */
    if (inputPercentage.length < 2) {
      setDesiredOpening(0);
      return;
    }

    const percentage = Math.min(Math.max(parseFloat(inputPercentage), 0), 100);
    const decimalValue = parseFloat(percentage) / 100;

    /* Updating the inputs state, and updating the context to reflect the new value */
    setDesiredOpening(decimalValue);
    setVersion3Data((prevData) => {
      let newData = [...prevData];
      if (newData[0]) {
        newData[0].desiredOpeningPercent = Number(decimalValue);
      }
      return newData;
    });
  };

  /* Converting the decimal value to displayed percentage */
  const decimalToPercentage = (decimalValue) => {
    const percentage = (decimalValue * 100).toString();
    return percentage.endsWith(".00")
      ? percentage.slice(0, -3) + "%"
      : percentage + "%";
  };

  let averageMS = Number(CalcSum(version3Data) / (version3Data.length - 1));

  const tableCss = "text-center border-[1px] border-black";
  const paragraphCss = "my-2";

  return (
    <>
      <SiteDescription />
      <H1>Målninger på tavlen</H1>

      <p className={paragraphCss}>1) Sæt alle kontrolventiler (KV) = 5 mm.</p>
      <p className={paragraphCss}>
        2) Mål lufthastighed (LH) på de enkelte KV'er:
      </p>

      <div>
        <table>
          <tbody>
            {[...Array(version3Data.length - 1)].map((_, index) => (
              <MeasureRow
                key={"CreationInput" + (index + 1)}
                index={index}
                isLast={false}
                tableCss={tableCss}
              />
            ))}
          </tbody>
        </table>
        <p className={paragraphCss}>
          {"Gennemsnitlig lufthastighed beregnet: " +
            averageMS.toFixed(1) +
            "[m/s]"}
        </p>

        <div className=" my-2 max-w-fit ml-0 overflow-hidden">
          <label htmlFor="desiredMS">3) Ønsket lufthastighed?&nbsp;</label>
          <input
            inputMode="numeric"
            type="text"
            id="desiredMS"
            className="max-w-[70px] min-w-[10px] text-center bg-gray-200"
            value={isMSSelected ? desiredMS : desiredMS + " [m/s]"}
            onBlur={handleDesiredMSBlur}
            onChange={handleDesiredMSChange}
            onClick={InputSelect}
          />
        </div>
        <div className=" my-2 max-w-fit ml-0">
          <label htmlFor="desiredOpening">
            4) Åbning på hovedspjæld (0-100%)?&nbsp;
          </label>
          <input
            inputMode="numeric"
            key="desiredOpeningInput"
            type="text"
            id="desiredOpening"
            className="max-w-[50px] min-w-[10px] text-center bg-gray-200"
            value={
              isPercentSelected
                ? desiredOpening
                : decimalToPercentage(desiredOpening)
            }
            onBlur={handleDesiredOpeningBlur}
            onChange={handleDesiredOpeningChange}
            onClick={InputSelect}
          />
        </div>
        <Link
          className="block m-auto w-fit border-2 border-solid border-secondaryBG rounded p-1"
          to="/v3/share"
        >
          Generer QR / Link
        </Link>
      </div>
    </>
  );
};

export default Version3Measure;
