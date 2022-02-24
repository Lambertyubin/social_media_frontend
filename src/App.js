import React from "react";
import MainRouter from "./MainRouter";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <React.StrictMode>
        <MainRouter />
      </React.StrictMode>
    </BrowserRouter>
  );
};

export default App;
