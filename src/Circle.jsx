const Circle = (props) => {
  return (
    <div
      style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        backgroundColor: props.color,
        ...props.style
      }}
    />
  );
};

export default Circle;