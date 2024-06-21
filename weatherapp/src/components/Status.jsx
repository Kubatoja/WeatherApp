import { useEffect, useState } from "react";
import { MdDelete, MdOutlineVisibility } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import { FaWind, FaCloud } from "react-icons/fa";
import { IoRainy } from "react-icons/io5";

import "../styles/status.scss";

function Status({ weather, id }) {
  const [status, setStatus] = useState(
    +localStorage.getItem(`status${id}`) || 0
  );
  const [whatStatus, setWhatStatus] = useState(
    +localStorage.getItem(`whatStatus${id}`) || 0
  );
  useEffect(() => {
    localStorage.setItem(`status${id}`, status.toString());
    localStorage.setItem(`whatStatus${id}`, whatStatus.toString());
    console.log(id);
  }, [whatStatus, status]);
  return (
    <div className="status">
      <div className="optionsBar">
        <div
          className="delete"
          onClick={() => {
            setStatus(0);
            setWhatStatus(0);
          }}
          style={{ display: status == 2 ? "block" : "none" }}
        >
          <MdDelete />
        </div>
      </div>
      <div className="container">
        <div className="newStatus">
          <div
            className="newStatusBtn"
            onClick={() => {
              setStatus(1);
            }}
            style={{ display: status == 0 ? "block" : "none" }}
          >
            +
          </div>
          <div
            className="chooseNewStatus"
            style={{ display: status == 1 ? "grid" : "none" }}
          >
            <div
              className="option s"
              onClick={() => {
                setStatus(2);
                setWhatStatus(0);
              }}
            >
              <WiHumidity />
            </div>
            <div
              className="option"
              onClick={() => {
                setStatus(2);
                setWhatStatus(1);
              }}
            >
              <FaWind />
            </div>
            <div
              className="option"
              onClick={() => {
                setStatus(2);
                setWhatStatus(2);
              }}
            >
              <FaCloud />
            </div>
            <div
              className="option hpa"
              onClick={() => {
                setStatus(2);
                setWhatStatus(3);
              }}
            >
              hPa
            </div>
            <div
              className="option"
              onClick={() => {
                setStatus(2);
                setWhatStatus(4);
              }}
            >
              <IoRainy />
            </div>
            <div
              className="option s"
              onClick={() => {
                setStatus(2);
                setWhatStatus(5);
              }}
            >
              <MdOutlineVisibility />
            </div>
          </div>
          <div
            className="statusSet"
            id="statusSet"
            style={{ display: status == 2 ? "flex" : "none" }}
          >
            <div className="statusIcon" id="statusIcon">
              <WiHumidity
                className="bigIcon"
                style={{ display: whatStatus == 0 ? "block" : "none" }}
              />
              <FaWind style={{ display: whatStatus == 1 ? "block" : "none" }} />
              <FaCloud
                style={{ display: whatStatus == 2 ? "block" : "none" }}
              />
              <IoRainy
                style={{ display: whatStatus == 4 ? "block" : "none" }}
              />
              <MdOutlineVisibility
                className="bigIcon"
                style={{ display: whatStatus == 5 ? "block" : "none" }}
              />
            </div>
            <div className="statusText" id="statusText">
              <div style={{ display: whatStatus == 0 ? "block" : "none" }}>
                {weather.current.humidity}%
              </div>
              <div style={{ display: whatStatus == 1 ? "block" : "none" }}>
                {weather.current.wind_kph}km/h
              </div>
              <div style={{ display: whatStatus == 2 ? "block" : "none" }}>
                {weather.current.cloud}%
              </div>
              <div style={{ display: whatStatus == 3 ? "block" : "none" }}>
                {weather.current.pressure_mb}hPa
              </div>
              <div style={{ display: whatStatus == 4 ? "block" : "none" }}>
                {weather.current.precip_mm}mm
              </div>
              <div style={{ display: whatStatus == 5 ? "block" : "none" }}>
                {weather.current.vis_km}km
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Status;
