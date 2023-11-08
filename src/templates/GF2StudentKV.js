import { useContext, useEffect, useState } from "react";
import GF2StudentKVValueInput from "../components/GF2StudentKVValueInput";
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

  /*   let updateInterval; */

  const increaseValue = () => {
    // Increase the value by 0.1, or set it to 10 if it's already greater than or equal to 10
    setValue(value < 10 ? parseFloat(Number(value + 0.1).toFixed(2)) : 10);
    console.log("increased");
  };

  const decreaseValue = () => {
    // Decrease the value by 0.1, or set it to 1 if it's already less than or equal to 1
    setValue(value > 1 ? parseFloat(Number(value - 0.1).toFixed(2)) : 1);
    console.log("decreased");
  };

  /*   const handleMouseDownOnIncreaseBtn = () => {
    updateInterval = setInterval(increaseValue, 100);
  };

  const handleMouseDownOnDecreaseBtn = () => {
    updateInterval = setInterval(decreaseValue, 100);
  };

  const handleMouseUpOnBtns = () => {
    clearInterval(updateInterval);
  }; */

  return (
    <>
      <InputButtonIncrease
        onClickFunction={increaseValue}
        /* onMouseDownFunction={handleMouseDownOnIncreaseBtn} */
        /* onMouseUpFunction={handleMouseUpOnBtns} */
      />
      {/* <p className="w-10 h-8 m-0 text-center bg-gray-200">{value}</p> */}
      <div className="py-4 border-black border-solid border-[1px] w-[40px]">
        <GF2StudentKVValueInput
          key={"KVInput" + index}
          id={"KVInput" + index}
          index={index + " p-0 m-0"}
          value={value}
          setValue={setValue}
        />
      </div>
      <InputButtonDecrease
        onClickFunction={decreaseValue}
        /* onMouseDownFunction={handleMouseDownOnIncreaseBtn} */
        /* onMouseUpFunction={handleMouseUpOnBtns} */
      />
    </>
  );
};

export default GF2StudentKV;
