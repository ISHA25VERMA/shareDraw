import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { routes } from "./routes";

const router = createBrowserRouter(routes, { basename: "/" });

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;