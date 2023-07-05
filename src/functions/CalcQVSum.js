/* Sum of all QVs in provided array */
const CalcQVSum = (data) => {
  let QVSum = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].QV) {
      QVSum += data[i].QV;
    }
  }

  return QVSum;
};

export default CalcQVSum;
