import Canvas from "../components/canvas";

export const routes = [
  {
    path: "/",
    element: <Canvas />,
  },
  {
    path: "/:room",
    element: <Canvas />,
  },
];
