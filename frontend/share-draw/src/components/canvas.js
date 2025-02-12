import React, { useEffect, useLayoutEffect, useRef } from "react";
import rough from "roughjs/bundled/rough.esm";
import { drawShape } from "./shapes";
import { initSocket } from "./socket";
import { data, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
const Canvas = () => {
  const { room: paramRoomId } = useParams();
  const roomIdRef = useRef(paramRoomId || uuid());
  const roomId = roomIdRef.current;
  const [elements, setElements] = React.useState([]);
  const [drawing, setDrawing] = React.useState(false);
  const socketRef = useRef(null);
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.emit("join-room", roomId, (data) => {
        console.log("join-room", data);
        setElements(data.elements);
      });

      socketRef.current.on("drawing", (data) => {
        console.log("aa: " + JSON.stringify(data));
        setElements((elements) => [...elements, data.element]);
      });
    };
    init();
  }, []);

  useLayoutEffect(() => {
    const canvas = document.getElementsByClassName("drawing-board")[0];
    const ctx = canvas.getContext("2d");
    const roughCanvas = rough.canvas(canvas);

    // ctx.clearRect(0, 0, canvas.width, canvas.height);

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
  };

  const handleMouseUp = (e) => {
    setDrawing(false);
    socketRef.current.emit("drawing", {
      element: elements[elements.length - 1],
      roomId,
    });
  };

  return (
    <div className="main">
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
      <script src="/socket.io/socket.io.js"></script>
      <script>{``}</script>
    </div>
  );
};

export default Canvas;
