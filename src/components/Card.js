import React from "react";

const Card = ({ weatherDetails }) => {
  const windSpeed = weatherDetails?.wind?.speed * 3.6;
  return (
    <div className="mx-4 md:mx-[10rem] lg:mx-[15rem]">
      <div className="flex w-full justify-between rounded-3xl mt-[13%] px-[8%] py-3 bg-gray-500 bg-opacity-20">
        <div className="flex flex-col">
          <div className="">Feels like</div>
          <div>{weatherDetails?.main?.feels_like.toFixed(0)}°C</div>
        </div>
        <div className="flex flex-col">
          <div className="">Humidity</div>
          <div>{weatherDetails?.main?.humidity.toFixed(0)}%</div>
        </div>
        <div className="flex flex-col">
          <div className="">Wind Speed</div>
          <div>{windSpeed.toFixed(0)} km/h</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
