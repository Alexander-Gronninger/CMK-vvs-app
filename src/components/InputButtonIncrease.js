const InputButtonIncrease = ({
  onClickFunction,
  onMouseDownFunction,
  onMouseUpFunction,
}) => {
  return (
    <button
      className="bg-increaseKV h-10 w-10 [clip-path:polygon(50%_50%,0%_100%,100%_100%)] p-0 m-0"
      onClick={onClickFunction}
      /* onMouseDown={onMouseDownFunction} */
      /* onMouseUp={onMouseUpFunction} */
    ></button>
  );
};

export default InputButtonIncrease;
