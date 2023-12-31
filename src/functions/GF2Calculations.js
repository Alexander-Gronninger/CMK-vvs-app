// Function to get the sum of an array of numbers
const getSumOf = (data) => {
  // Use the reduce function to accumulate the sum of the numbers
  const sum = data.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return sum; // Return the sum
};

// Function to calculate airspeed1 based on an index and data
const calcAirspeed1 = (data, index) => {
  const QVKVRelation = data[index + 1]?.QVKVRelation; // Get QVKVRelation from data
  const KV = data[index + 1]?.StudentKVOpening; // Get StudentKVOpening from data
  const airspeed1 = KV * QVKVRelation; // Calculate airspeed1
  return airspeed1; // Return the calculated airspeed1
};

// Function to calculate QV based on an index and data
const calcQV = (data, index) => {
  const QVKVRelation = data[index + 1]?.QVKVRelation; // Get QVKVRelation from data
  /* Median allowed KV setting, which currently is 5, min 1 and max 10 */
  const middleAllowedKV = 5;
  const QV = middleAllowedKV * QVKVRelation; // Calculate QV
  return QV; // Return the calculated QV
};

// Function to calculate airspeed2 based on an index and data
const calcAirspeed2 = (data, index) => {
  const airspeed1 = calcAirspeed1(data, index); // Calculate airspeed1 using calcAirspeed1 function
  const airspeed1Values = [];
  for (let i = 0; i < data.length - 1; i++) {
    airspeed1Values.push(calcAirspeed1(data, i)); // Calculate airspeed1 for all elements and store in an array
  }
  const Airspeed1Sum = getSumOf(airspeed1Values); // Calculate the sum of airspeed1 values using getSumOf function

  const QVValues = [];
  for (let i = 0; i < data.length - 1; i++) {
    QVValues.push(calcQV(data, i)); // Calculate QV for all elements and store in an array
  }
  const QVSum = getSumOf(QVValues); // Calculate the sum of QV values using getSumOf function

  const airspeed2 = (QVSum / Airspeed1Sum) * airspeed1; // Calculate airspeed2
  return airspeed2; // Return the calculated airspeed2 with 2 decimal places
};

const calcAirspeedDifference = (data) => {
  if (!data || data.length < 1) {
    return 0; // or whatever default value you want when there's no data
  }

  const desiredAirspeed = data[0].DesiredAirspeed;

  const airspeedDifference = data.slice(1).reduce((acc, item, index) => {
    const calculatedValue = calcAirspeed2(data, index) * data[0].MainOpening;
    let value = Math.abs(desiredAirspeed - calculatedValue);
    return acc + value;
  }, 0);

  return airspeedDifference;
};

const calcAirspeedDifferencePercentage = (data) => {
  if (!data || data.length < 1) {
    return 0; // or whatever default value you want when there's no data
  }

  const desiredAirspeed = data[0].DesiredAirspeed;

  const airspeedDifferencePercentage =
    (calcAirspeedDifference(data) / desiredAirspeed) * 100;

  return airspeedDifferencePercentage;
};

const calcMaxDesiredAirspeed = (data) => {
  const combinedQVKVRelation = data.reduce((sum, item) => {
    // Check if the item has a QVKVRelation property
    if (item?.QVKVRelation !== undefined) {
      // Add the QVKVRelation value to the sum
      return sum + item.QVKVRelation;
    }
    // If the item doesn't have a QVKVRelation, return the current sum unchanged
    return sum;
  }, 0);

  const averageQVKVRelation = combinedQVKVRelation / (data.length - 1);

  /* Set this value to the same as maxValue in GF2QVKVRelationInput */
  const maxQVKVRelation = 5;

  const maxDesiredAirspeed = averageQVKVRelation * maxQVKVRelation;

  return maxDesiredAirspeed;
};

/* Cheatsheet stuff */
const calcCalculatedFanPerformance = (data) => {
  const airspeed2Array = data.slice(0, -1).map((_, i) => {
    const airspeed2 = calcAirspeed2(data, i);
    return airspeed2 * data[0].MainOpening;
  });

  const averageAirspeed2 = getSumOf(airspeed2Array) / (data.length - 1);

  const CalculatedFanPerformance =
    (data[0].DesiredAirspeed / averageAirspeed2) * data[0].MainOpening;

  return CalculatedFanPerformance;
};

const calcRawCalculatedKV = (data, index) => {
  const KV = data[index + 1].StudentKVOpening;

  const adjustedAirspeed2 = calcAirspeed2(data, index) * data[0].MainOpening;

  const desiredAirspeed = data[0].DesiredAirspeed;

  const rawCalculatedKV = (desiredAirspeed / adjustedAirspeed2) * KV;

  return rawCalculatedKV;
};

const calcCalculatedAdjustedKV = (data, index) => {
  const rawCalculatedKVArray = data.slice(0, -1).map((_, i) => {
    const rawCalculatedKV = calcRawCalculatedKV(data, i);
    return rawCalculatedKV;
  });

  // Find the maximum value in the array
  const maxValue = Math.max(...rawCalculatedKVArray);

  // Calculate the adjustment factor
  const adjustmentFactor = maxValue !== 0 ? 10 / maxValue : 0;

  const calculatedAdjustedKV = rawCalculatedKVArray[index] * adjustmentFactor;

  return calculatedAdjustedKV;
};

export {
  getSumOf,
  calcAirspeed1,
  calcAirspeed2,
  calcCalculatedFanPerformance,
  calcRawCalculatedKV,
  calcCalculatedAdjustedKV,
  calcAirspeedDifference,
  calcAirspeedDifferencePercentage,
  calcMaxDesiredAirspeed,
}; // Export the functions for external use
