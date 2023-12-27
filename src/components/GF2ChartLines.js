import CalcMaxYValue from "../functions/CalcMaxYValue";
import CalcChartData from "../functions/CalcChartData";
import GF2Context from "../context/GF2Context";
import { useContext, useEffect, useRef, useState } from "react";

////////////////////////////////////////////////////////////////
// Dotted lines layered on top of the chart, to signify the correct range
//

const GF2ChartLines = () => {
  const { GF2Data } = useContext(GF2Context);

  /* the charts max Y value, CalcMaxYValue accepts data structure presented by CalcChartData, currently calcmaxyvalue is a constant value of 27, but it can be based on highest y value */
  const maxYValue = CalcMaxYValue(CalcChartData());

  /* Calculating percentage of desired airspeed vs max y value on chart, to be used for determining the position of chart lines */
  const percentage = GF2Data[0].DesiredAirspeed / maxYValue;

  /* Ref the chart line container, and state for tracking its height, so we know what to use percentage on for the correct margin to be applied */
  const containerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState();

  /* 2 separate useEffects to update containerHeight, otherwise it ends up with incorrect value, probably rendering cycle */
  useEffect(() => {
    setTimeout(() => {
      setContainerHeight(containerRef?.current?.clientHeight);
    }, 300);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setContainerHeight(containerRef?.current?.clientHeight);
    }, 350);
  }, []);

  /* chart container height, the percentage of that, minus some assumed chart margin, to determine how much margin should be below the lines, so they appear at correct height */
  const margin = percentage * (containerHeight - 20);

  /* div that is positioned in same grid rows/cols as the charts container, has containerRef and dotted lines inside */
  return (
    <>
      <div className="col-start-1 col-end-6 row-start-1 row-end-3 w-full h-[75%]">
        <div
          ref={containerRef}
          className={`h-full w-full flex flex-col justify-end`}
          style={{ paddingBottom: `${margin - 8}px` }}
        >
          <div className="border-b-[2px] w-full border-dotted border-black h-0"></div>
          <div className="border-b-[2px] w-full border-dotted border-black mt-12 h-0"></div>
        </div>
      </div>
    </>
  );
};

export default GF2ChartLines;
