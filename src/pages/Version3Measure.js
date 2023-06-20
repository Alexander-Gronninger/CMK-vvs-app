import { useContext } from "react";
import Version3Context from "../context/Version3Context";

const Version3Measure = () => {
  const { version3Data, setVersion3Data } = useContext(Version3Context);

  return (
    <>
      <h2>Målinger på tavlen</h2>

      <p>AVERAGE SPEED PLACEHOLDER</p>

      <p>1) Sæt alle kontrolventiler (KV) = 5 mm.</p>
      <p>2) Mål lufthastighed (LH) på de enkelte KV'er:</p>

      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>m/s</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(version3Data.length - 1)].map((_, index) => (
              <></>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Version3Measure;
