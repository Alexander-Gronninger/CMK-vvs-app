import React, { useState, useRef, useContext, useEffect } from "react";
import GF2Context from "../context/GF2Context";

/* 
The value: opening state is set from parent component, this allows for this component to be used for both KV opening and "main opening" changes.
*/

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

  useEffect(() => {
    // Attach mousedown & mouseup event listener to the entire document
    imageRef.current.addEventListener(getMouseDown(), handleMouseDown);
    document.addEventListener(getMouseUp(), handleMouseUp);

    // Clean up event listeners when the component unmounts
    return () => {
      // eslint-disable-next-line
      imageRef.current.removeEventListener(getMouseDown(), handleMouseDown);
      document.removeEventListener(getMouseUp(), handleMouseUp);
    };
    // eslint-disable-next-line
  }, []);

  /* Whether its desktop or phone */
  function getMouseDown() {
    // eslint-disable-next-line
    if (detectMobile() == "desktop") {
      return "mousedown";
    } else {
      return "touchstart";
    }
  }

  function getMouseMove() {
    // eslint-disable-next-line
    if (detectMobile() == "desktop") {
      return "mousemove";
    } else {
      return "touchmove";
    }
  }

  function getMouseUp() {
    // eslint-disable-next-line
    if (detectMobile() == "desktop") {
      return "mouseup";
    } else {
      return "touchend";
    }
  }

  //detect for mobile devices from https://www.sitepoint.com/navigator-useragent-mobiles-including-ipad/
  function detectMobile() {
    var result = navigator.userAgent.match(
      /(iphone)|(ipod)|(ipad)|(android)|(blackberry)|(windows phone)|(symbian)/i
    );

    if (result !== null) {
      return "mobile";
    } else {
      return "desktop";
    }
  }

  const [fullRotations, setFullRotations] = useState(() => {
    const initialFullRotations = Math.floor(
      GF2Data[index + 1] && GF2Data[index + 1].StudentKVOpening - 1
    );

    // Ensure it doesn't go below 0
    const limitedFullRotations = Math.max(0, initialFullRotations);

    // Ensure it doesn't go above 10
    return Math.min(10, limitedFullRotations);
  });
  const [rotation, setRotation] = useState(
    (opening - fullRotations - minOpening) * degreesPerOpening
  );

  const [prevAngle, setPrevAngle] = useState(
    (opening - fullRotations - minOpening) * degreesPerOpening
  );

  /* image size */
  const imageSize = (size && size) || "50px";

  const handleMouseDown = (event) => {
    /* When user mouseDown on the div, update the state that tracks if user is holding down their mouse */
    event.preventDefault();

    document.addEventListener(getMouseMove(), handleMouseMove);

    /* Updated various sub-states in case opening has been modified from a different component */
    setFullRotations((prevFullRotations) => {
      const newFullRotations = Math.floor(
        GF2Data[index + 1] && GF2Data[index + 1].StudentKVOpening - 1
      );

      // Ensure it doesn't go below 0
      const limitedFullRotations = Math.max(0, newFullRotations);

      // Ensure it doesn't go above 10
      return Math.min(10, limitedFullRotations);
    });
    setRotation((opening - fullRotations - minOpening) * degreesPerOpening);
    setPrevAngle((opening - fullRotations - minOpening) * degreesPerOpening);
  };

  const handleMouseUp = () => {
    document.removeEventListener(getMouseMove(), handleMouseMove);
  };

  const handleMouseMove = (event) => {
    // Calculate the new rotation value based on difference between center and mouse position
    let angle = calculateRotationAngle(event);

    // Calculate the number of full rotations completed

    /* If user is going towards angle of 0, rotations is at >0, and the mouse is moving down, decrease by 1 */
    /*     if (prevAngle >= 355 && angle <= 5) {
      console.log("Decreasing fullRotations by 1");
      setFullRotations((prevFullRotations) =>
        Math.max(0, prevFullRotations - 1)
      );
    } */

    /* If user is going towards angle of 360, rotations is not at max and mouse is moving up, increase by 1 */
    if (prevAngle >= 355 && angle <= 5) {
      console.log("Increasing fullRotations by 1");
      setFullRotations((prevFullRotations) =>
        Math.min(maxOpening, prevFullRotations + 1)
      );
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
        className="rounded-full border-black shadow-[0px_0px_10px_2px] shadow-black grid"
        style={{
          transform: `rotate(${rotation}deg)`,
          width: `${imageSize}`,
          height: `${imageSize}`,
        }}
        ref={imageRef}
        key={"ValveRotation" + index}
      >
        <div className="border-2 border-black border-full col-start-1 col-end-2 row-start-1 row-end-2 max-w-[10px] max-h-2 z-20 mt-[2px]"></div>
        <img
          src="../images/Pencil-Circle.png"
          alt=""
          className={`w-${imageSize} h-${imageSize} m-0 col-start-1 col-end-2 row-start-1 row-end-2`}
        />
      </div>
    </>
  );
};

export default ValveRotation;
