import React, { useState } from "react";

const ContinuousUpdateComponent = () => {
  const [value, setValue] = useState(0);
  var updateInterval;

  // Function to update the value
  const updateValue = () => {
    setValue((prevValue) => prevValue + 1);
  };

  // Mouse down event handler
  const handleMouseDown = () => {
    // Start the continuous update when the mouse is held down
    updateInterval = setInterval(updateValue, 100); // 500 milliseconds (half a second)
  };

  // Mouse up event handler
  const handleMouseUp = () => {
    console.log("stopping");
    // Stop the continuous update when the mouse is released
    clearInterval(updateInterval);
  };

  return (
    <div>
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{
          width: "200px",
          height: "200px",
          backgroundColor: "lightblue",
        }}
      >
        {/* Your element here */}
      </div>

      <p>Value: {value}</p>
      <button onClick={() => clearInterval(updateInterval)}></button>
    </div>
  );
};

export default ContinuousUpdateComponent;
