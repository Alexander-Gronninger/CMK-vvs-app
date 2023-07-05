/* Sum of all QVs in provided array */
const CalcQVSum = (data) => {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].QV) {
      sum += data[i].QV;
    }
  }

  return sum;
};

export default CalcQVSum;
