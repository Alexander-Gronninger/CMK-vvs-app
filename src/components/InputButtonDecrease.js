import React, { useEffect, useState } from "react";

////////////////////////////////////////////////////////////////
// Contains a styled button that is used to decrease.
// onClickFunction is passed to here from parent component, determines what code is executed
// as the component is used to change multiple different things, its onClickFunction needs to be customizable
// interval can also be passed down, so for things where going from min-max requires 100 clicks, interval can be lower, and 10 clicks can be higher, for better user experience

const InputButtonDecrease = ({ onClickFunction, interval }) => {
  /* useState for intervals */
  const [intervalId, setIntervalId] = useState(null);

  const handleMouseDown = () => {
    // Trigger the click function immediately
    onClickFunction();

    // Set up the interval to repeat the click function every 100 milliseconds
    const id = setInterval(() => {
      onClickFunction();
    }, (interval && interval) || 200);

    setIntervalId(id);
  };

  // Clear the interval when the mouse is released
  const handleMouseUp = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  // Clear the interval when the component is unmounted
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <button
      className="bg-decreaseKV h-12 w-12 [clip-path:polygon(50%_70%,0%_0%,100%_0%)] p-0 m-0 select-none"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      /* onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchMove={handleMouseUp} */
    ></button>
  );
};

export default InputButtonDecrease;
