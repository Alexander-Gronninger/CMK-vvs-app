const CalcSum = (data) => {
  const sum = data.reduce((accumulator, currentValue) => {
    if (currentValue.KVvalue !== undefined) {
      return accumulator + currentValue.KVvalue;
    }
    return accumulator;
  }, 0);

  return sum;
};

export default CalcSum;
