/* accepts data from CalcChartData, passed down where it is called */

const CalcMaxYValue = (data) => {
  /* CalcMaxYValue is used by GF2ScatterChart to determine what the max value should be on the chart, dynamically by finding highest "YValue" + additionalValue */
  const additionalValue = 20;

  if (!data || data.length === 0) {
    return null; // Return null for an empty array or invalid data.
  }

  let highestY = data[0].y; // Initialize with the first value.

  for (let i = 1; i < data.length; i++) {
    if (data[i].y > highestY) {
      highestY = data[i].y; // Update highestY if a higher value is found.
    }
  }

  const maxYValue = highestY + additionalValue;
  return maxYValue;
};

export default CalcMaxYValue;
