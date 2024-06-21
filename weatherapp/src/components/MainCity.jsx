import React from "react";
import { MdEdit, MdDelete, MdOutlineManageSearch } from "react-icons/md";
import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Status from "./Status";

import "../styles/mainCity.scss";
import rainy from "../assets/rain.jpg";
import sunny from "../assets/sunny.jpg";
import cloudy from "../assets/cloudy.jpg";
import night from "../assets/night.jpg";

function MainCity() {
  const [searchMainCity, setsearchMainCity] = useState(
    localStorage.getItem("city") || "Katowice"
  );
  const [weather, setWeather] = useState({}); //weather object
  const [suggestions, setSuggestions] = useState([]); //suggestions array
  const [settings, setSettings] = useState(false); //settings boolean
  const [isEdditing, setEdditing] = useState(false); //edditing boolean
  const [deleted, setDeleted] = useState(false); //deleted boolean
  const [adding, setAdding] = useState(false); //adding boolean

  const api = {
    base: "https://api.weatherapi.com/v1",
    key: "4d3650d6e2784fcb92b151553241706",
  };

  //https://api.weatherapi.com/v1/current.json?key=4d3650d6e2784fcb92b151553241706&q=Kalety
  function searchMainCityWeather() {
    fetch(`${api.base}/current.json?key=${api.key}&q=${searchMainCity}`).then(
      (res) => {
        res.json().then((result) => {
          if (result.error) {
            return;
          }
          setWeather(result);
          console.log(result);
        });
      }
    );
  }

  function searchSuggestions() {
    fetch(`${api.base}/search.json?key=${api.key}&q=${searchMainCity}`).then(
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

  useEffect(() => {
    searchMainCityWeather();
    console.log(weather.current);
  }, []);
  useEffect(() => {
    searchSuggestions();
    localStorage.setItem("city", searchMainCity);
    searchMainCityWeather();
  }, [searchMainCity]);
  return (
    <>
      <div
        className="mainCityPlaceholder"
        style={{
          display: deleted ? "flex" : "none",
        }}
      >
        <div
          className="addBtn"
          style={{ display: adding ? "none" : "block" }}
          onClick={() => {
            setAdding(true);
          }}
        >
          +
        </div>
        <div className="addCity" style={{ display: adding ? "flex" : "none" }}>
          <div className="changeCity">
            <div className="autofill">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="suggestion"
                  onClick={() => {
                    setsearchMainCity(
                      `${suggestion.name}, ${suggestion.country}`
                    );
                    searchMainCityWeather();
                    setSettings(false);
                    setEdditing(false);
                    setDeleted(false);
                    setAdding(false);
                  }}
                >
                  {suggestion.name}, {suggestion.country}
                </div>
              ))}
            </div>
            <div className="searchIcon">
              <MdOutlineManageSearch />
            </div>
            <div className="search">
              <input
                type="text"
                placeholder="Wpisz miasto"
                onChange={(e) => {
                  setsearchMainCity(e.target.value);
                }}
              ></input>
            </div>
          </div>
        </div>
      </div>
      {typeof weather.location != "undefined" ? (
        <div
          className="mainCity"
          style={{
            backgroundImage: `url(${weatherBg()})`,
            display: deleted ? "none" : "flex",
          }}
        >
          <div
            className="tools"
            id="tools"
            style={{
              opacity: settings ? "1" : "0",
              zIndex: settings ? "1" : "-1",
            }}
          >
            <div className="cases">
              <div
                className="changeCity"
                style={{
                  opacity: isEdditing ? "1" : "0",
                  zIndex: isEdditing ? "1" : "-1",
                }}
              >
                <div className="autofill">
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="suggestion"
                      onClick={() => {
                        setsearchMainCity(
                          `${suggestion.name}, ${suggestion.country}`
                        );
                        searchMainCityWeather();
                        setSettings(!settings);
                        setEdditing(!isEdditing);
                      }}
                    >
                      {suggestion.name}, {suggestion.country}
                    </div>
                  ))}
                </div>
                <div className="searchIcon">
                  <MdOutlineManageSearch />
                </div>
                <div className="search">
                  <input
                    type="text"
                    placeholder="Wpisz miasto"
                    onChange={(e) => {
                      setsearchMainCity(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div
                className={"edit " + (isEdditing ? "isEdditing" : "")}
                onClick={() => {
                  setEdditing(!isEdditing);
                }}
              >
                <MdEdit />
              </div>
              <div
                className="delete"
                onClick={() => {
                  searchMainCityWeather;
                  setDeleted(true);
                  setSettings(!settings);
                }}
                style={{
                  opacity: isEdditing ? "0" : "1",
                  zIndex: isEdditing ? "-1" : "1",
                }}
              >
                <MdDelete />
              </div>
            </div>
          </div>

          <div className="left">
            <div className="cityName">
              {weather.location.name}, {weather.location.country}
              <br />
              <div className="time">
                {weather.location.localtime.split(" ")[1]}
              </div>
            </div>
            <div className="temp">
              <div
                className="tempIcon"
                style={{
                  backgroundImage: `url('${weather.current.condition.icon}')`,
                }}
              ></div>
              <div className="tempDeg">{weather.current.temp_c}°C</div>
            </div>
          </div>
          <div className="right">
            <div className="rightInfo">
              <Status weather={weather} id={1} />
            </div>
            <div className="rightInfo">
              <Status weather={weather} id={2} />
            </div>
            <div className="rightInfo">
              {" "}
              <Status weather={weather} id={3} />
            </div>
            <div className="rightInfo">
              <Status weather={weather} id={4} />
            </div>
          </div>
          <div
            className="options"
            onClick={() => {
              setSettings(!settings);
              setEdditing(false);
            }}
          >
            <BsThreeDots />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default MainCity;
