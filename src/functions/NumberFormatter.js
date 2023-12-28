////////////////////////////////////////////////////////////////
// in Denmark, decimal is marked with "," and not "."
//

const NumberFormatter = ({ number }) => {
  const formatNumber = (value) => {
    // Convert the number to a string and replace the decimal point with a comma
    return String(value).replace(".", ",");
  };

  return <span>{formatNumber(number)}</span>;
};

export default NumberFormatter;
