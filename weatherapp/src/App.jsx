import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import { MdEdit, MdDelete } from "react-icons/md";
import MainCity from "./components/MainCity";

function App() {
  return (
    <>
      <div className="app">
        <MainCity />
        <div className="container">
          <div className="secondCity">+</div>
          <div className="thirdCity">+</div>
        </div>
      </div>
      {/* <div className="app">
        <div className="req">
          <input
            className="search-box"
            placeholder="Wpisz coś..."
            onChange={(e) => {
              setSearch(e.target.value);
              searchSuggestions();
            }}
          ></input>
          <div className="appBtn" onClick={searchWeather}>
            Wyszukaj
          </div>
        </div>

        {typeof weather.location != "undefined" ? (
          <div>
            <div>{weather.location.name}</div>
            <div>{weather.location.region}</div>
            <div>{weather.location.country}</div>
            <div>{weather.current.temp_c}°C</div>
          </div>
        ) : (
          ""
        )}
      </div> */}
    </>
  );
}

export default App;
