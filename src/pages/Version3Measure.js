import { useContext, useState } from "react";
import Version3Context from "../context/Version3Context";
import MeasureRow from "../components/MeasureRow";
import CalcSum from "../functions/CalcSum";

const Version3Measure = () => {
  const { version3Data, setVersion3Data } = useContext(Version3Context);

  // ------------------------------------- //
  // Handling various inputs

  const [desiredMS, setDesiredMS] =
    useState(version3Data[0] && version3Data[0].desiredMS) || "";

  const handleDesiredMS = (e) => {
    setDesiredMS(e.target.value);
    setVersion3Data((prevData) => {
      let newData = [...prevData];
      if (newData[0]) {
        newData[0].desiredMS = Number(e.target.value);
      }
      return newData;
    });
  };

  const tableCss = "text-center border-[1px] border-black";

  const [desiredOpening, setDesiredOpening] =
    useState(version3Data[0] && version3Data[0].desiredOpeningPercent) || "";

  const handleDesiredOpening = (e) => {
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

  return (
    <>
      <h2>Målinger på tavlen</h2>

      <p>1) Sæt alle kontrolventiler (KV) = 5 mm.</p>
      <p>2) Mål lufthastighed (LH) på de enkelte KV'er:</p>

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
        <p>
          {"Gennemsnitlig lufthastighed beregnet: " +
            averageMS.toFixed(1) +
            "[m/s]"}
        </p>

        <div className="flex my-4 max-w-fit">
          <label htmlFor="desiredMS">3) Ønsket lufthastighed?</label>
          <div className="flex bg-gray-200 max-w-[100px] mb-6">
            <input
              type="number"
              id="desiredMS"
              className="max-w-content min-w-[10px] text-right bg-gray-200"
              value={desiredMS}
              onChange={handleDesiredMS}
            />
            <p className="leading-6">&nbsp;[m/s]</p>
          </div>
        </div>
        <div className="flex my-4 max-w-fit">
          <label htmlFor="desiredOpening">
            4) Åbning på hovedspjæld (0-100%)?
          </label>
          <div className="flex bg-gray-200 max-w-[100px] mb-6">
            <input
              key="desiredOpeningInput"
              type="text"
              id="desiredOpening"
              className="max-w-content min-w-[10px] text-right bg-gray-200"
              value={decimalToPercentage(desiredOpening)}
              onChange={handleDesiredOpening}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Version3Measure;
