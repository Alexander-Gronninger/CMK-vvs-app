import { useContext, useState } from "react";
import Version3Context from "../context/Version3Context";

const MeasureRow = ({ tableCss, index }) => {
  const { Version3Data, setVersion3Data } = useContext(Version3Context);

  const [tableInput, setTableInput] =
    useState(Version3Data[index + 1] && Version3Data[index + 1].KVsize) || "";

  const handleTableInputChange = (e) => {
    if (e.target.value > 10 || e.target.value < 0) {
      return;
    }
    setTableInput(e.target.value);
    setVersion3Data((prevData) => {
      let newData = [...prevData];
      if (newData[index + 1]) {
        newData[index + 1].KVsize = Number(e.target.value);
      }
      return newData;
    });
  };

  return (
    <tr>
      <td className={tableCss}>
        <label htmlFor={"TableRow1_" + (index + 1)}>KV{index + 1}</label>
      </td>
      <td className={tableCss}>
        <input
          type="number"
          id={"TableRow1_" + (index + 1)}
          className="max-w-content min-w-[10px] max-w-[50px] text-center bg-gray-200"
          value={tableInput}
          onChange={handleTableInputChange}
        />
      </td>
    </tr>
  );
};

export default MeasureRow;
