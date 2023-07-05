import { useContext, useState } from "react";
import InputSelect from "../functions/InputSelect";
import useEnterBlur from "../hooks/useEnterBlur";
import GF2Context from "../context/GF2Context";

const GF2MainOpening = () => {
  const { GF2Data, setGF2Data } = useContext(GF2Context);

  useEnterBlur();

  // ------------------------------------- //
  // Handling various inputs

  /* Opening input stuff */
  const [desiredOpening, setDesiredOpening] =
    useState(GF2Data[0] && GF2Data[0].MainOpening) || "";

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
    setGF2Data((prevData) => {
      let newData = [...prevData];
      if (newData[0]) {
        newData[0].MainOpening = Number(decimalValue);
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

  return (
    <input
      inputMode="numeric"
      key="desiredOpeningInput"
      type="text"
      id="desiredOpening"
      className="max-w-[40px] min-w-[10px] text-center bg-gray-200"
      value={
        isPercentSelected ? desiredOpening : decimalToPercentage(desiredOpening)
      }
      onBlur={handleDesiredOpeningBlur}
      onChange={handleDesiredOpeningChange}
      onClick={InputSelect}
    />
  );
};

export default GF2MainOpening;
