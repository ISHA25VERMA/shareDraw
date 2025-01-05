import React, { useLayoutEffect } from "react";
import rough from "roughjs/bundled/rough.esm";
import { drawShape } from "./shapes";
const Canvas = () => {
  const [elements, setElements] = React.useState([]);
  const [drawing, setDrawing] = React.useState(false);

  useLayoutEffect(() => {
    const canvas = document.getElementsByClassName("drawing-board")[0];
    const ctx = canvas.getContext("2d");
    const roughCanvas = rough.canvas(canvas);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    console.log(elements);
    elements.forEach(({ roughElement }) => {
      roughCanvas.draw(roughElement);
    });
  }, [elements]);

  const handleMouseDown = (e) => {
    setDrawing(true);

    const x = e.clientX;
    const y = e.clientY;

    setElements([
      ...elements,
      drawShape({ x1: x, y1: y, x2: x, y2: y, type: "rectangle" }),
    ]);
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;

    const lastElement = elements[elements.length - 1];
    const x1 = lastElement.x1;
    const y1 = lastElement.y1;

    const x2 = e.clientX;
    const y2 = e.clientY;
    const updatedElement = drawShape({ x1, y1, x2, y2, type: "rectangle" });
    const copyElements = [...elements];
    copyElements[copyElements.length - 1] = updatedElement;
    setElements(copyElements);
    console.log(e.clientX, e.clientY);
  };

  const handleMouseUp = (e) => {
    setDrawing(false);
  };
  return (
    // <div className="main" width={window.innerWidth} height={window.innerHeight}>
    <canvas
      className="drawing-board"
      height={window.innerHeight}
      width={window.innerWidth}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      Your browser does not support the HTML5 canvas tag
    </canvas>
    // </div>
  );
};

export default Canvas;
