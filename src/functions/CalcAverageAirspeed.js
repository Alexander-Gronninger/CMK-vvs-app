const CalculateAverageAirspeed = (data) => {
  const airspeedSum = data.reduce((accumulator, currentValue, index) => {
    if (currentValue.KVvalue !== undefined && index > 0) {
      const result =
        (Number(currentValue.KVvalue) / Number(data[0].desiredOpening)) *
        Number(currentValue.KVsize);
      return accumulator + result;
    }
    return accumulator;
  }, 0);

  let averageAirspeed = airspeedSum / (data.length - 1);

  return averageAirspeed;
};

export default CalculateAverageAirspeed;
