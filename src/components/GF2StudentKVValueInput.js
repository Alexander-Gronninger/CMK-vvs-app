import useEnterBlur from "../hooks/useEnterBlur";
import InputSelect from "../functions/InputSelect";

/* 
This component handles changing the GF2 versions KVValue from GF2Context
*/

const GF2StudentKVValueInput = ({ index, id, value, setValue }) => {
  /* Blurs the input when user presses enter or done */
  useEnterBlur();

  /* Only allows numbers and comma */
  const isValidInput = (string) => {
    return /^[\d.,]*$/.test(string);
  };

  /* The opening can be simultaneously updated from 2 places, GF2StudentKVValueInput and ValveRotation */
  /* This ensure these components values are updated whenever the other updates StudentKVOpening */
  /*   useEffect(() => {
    setValue((GF2Data[index + 1] && GF2Data[index + 1].StudentKVOpening) || "");
  }, [GF2Data, index, setValue]); */

  /* handleChange updates the input state, but not the context */
  const handleChange = (e) => {
    /* Guard clause making sure input is a number between 1-10 */
    if (
      !isValidInput(e.target.value) ||
      e.target.value < 1 ||
      e.target.value > 10
    ) {
      return console.log("only numbers between 1 and 10 are allowed");
    }

    /* Guard clause making sure if user accidentally leaves input empty, it does not remain so */
    if (e.target.value.length === 0) {
      setValue(0);
      return;
    }

    setValue(e.target.value);
  };

  /* handleBlur updates the input state and the respective context value */
  const handleBlur = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      {/* TableCss comes from parent component and is used to determine table styles in multiple documents */}
      <div>
        <input
          className="max-w-[30px] m-1 text-center bg-gray-200"
          key={"KVInput" + index}
          /* Index starts at 0, but the KVs are labeled 1-5, so its index + 1 to make parent components labels work */
          id={id + (index + 1)}
          type="numeric"
          value={value}
          /* handleBlur updates the input state and the respective context value */
          onBlur={handleBlur}
          /* handleChange updates the input state, but not the context */
          onChange={handleChange}
          /* Selects the input, so typing will replace the value */
          onClick={InputSelect}
        />
      </div>
    </>
  );
};

export default GF2StudentKVValueInput;
