import "./App.scss";
import MainCity from "./components/MainCity";
import SecondaryCitites from "./components/SecondaryCitites";
import { useEffect, useState } from "react";

function App() {
  return (
    <>
      <div className="app">
        <MainCity />
        <div className="container">
          <SecondaryCitites id={1} />
          <SecondaryCitites id={2} />
        </div>
      </div>
    </>
  );
}

export default App;
