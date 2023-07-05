import { useEffect } from "react";

/* A hook for detecting when a user presses enter(desktop) or done(tablet or phone) to then blur if the focused element is an input */

const useEnterBlur = () => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === "Enter" ||
        event.key === "Done" ||
        event.keyCode === 13
      ) {
        const focusedInput = document.activeElement;
        if (focusedInput.tagName === "INPUT") {
          focusedInput.blur();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
};

export default useEnterBlur;
