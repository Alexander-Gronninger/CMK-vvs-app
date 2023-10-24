// Function to get the sum of an array of numbers
const getSumOf = (data) => {
  // Use the reduce function to accumulate the sum of the numbers
  const sum = data.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return sum; // Return the sum
};

// Function to calculate airspeed1 based on an index and GF2Data
const calcAirspeed1 = (index, GF2Data) => {
  const QVKVRelation = GF2Data[index + 1]?.QVKVRelation; // Get QVKVRelation from GF2Data
  const KV = GF2Data[index + 1]?.StudentKVOpening; // Get StudentKVOpening from GF2Data
  const airspeed1 = KV * QVKVRelation; // Calculate airspeed1
  return airspeed1; // Return the calculated airspeed1
};

// Function to calculate QV based on an index and GF2Data
const calcQV = (index, GF2Data) => {
  const QVKVRelation = GF2Data[index + 1]?.QVKVRelation; // Get QVKVRelation from GF2Data
  const AllKV = GF2Data[0]?.AllKV; // Get AllKV from GF2Data
  const QV = AllKV * QVKVRelation; // Calculate QV
  return QV; // Return the calculated QV
};

// Function to calculate airspeed2 based on an index and GF2Data
const calcAirspeed2 = (index, GF2Data) => {
  const airspeed1 = calcAirspeed1(index, GF2Data); // Calculate airspeed1 using calcAirspeed1 function
  const airspeed1Values = [];
  for (let i = 0; i < GF2Data.length - 1; i++) {
    airspeed1Values.push(calcAirspeed1(i, GF2Data)); // Calculate airspeed1 for all elements and store in an array
  }
  const Airspeed1Sum = getSumOf(airspeed1Values); // Calculate the sum of airspeed1 values using getSumOf function

  const QVValues = [];
  for (let i = 0; i < GF2Data.length - 1; i++) {
    QVValues.push(calcQV(i, GF2Data)); // Calculate QV for all elements and store in an array
  }
  const QVSum = getSumOf(QVValues); // Calculate the sum of QV values using getSumOf function

  const airspeed2 = (QVSum / Airspeed1Sum) * airspeed1; // Calculate airspeed2
  return airspeed2.toFixed(2); // Return the calculated airspeed2 with 2 decimal places
};

export { getSumOf, calcAirspeed1, calcAirspeed2 }; // Export the functions for external use
