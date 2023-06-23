const H1 = ({ css, children }) => {
  return (
    <h1 className={"text-center my-4 font-semibold " + css}>{children}</h1>
  );
};

export default H1;
