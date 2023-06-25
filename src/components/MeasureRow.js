import { useContext, useState } from "react";
import Version3Context from "../context/Version3Context";
import InputSelect from "../functions/InputSelect";
import useEnterBlur from "../hooks/useEnterBlur";

const MeasureRow = ({ tableCss, index }) => {
  const { version3Data, setVersion3Data } = useContext(Version3Context);

  useEnterBlur();

  const [tableInput, setTableInput] =
    useState(
      version3Data[index + 1] && version3Data[index + 1].KVvalue.toFixed(1)
    ) || "";

  const handleTableInputBlur = (e) => {
    if (e.target.value < 0) {
      return;
    }
    setTableInput(Number(e.target.value).toFixed(1));
    setVersion3Data((prevData) => {
      let newData = [...prevData];
      if (newData[index + 1]) {
        newData[index + 1].KVsize = Number(e.target.value).toFixed(1);
      }
      return newData;
    });
  };

  return (
    <tr>
      <td className={tableCss}>
        <label htmlFor={"TableRow1_" + (index + 1)}>
          <p className="mx-2">KV{index + 1}</p>
        </label>
      </td>
      <td className={tableCss}>
        <input
          inputMode="numeric"
          type="number"
          id={"TableRow1_" + (index + 1)}
          className="max-w-content min-w-[10px] max-w-[50px] text-center bg-gray-200"
          value={tableInput}
          onChange={(e) => {
            setTableInput(e.target.value);
          }}
          onBlur={handleTableInputBlur}
          onClick={InputSelect}
        />
      </td>
      <td className={tableCss}>
        <p className="mx-2">[m/s]</p>
      </td>
    </tr>
  );
};

export default MeasureRow;
