import React, { useContext, useEffect, useRef, useState } from "react";
import InputSelect from "../functions/InputSelect";
import useEnterBlur from "../hooks/useEnterBlur";
import GF2Context from "../context/GF2Context";
import { createCookie } from "../functions/Cookie";
import {
  calcCalculatedFanPerformance,
  calcMaxDesiredAirspeed,
} from "../functions/GF2Calculations";

const GF2DesiredAirspeedInput = () => {
  const { GF2Data, setGF2Data } = useContext(GF2Context);

  const minValue = 5;

  const [maxValue, setMaxValue] = useState(
    calcMaxDesiredAirspeed(GF2Data).toFixed(0)
  );

  /* Blurs the input when user presses enter or done on iphone */
  useEnterBlur();

  /* Only allows numbers and comma */
  const isValidInput = (string) => {
    return /^[\d.,]*$/.test(string);
  };

  /* Opening input stuff */
  const initialInput = (GF2Data[0] && GF2Data[0].DesiredAirspeed) || 5;
  const [input, setInput] = useState(initialInput);

  /* When loading a cookie, this updates the input state */
  useEffect(() => {
    setInput(initialInput);
  }, [GF2Data, initialInput]);

  const handleChange = (e) => {
    /* Guard clause making sure input is a number */
    if (!isValidInput(e.target.value)) {
      return console.log("only numbers are allowed");
    }

    /* Guard clause making sure if user accidentally leaves input empty, it does not remain so */
    if (e.target.value.length === 0) {
      setInput(5);
      return;
    }

    setInput(e.target.value);
  };

  /* handleBlur updates the input state and the respective context value */
  const handleBlur = (e) => {
    const checkedValue = Math.min(Math.max(e.target.value, minValue), maxValue);
    setInput(checkedValue);

    /* Updates context to reflect user input */
    setGF2Data((prevData) => {
      let newData = [...prevData];
      newData[0].DesiredAirspeed = Number(checkedValue);
      createCookie(newData);
      return newData;
    });
  };

  let inputElement = useRef(null);

  /* When user(teacher) changes QVKVRelations, max desired airspeed changes, this makes sure everything is updated just as if the user changes it themselves */
  useEffect(() => {
    const checkedValue = Math.min(
      Math.max(inputElement.current.value, minValue),
      maxValue
    );
    setInput(checkedValue);

    if (checkedValue < GF2Data[0].DesiredAirspeed) {
      console.log("updating...");

      setGF2Data((prevData) => {
        let newData = [...prevData];
        newData[0].DesiredAirspeed = Number(checkedValue);
        createCookie(newData);
        return newData;
      });
    }

    /* es-lint wants input in the dependency array, but this breaks the intended function of the input, resulting in it not being able to update */
    //eslint-disable-next-line
  }, [GF2Data]);

  useEffect(() => {
    let calculatedFanPerformance = calcCalculatedFanPerformance(GF2Data) * 100;

    console.log(calculatedFanPerformance);

    if (calculatedFanPerformance > 100) {
      console.log("decreasing.... " + calculatedFanPerformance);
      const newInput = input - 1;
      setInput(newInput);
      setGF2Data((prevData) => {
        let newData = [...prevData];
        newData[0].DesiredAirspeed = Number(newInput);
        createCookie(newData);
        return newData;
      });
      setMaxValue((prevValue) => {
        return prevValue - 1;
      });
    }
    //eslint-disable-next-line
  }, [GF2Data, input]);

  return (
    <>
      <div className="flex gap-4 w-full">
        <p className="my-auto w-[70%]">
          4. Indstil den ønskede lufthastighed (5-{maxValue} m/s)
        </p>
        <div className="grid w-fit">
          <input
            inputMode="numeric"
            key="desiredOpeningInput"
            type="text"
            id="desiredOpening"
            ref={inputElement}
            className="max-w-[70px] min-w-[20px] text-center bg-gray-200 h-10 pr-10 pl-2 col-start-1 col-end-2 row-start-1 row-end-2"
            value={input}
            onBlur={handleBlur}
            onChange={handleChange}
            onClick={InputSelect}
          />
          <p
            className="col-start-1 col-end-2 row-start-1 row-end-2 ml-auto leading-10 mr-2"
            onClick={() => {
              inputElement.current.focus();
            }}
          >
            m/s
          </p>
        </div>
      </div>
    </>
  );
};

export default GF2DesiredAirspeedInput;
