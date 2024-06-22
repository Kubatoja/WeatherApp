import React from "react";
import { MdSwapVert, MdDelete, MdOutlineManageSearch } from "react-icons/md";
import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Status from "./Status";

import "../styles/secondaryCitites.scss";

import rainy from "../assets/rain.jpg";
import sunny from "../assets/sunny.jpg";
import cloudy from "../assets/cloudy.jpg";
import night from "../assets/night.jpg";

function SecondaryCitites({ id, setChangeCity, changeCity2 }) {
  const [addingCity, setAddingCity] = useState(
    +localStorage.getItem(`cityState${id}`) || 0
  );
  const [weather, setWeather] = useState({}); //weather object
  const [suggestions, setSuggestions] = useState([]); //suggestions array
  const [searchSecondCity, setsearchSecondCity] = useState(
    localStorage.getItem(`city${id}`) || "Sydney"
  );
  const [options, setOptions] = useState(false); //settings boolean

  const api = {
    base: "https://api.weatherapi.com/v1",
    key: "4d3650d6e2784fcb92b151553241706",
  };

  //https://api.weatherapi.com/v1/current.json?key=4d3650d6e2784fcb92b151553241706&q=Kalety
  function searchSecondCityWeather() {
    fetch(`${api.base}/current.json?key=${api.key}&q=${searchSecondCity}`).then(
      (res) => {
        res.json().then((result) => {
          if (result.error) {
            return;
          }
          setWeather(result);
        });
      }
    );
  }

  function searchSuggestions() {
    fetch(`${api.base}/search.json?key=${api.key}&q=${searchSecondCity}`).then(
      (res) => {
        res.json().then((result) => {
          if (result.error) {
            return;
          }
          setSuggestions(result);
        });
      }
    );
  }

  function weatherBg() {
    if (weather.current != undefined) {
      if (weather.current.condition.text.includes("rain")) {
        return rainy;
      }
      if (weather.current.condition.text.includes("cloudy")) {
        return cloudy;
      } else {
        if (weather.current.is_day == 0) return night;
        else return sunny;
      }
    }
  }

  useEffect(() => {
    if (addingCity == 2 || addingCity == 0)
      localStorage.setItem(`cityState${id}`, addingCity.toString());
  }, [addingCity]);
  useEffect(() => {
    searchSuggestions();
    localStorage.setItem(`city${id}`, searchSecondCity);

    searchSecondCityWeather();
  }, [searchSecondCity]);
  return (
    <div className={`secondaryCity ${addingCity > 0 ? "" : "hoverable"}`}>
      <div
        className="adding"
        onClick={() => {
          setAddingCity(1);
        }}
        style={{
          display: addingCity == 0 ? "flex" : "none",
        }}
      >
        +
      </div>
      <div
        className="choosingCity"
        style={{ display: addingCity == 1 ? "block" : "none" }}
      >
        <div className="cityName">
          <MdOutlineManageSearch
            onClick={() => {
              searchSecondCityWeather();
            }}
          />
          <input
            type="text"
            placeholder="Search city"
            onChange={(e) => {
              setsearchSecondCity(e.target.value);
            }}
          />
        </div>
        <div className="suggestions">
          {suggestions.slice(0, 3).map((suggestion) => (
            <div
              className="suggestion"
              key={suggestion.id}
              onClick={() => {
                setsearchSecondCity(
                  `${suggestion.name}, ${suggestion.country}`
                );
                setAddingCity(2);
              }}
            >
              {suggestion.name}, {suggestion.country}
            </div>
          ))}
        </div>
      </div>
      <div
        className="weather"
        style={{
          backgroundImage: `url(${weatherBg()})`,
          display: addingCity == 2 ? "flex" : "none",
        }}
      >
        <div className="left">
          <div className="name">
            {weather.location
              ? weather.location.name + ", " + weather.location.country
              : ""}
            <br />
            <div className="clock">
              {" "}
              {weather.location ? weather.location.localtime.split(" ")[1] : ""}
            </div>
          </div>
          <div className="temp">
            <div
              className="tempIcon"
              style={{
                backgroundImage: `url(${
                  weather.current ? weather.current.condition.icon : ""
                })`,
              }}
            ></div>
            {weather.current ? weather.current.temp_c : "0"}°C{" "}
          </div>
        </div>
        <div className="right">
          <Status className="status" weather={weather} id={id * 5} />
          <Status className="status" weather={weather} id={id * 6} />
        </div>
        <div
          className="options"
          onClick={() => {
            setOptions(!options);
          }}
        >
          <BsThreeDots />
        </div>
        <div
          className="optionMenu"
          style={{ display: options ? "flex" : "none" }}
        >
          <div
            className="swap"
            onClick={() => {
              setOptions(false);
              setChangeCity(searchSecondCity);
              setsearchSecondCity(changeCity2);
            }}
          >
            <MdSwapVert />
          </div>
          <div
            className="delete"
            onClick={() => {
              setAddingCity(0);
              setOptions(false);
            }}
          >
            <MdDelete />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecondaryCitites;
