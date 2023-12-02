import { useContext, useEffect, useState } from "react";
/* import GF2StudentKVValueInput from "../components/GF2StudentKVValueInput"; */
import GF2Context from "../context/GF2Context";
import InputButtonIncrease from "../components/InputButtonIncrease";
import InputButtonDecrease from "../components/InputButtonDecrease";

const GF2StudentKV = ({ index }) => {
  const { GF2Data, setGF2Data } = useContext(GF2Context);

  /* Value is the KVs opening */
  /* Sets the start value to the value saved in context, or an empty string */
  const [value, setValue] = useState(
    GF2Data[index + 1] && GF2Data[index + 1].StudentKVOpening
  );

  useEffect(() => {
    updateStudentKV();
    // eslint-disable-next-line
  }, [value]);

  function updateStudentKV() {
    setGF2Data((prevData) => {
      let newData = [...prevData];
      newData[index + 1].StudentKVOpening = Number(value);
      return newData;
    });
  }

  /* Amount of increase / decrease for buttons */
  const updateAmount = 0.1;

  const increaseValue = () => {
    setValue((prevValue) => {
      // Increase the value by updateAmount, or sets it to 10 if it's already greater than or equal to 10
      const newValue =
        prevValue < 10
          ? parseFloat(Number(prevValue + updateAmount).toFixed(2))
          : 10;
      console.log("increased");
      return newValue;
    });
  };

  const decreaseValue = () => {
    setValue((prevValue) => {
      // Decrease the value by updateAmount, or sets it to 1 if it's already less than or equal to 1
      const newValue =
        prevValue > 1
          ? parseFloat(Number(prevValue - updateAmount).toFixed(2))
          : 1;
      console.log("decreased");
      return newValue;
    });
  };

  /* Update interval for buttons when held, in milliseconds */
  const interval = 100;

  return (
    <>
      <InputButtonIncrease
        onClickFunction={increaseValue}
        interval={interval}
        updateAmount={updateAmount}
      />
      {/* <p className="w-10 h-8 m-0 text-center bg-gray-200">{value}</p> */}
      <div className="w-full h-[50px] flex place-content-center place-items-center">
        <p
          className="text-center"
          key={"KVInput" + index}
          id={"KVInput" + index}
        >
          {value}
        </p>
        {/* Uncomment to get an input field */}
        {/* <GF2StudentKVValueInput
          key={"KVInput" + index}
          id={"KVInput" + index}
          index={index + " p-0 m-0"}
          value={value}
          setValue={setValue}
        /> */}
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
