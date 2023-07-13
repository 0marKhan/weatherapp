import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  WiCloud,
  WiDaySunny,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
  WiMist,
} from "react-icons/wi";

const Weather = () => {
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState({});
  const [newLocation, setNewLocation] = useState("Peshawar");
  const [enteredLocation, setEnteredLocation] = useState("");

  useEffect(() => {
    const getLocation = async () => {
      try {
        const locationResponse = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${newLocation}&limit=1&appid=c03501503788636df869755599d3dcf4`
        );
        setLocation(locationResponse.data[0]);

        const { lat, lon } = locationResponse.data[0];
        fetchWeather(lat, lon);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchWeather = async (lat, lon) => {
      try {
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=c03501503788636df869755599d3dcf4`
        );

        setWeather(weatherResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    getLocation();
  }, [newLocation]);

  const enteredLocationHandler = (event) => {
    setEnteredLocation(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setNewLocation(enteredLocation);
    setEnteredLocation("");
  };

  let weatherIcon;

  if (weather?.weather) {
    const weatherCode = weather.weather[0]?.id;
    if (weatherCode >= 200 && weatherCode <= 232) {
      weatherIcon = <WiThunderstorm size={64} />;
    } else if (weatherCode >= 300 && weatherCode <= 321) {
      weatherIcon = <WiRain size={64} />;
    } else if (weatherCode >= 500 && weatherCode <= 531) {
      weatherIcon = <WiRain size={64} />;
    } else if (weatherCode >= 600 && weatherCode <= 622) {
      weatherIcon = <WiSnow size={64} />;
    } else if (weatherCode >= 701 && weatherCode <= 781) {
      weatherIcon = <WiFog size={64} />;
    } else if (weatherCode === 800) {
      weatherIcon = <WiDaySunny size={64} />;
    } else if (weatherCode >= 801 && weatherCode <= 804) {
      weatherIcon = <WiCloud size={64} />;
    } else {
      weatherIcon = <WiDaySunny size={64} />;
    }
  }

  return (
    <div className="weather-container">
      <form
        className="flex w-full justify-center pt-5"
        onSubmit={submitHandler}
      >
        <input
          className=" rounded-xl py-1 px-2 w-[14rem] md:w-[20rem]  text-black focus:outline-none"
          type="text"
          placeholder="City Name"
          onChange={enteredLocationHandler}
          value={enteredLocation}
        />
        <button className="ml-4" type="submit">
          Search
        </button>
      </form>

      <div className="relative top-14">
        <div className="flex flex-col items-center">
          <p className="real text-xl mb-2">{weather.name}</p>
          <h1 className="font-bold text-8xl">
            {weather?.main?.temp.toFixed(0)}
          </h1>
          {weatherIcon}
          <p className="text-2xl font-semibold">
            {weather?.weather[0]?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
