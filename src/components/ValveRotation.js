import React, { useState, useRef } from "react";

const ValveRotation = () => {
  const imageRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [opening, setOpening] = useState(1);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [prevY, setPrevY] = useState(0);
  const [fullRotations, setFullRotations] = useState(0);

  /* Minimum and maximum opening allowed (1-10 mm) */
  const minOpening = 1;
  const maxOpening = 10;
  /* The amount of degrees that 1 in opening corresponds to */
  const degreesPerOpening = 360;

  const handleMouseDown = (event) => {
    event.preventDefault();
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (event) => {
    if (!isMouseDown) return;

    // Calculate the new rotation value based on difference between center and mouse position
    let angle = calculateRotationAngle(event);

    // Calculate the number of full rotations completed
    /* If user is going towards angle of 0, rotations is at 0, and the mouse is moving down, hit minimum limit */
    if (angle < 5 && fullRotations === 0 && event.pageY > prevY) {
      console.log("MINIMUM TEST");
      setIsMouseDown(false);
      return;
    }
    /* If user is going towards angle of 360, rotations is at max and mouse is moving up, hit max limit */
    if (
      angle === 360 &&
      fullRotations === maxOpening - minOpening &&
      event.pageY < prevY
    ) {
      console.log("MAXUMUM TEST");
      setIsMouseDown(false);
      return;
    }

    /* If user is going towards angle of 0, rotations is at >0, and the mouse is moving down, decrease by 1 */
    if (angle < 5 && fullRotations >= 0 && event.pageY > prevY) {
      console.log("Decreasing fullRotations by 1");
      setFullRotations(fullRotations - 1);
    }
    /* If user is going towards angle of 360, rotations is not at max and mouse is moving up, increase by 1 */
    if (
      angle === 360 &&
      fullRotations <= maxOpening - minOpening &&
      event.pageY < prevY
    ) {
      console.log("Increasing fullRotations by 1");
      setFullRotations(fullRotations + 1);
    }

    setRotation(angle);

    // Calculate new Opening value, minus fullRotations,
    setOpening(
      (fullRotations + minOpening + angle / degreesPerOpening).toFixed(2)
    );

    // Update the previous Y-coordinate with the current Y-coordinate, so we can determine if mouse is moving up or down
    setPrevY(event.pageY);
  };

  const calculateRotationAngle = (event) => {
    /* Calculates the x and y position of the center of the rotating div */
    const centerX =
      imageRef.current.offsetLeft + imageRef.current.offsetWidth / 2;
    const centerY =
      imageRef.current.offsetTop + imageRef.current.offsetHeight / 2;

    /* Difference between center and mouse position */
    const deltaX = event.pageX - centerX;
    const deltaY = event.pageY - centerY;

    // Calculate the new rotation value based on difference between center and mouse position
    return (Math.atan2(deltaY, deltaX) * 180) / Math.PI + 180;
  };

  return (
    <>
      <div
        className="rounded-full border-black shadow-[0px_0px_10px_2px] shadow-black"
        style={{
          transform: `rotate(${rotation}deg)`,
          width: `50px`,
          height: `50px`,
        }}
        ref={imageRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <img
          src="../images/Pencil-Circle.png"
          alt=""
          className={`w-{50px} h-{50px}  m-0`}
        />
      </div>
      <div className="text-center">{`Opening: ${opening}`}</div>
    </>
  );
};

export default ValveRotation;
