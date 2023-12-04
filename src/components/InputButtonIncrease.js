import React, { useEffect, useState } from "react";

const InputButtonIncrease = ({ onClickFunction, interval }) => {
  const [intervalId, setIntervalId] = useState(null);

  const handleMouseDown = () => {
    // Trigger the click function immediately
    onClickFunction();
    // Set up the interval to repeat the click function every 200 milliseconds
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
      className="bg-increaseKV h-12 w-12 [clip-path:polygon(50%_50%,0%_100%,100%_100%)] p-0 m-0"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchMove={handleMouseUp}
    ></button>
  );
};

export default InputButtonIncrease;
