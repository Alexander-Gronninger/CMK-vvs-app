const H1 = ({ css, children }) => {
  return <h1 className={"my-4 font-semibold " + css}>{children}</h1>;
};

export default H1;
