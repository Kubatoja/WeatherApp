import "./App.scss";
import MainCity from "./components/MainCity";
import SecondaryCitites from "./components/SecondaryCitites";
import { useEffect, useState } from "react";

function App() {
  const [changeCity, setChangeCity] = useState(
    localStorage.getItem("city") || "Katowice"
  );
  const [changeCity2, setChangeCity2] = useState("Katowice");

  return (
    <>
      <div className="app">
        <MainCity changeCity={changeCity} setChangeCity2={setChangeCity2} />
        <div className="container">
          <SecondaryCitites
            setChangeCity={setChangeCity}
            changeCity2={changeCity2}
            id={1}
          />
          <SecondaryCitites
            setChangeCity={setChangeCity}
            changeCity2={changeCity2}
            id={2}
          />
        </div>
      </div>
    </>
  );
}

export default App;
