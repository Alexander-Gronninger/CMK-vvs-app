const InputButtonDecrease = ({
  onClickFunction,
  onMouseDownFunction,
  onMouseUpFunction,
}) => {
  return (
    <button
      className="bg-decreaseKV h-10 w-10 [clip-path:polygon(50%_50%,0%_0%,100%_0%)] p-0 m-0"
      onClick={onClickFunction}
      /* onMouseDown={onMouseDownFunction} */
      /* onMouseUp={onMouseUpFunction} */
    ></button>
  );
};

export default InputButtonDecrease;
