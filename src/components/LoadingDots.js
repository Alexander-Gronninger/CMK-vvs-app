import React, { useState, useEffect } from "react";

const LoadingDots = () => {
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    // Update the dot count every 500 milliseconds
    const interval = setInterval(() => {
      setDotCount((prevCount) => (prevCount % 3) + 1);
    }, 500);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <p className="m-auto mt-[100px] w-[67px] mb-4 text-xl">
      Loading{Array(dotCount).fill(".").join("")}
    </p>
  );
};

export default LoadingDots;
