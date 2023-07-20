import React, { useState } from "react";
import Draggable from "react-draggable";

const ValveRotation = () => {
  const [rotation, setRotation] = useState(0);
  const [size, setSize] = useState(1);

  const handleDrag = (_, { deltaX }) => {
    // Calculate the new rotation angle based on the drag
    setRotation((prevRotation) => prevRotation + deltaX);
  };

  const handleSizeChange = (e) => {
    const newSize = parseFloat(e.target.value);
    setSize(newSize);
  };

  return (
    <div
      className="w-fit h-fit rounded-[50%] origin-center cursor-grab m-0"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <Draggable
        axis="x"
        onDrag={handleDrag}
        className="m-0 block w-[25px] h-[25px]"
      >
        <img
          src="../images/Pencil-Circle.png"
          alt="Rotatable Image"
          className={`w-${size * 10} h-${size * 10}  m-0`}
        />
      </Draggable>
    </div>
  );
};

export default ValveRotation;
