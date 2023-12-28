import { useContext, useEffect, useRef, useState } from "react";
import GF2Context from "../context/GF2Context";
import InputButtonIncrease from "./InputButtonIncrease";
import InputButtonDecrease from "./InputButtonDecrease";
import NumberFormatter from "../functions/NumberFormatter";
import { createCookie } from "../functions/Cookie";

////////////////////////////////////////////////////////////////
// Student KV input, displays & changes KV opening
//

const GF2StudentKV = ({ index }) => {
  const { GF2Data, setGF2Data } = useContext(GF2Context);

  const initialValue =
    GF2Data[index + 1] && GF2Data[index + 1].StudentKVOpening.toFixed(0);
  const [value, setValue] = useState(initialValue);

  /* When GF2Data is updated, like if there is a cookie to retrieve in contextProvider, updates the input */
  useEffect(() => {
    setValue(initialValue);
  }, [GF2Data, initialValue]);

  /* Updates GF2Data & cookie with new studentKVOpening */
  function updateStudentKV() {
    setGF2Data((prevData) => {
      if (prevData[index + 1]?.StudentKVOpening !== Number(value)) {
        let newData = [...prevData];
        newData[index + 1].StudentKVOpening = Number(value);

        createCookie(newData);
        return newData;
      }
      return prevData;
    });
  }

  /* for tracking if its initial render, in which case dont execute updateGF2Data in the useEffect */
  const isInitialRender = useRef(true);
  useEffect(() => {
    // Check if it's not the initial render
    if (!isInitialRender.current) {
      updateStudentKV();
    } else {
      // It's the initial render, set the ref to false
      isInitialRender.current = false;
    }
    // eslint-disable-next-line
  }, [value]);

  /* Amount of increase / decrease for buttons */
  const updateAmount = 1;

  const increaseValue = () => {
    setValue((prevValue) => {
      // Increase the value by updateAmount, or sets it to 10 if it's already greater than or equal to 10
      const newValue =
        prevValue < 10
          ? parseFloat(Number(Number(prevValue) + updateAmount).toFixed(0))
          : 10;
      return newValue;
    });
  };

  const decreaseValue = () => {
    setValue((prevValue) => {
      // Decrease the value by updateAmount, or sets it to 1 if it's already less than or equal to 1
      const newValue =
        prevValue > 1
          ? parseFloat(Number(Number(prevValue) - updateAmount).toFixed(0))
          : 1;
      return newValue;
    });
  };

  /* Update interval for buttons when held, in milliseconds */
  const interval = 400;

  return (
    <>
      <InputButtonIncrease
        onClickFunction={increaseValue}
        interval={interval}
        updateAmount={updateAmount}
      />
      {/* <p className="w-10 h-8 m-0 text-center bg-gray-200">{value}</p> */}
      <div className="w-full h-[50px] flex place-content-center place-items-center select-none">
        <p
          className="text-center"
          key={"KVInput" + index}
          id={"KVInput" + index}
        >
          <NumberFormatter number={value} />
        </p>
      </div>
      <InputButtonDecrease
        onClickFunction={decreaseValue}
        interval={interval}
        updateAmount={updateAmount}
      />
    </>
  );
};

export default GF2StudentKV;
