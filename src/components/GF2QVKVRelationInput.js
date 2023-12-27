import { useContext, useEffect, useState } from "react";
import useEnterBlur from "../hooks/useEnterBlur";
import InputSelect from "../functions/InputSelect";
import GF2Context from "../context/GF2Context";
import { createCookie } from "../functions/Cookie";

////////////////////////////////////////////////////////////////
// Input for setting the relation between QV and KV
//

const GF2QVKVRelationInput = ({ index, id }) => {
  const { GF2Data, setGF2Data } = useContext(GF2Context);

  /* min & max values */
  const maxInput = 5;
  const minInput = 1;
  /* Blurs the input when user presses enter or done on iphone */
  useEnterBlur();

  /* Only allows numbers and comma */
  const isValidInput = (string) => {
    return /^[\d.,]*$/.test(string);
  };

  /* In Denmark, decimals are marked with "," - this converts "." to a "," */
  const formatNumber = (value) => {
    return String(value).replace(".", ",");
  };

  /* Sets the start value to the value saved in context, or 1 */
  const initialInput = formatNumber(GF2Data[index + 1]?.QVKVRelation) || 1;
  const [input, setInput] = useState(initialInput);

  /* When GF2Data is updated, like if there is a cookie to retrieve in contextProvider, updates the input */
  useEffect(() => {
    setInput(initialInput);
  }, [GF2Data, initialInput]);

  const handleChange = (e) => {
    /* Guard clause making sure input is a number */
    if (!isValidInput(e.target.value)) {
      return console.log("only numbers are allowed");
    }

    /* Guard clauses for keeping input between the allowed range */
    if (e.target.value < minInput) {
      setInput(minInput);
      return;
    }
    if (e.target.value > maxInput) {
      setInput(maxInput);
      return;
    }

    /* Guard clause making sure if user accidentally leaves input empty, it does not remain so */
    if (e.target.value.length === 0) {
      setInput(0);
      return;
    }

    setInput(e.target.value);
  };

  /* reverts the decimal marker change, so calculations can be done */
  const parseNumber = (stringValue) => {
    return parseFloat(stringValue.replace(",", ".")) || 0;
  };

  /* handleBlur updates the input state and the respective context value */
  const handleBlur = (e) => {
    const numericValue = parseNumber(e.target.value);

    if (numericValue < minInput) {
      setInput(formatNumber(minInput));
    } else if (numericValue > maxInput) {
      setInput(formatNumber(maxInput));
    } else {
      setInput(formatNumber(numericValue));

      setGF2Data((prevData) => {
        let newData = [...prevData];
        newData[index + 1].QVKVRelation = numericValue;

        createCookie(newData);
        return newData;
      });
    }
  };

  return (
    <>
      <input
        className="max-w-[30px] m-0 p-0 text-center bg-gray-200"
        /* Index starts at 0, but the KVs are labeled 1-5, so its index + 1 to make parent components labels work */
        key={"QVKVInput" + index + 1}
        id={id + (index + 1)}
        type="numeric"
        value={input}
        /* handleBlur updates the input state and the respective context value */
        onBlur={handleBlur}
        /* handleChange updates the input state, but not the context */
        onChange={handleChange}
        /* Selects the input, so typing will replace the value */
        onClick={InputSelect}
      />
    </>
  );
};

export default GF2QVKVRelationInput;
