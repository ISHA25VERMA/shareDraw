import rough from "roughjs/bundled/rough.esm";
const generator = rough.generator();
export const drawShape = (shape) => {
  switch (shape.type) {
    case "rectangle":
      return _drawRectangle(shape);

    case "circle":
      return _drawCircle(shape);

    case "line":
      return _drawLine(shape);

    default:
      break;
  }
};

const _drawRectangle = (shape) => {
  const roughElement = generator.rectangle(
    shape.x1,
    shape.y1,
    shape.x2 - shape.x1,
    shape.y2 - shape.y1
  );
  return {
    x1: shape.x1,
    y1: shape.y1,
    x2: shape.x2,
    y2: shape.y2,
    roughElement,
  };
};

const _drawCircle = (shape) => {
  //   ctx.fillStyle = shape.color;
  //   ctx.beginPath();
  //   ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
  //   ctx.fill();
};

const _drawLine = (shape) => {
  const roughElement = generator.line(shape.x1, shape.y1, shape.x2, shape.y2);

  return {
    x1: shape.x1,
    y1: shape.y1,
    x2: shape.x2,
    y2: shape.y2,
    roughElement,
  };
};
