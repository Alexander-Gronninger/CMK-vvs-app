import React, { useState, useRef, useContext, useEffect } from "react";
import GF2Context from "../context/GF2Context";

const ValveRotation = ({
  size,
  index,
  value: opening,
  setValue: setOpening,
}) => {
  /* The context where data is stored, it is used many places so context instead of prop drilling */
  const { GF2Data } = useContext(GF2Context);

  /* Minimum and maximum opening allowed (1-10 mm) */
  const minOpening = 1;
  const maxOpening = 10;
  /* The amount of degrees that 1 in opening corresponds to */
  const degreesPerOpening = 360;

  /* References the div which contains the image */
  const imageRef = useRef(null);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [fullRotations, setFullRotations] = useState(
    Math.floor(GF2Data[index + 1] && GF2Data[index + 1].StudentKVOpening - 1)
  );
  const [rotation, setRotation] = useState(
    (opening - fullRotations - minOpening) * degreesPerOpening
  );
  const [prevAngle, setPrevAngle] = useState(
    (opening - fullRotations - minOpening) * degreesPerOpening
  );

  /* The opening can be simultaneously updated from 2 places, GF2StudentKVValueInput and ValveRotation */
  /* This ensure these components values are updated whenever the other updates StudentKVOpening */
  useEffect(() => {
    setRotation((opening - fullRotations - minOpening) * degreesPerOpening);
    setPrevAngle((opening - fullRotations - minOpening) * degreesPerOpening);
  }, [opening, fullRotations]);

  /* image size */
  const imageSize = (size && size) || "50px";

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
    if (prevAngle <= 25 && angle >= 300 && fullRotations === 0) {
      console.log("MINIMUM TEST");
      setOpening(0);
      setIsMouseDown(false);
      return;
    }
    /* If user is going towards angle of 360, rotations is at max and mouse is moving up, hit max limit */
    if (
      prevAngle >= 300 &&
      angle <= 25 &&
      fullRotations === maxOpening - minOpening - 1
    ) {
      console.log("MAXIMUM TEST");
      setOpening(maxOpening);
      setIsMouseDown(false);
      return;
    }

    /* If user is going towards angle of 0, rotations is at >0, and the mouse is moving down, decrease by 1 */
    if (prevAngle <= 25 && angle >= 300 && fullRotations >= 0) {
      console.log("Decreasing fullRotations by 1");
      setFullRotations(fullRotations - 1);
    }
    /* If user is going towards angle of 360, rotations is not at max and mouse is moving up, increase by 1 */
    if (
      prevAngle >= 300 &&
      angle <= 25 &&
      fullRotations <= maxOpening - minOpening
    ) {
      console.log("Increasing fullRotations by 1");
      setFullRotations(fullRotations + 1);
    }

    setRotation(angle);

    // Calculate new Opening value,
    setOpening(
      (fullRotations + minOpening + angle / degreesPerOpening).toFixed(2)
    );

    // Update the previous rotation with the current rotation, so we can determine rotation is going up or down
    setPrevAngle(angle);
  };

  const calculateRotationAngle = (event) => {
    /* Calculates the x and y position of the center of the rotating div */
    const centerX =
      imageRef.current.getBoundingClientRect().left +
      imageRef.current.offsetWidth / 2;
    const centerY =
      imageRef.current.getBoundingClientRect().top +
      imageRef.current.offsetHeight / 2;

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
          width: `${imageSize}`,
          height: `${imageSize}`,
        }}
        ref={imageRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        key={"ValveRotation" + index}
      >
        <img
          src="../images/Pencil-Circle.png"
          alt=""
          className={`w-${imageSize} h-${imageSize}  m-0`}
        />
      </div>
    </>
  );
};

export default ValveRotation;
