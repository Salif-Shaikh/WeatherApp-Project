import React, { useState } from "react";
import axios from "axios";

const api = {
  key: "a6bc244f057d38bd104009e5d359b3a7",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState("");
  // const [query, setQuery] = useState("");

  // const search = evt => {
  //   if (evt.key === "Enter") {
  //     fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
  //       .then(res => res.json())
  //       .then(result => {
  //         setWeather(result);
  //         setQuery("");
  //         console.log(result);
  //       });
  //   }
  // };

  const search = async event => {
    if (event.key === "Enter") {
      const response = await axios.get(
        `${api.base}weather?q=${city}&appid=${api.key}&units=metric`
      );
      setWeather(response.data);
      // setCity("");
      console.log(weather);
    }
  };

  const dateBuilder = d => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  // const updateClassName = () => {
  //   if ((weather.weather[0].main = "Cloud")) {
  //     return "app cloud";
  //   } else if ((weather.weather[0].main = "Rain")) {
  //     return "app rain";
  //   } else if ((weather.weather[0].main = "Clear")) {
  //     return "app clear";
  //   } else if ((weather.weathe[0].main = "Strom")) {
  //     return "app strom";
  //   } else {
  //     return "app";
  //   }
  // };
  // `${updateClassName}`
  // typeof weather.main != "undefined"
  //   ? weather.main.temp > 16
  //     ? "app warm"
  //     : "app"
  //   : "app"
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 22
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter City's Name..."
            onChange={e => setCity(e.target.value)}
            value={city}
            onKeyPress={search}
            // onInput={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
              <div className="weatherInfo">
                <div className="infoItems">
                  <div className="infoHeading">Real Feel: </div>
                  <div className="info">{weather.main.feels_like} °c</div>
                </div>
                <div className="infoItems">
                  <div className="infoHeading">Pressure: </div>
                  <div className="info">{weather.main.pressure}mbar</div>
                </div>
                <div className="infoItems">
                  <div className="infoHeading">Wind Speed: </div>
                  <div className="info">
                    {Math.round(weather.wind.speed * 1.609)}km/h
                  </div>
                </div>
                <div className="infoItems">
                  <div className="infoHeading">Humidity: </div>
                  <div className="info">{weather.main.humidity}%</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
