import React, { useEffect, useState } from "react";

const InputButtonDecrease = ({ onClickFunction, interval }) => {
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

  const handleMouseUp = () => {
    // Clear the interval when the mouse is released
    clearInterval(intervalId);
    setIntervalId(null);
  };

  useEffect(() => {
    return () => {
      // Clear the interval when the component is unmounted
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <button
      className="bg-decreaseKV h-10 w-10 [clip-path:polygon(50%_50%,0%_0%,100%_0%)] p-0 m-0"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    ></button>
  );
};

export default InputButtonDecrease;
