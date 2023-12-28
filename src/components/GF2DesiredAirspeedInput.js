import React, { useContext, useEffect, useRef, useState } from "react";
import InputSelect from "../functions/InputSelect";
import useEnterBlur from "../hooks/useEnterBlur";
import GF2Context from "../context/GF2Context";
import { createCookie } from "../functions/Cookie";
import {
  calcCalculatedFanPerformance,
  calcMaxDesiredAirspeed,
} from "../functions/GF2Calculations";

////////////////////////////////////////////////////////////////
// Input for showing and changing desired airspeed
//

const GF2DesiredAirspeedInput = () => {
  const { GF2Data, setGF2Data } = useContext(GF2Context);

  /* min & max values that may be entered */
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

  /* inputState */
  const initialInput = (GF2Data[0] && GF2Data[0].DesiredAirspeed) || 5;
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

    /* if input is empty, set it to minValue */
    if (e.target.value.length === 0) {
      setInput(minValue);
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

  /*  */
  /* When GF2Data is updated, ie by changing QVKVRelation, decreases maxValue & desiredAirspeed if the fanPerformance needs to be over 100% to attain correct settings, or update maxValue */
  useEffect(() => {
    let calculatedFanPerformance = calcCalculatedFanPerformance(GF2Data) * 100;

    /* if over 100, decrease input by 1, update GF2Data, cookie & maxValue to reflect */
    if (calculatedFanPerformance > 100) {
      const newInput = input - 1;
      setInput(newInput);
      setGF2Data((prevData) => {
        let newData = [...prevData];
        newData[0].DesiredAirspeed = Number(newInput);
        createCookie(newData);
        return newData;
      });
      setMaxValue(newInput);
    } /* otherwise update maxValue again */ else {
      setMaxValue(calcMaxDesiredAirspeed(GF2Data).toFixed(0));
    }
    //eslint-disable-next-line
  }, [GF2Data, input]);

  /*  */
  /* need to ref the element for below useEffect, and to focus if user press on text */
  let inputElement = useRef(null);

  /* maxValue is dependent on QVKVRelation, so when that is updated, this checks to make sure desiredAirspeed does not exceed the new maxValue */
  useEffect(() => {
    /* checkedValue to is within min/max value bounds */
    const checkedValue = Math.min(
      Math.max(inputElement.current.value, minValue),
      maxValue
    );
    setInput(checkedValue);

    /* if checkedValue is lower than desiredAirspeed, update desiredAirspeed in GF2Data & cookie to be checkedValue */
    if (checkedValue < GF2Data[0].DesiredAirspeed) {
      setGF2Data((prevData) => {
        let newData = [...prevData];
        newData[0].DesiredAirspeed = Number(checkedValue);
        createCookie(newData);
        return newData;
      });
    }

    /* es-lint wants input in the dependency array, but this breaks the intended function of the input, resulting in it not being able to update when changed */
    //eslint-disable-next-line
  }, [GF2Data]);

  return (
    <>
      <div className="flex gap-4 w-full">
        <p className="my-auto w-[70%]">
          4. Indstil den ønskede lufthastighed (5-{maxValue} m/s)
        </p>
        {/* p is on top of input, but offset so that input number is followed by p(m/s), to avoid having (m/s) in input which is numeric */}
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
