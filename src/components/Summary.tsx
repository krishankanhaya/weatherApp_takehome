import { WeatherData } from "../utils/types";

const Summary = ({
  weatherData,
  tempUnit,
  setTempUnit,
  day,
  hour,
}: {
  weatherData: WeatherData | undefined;
  tempUnit: boolean;
  setTempUnit: (value: boolean) => void;
  day: number;
  hour: number;
}) => {
  if (!weatherData) {
    return <div>Loading...</div>;
  }

  function formatDateTime(dateString: string) {
    // Create a new Date object from the input string
    const date = new Date(dateString);

    // Format the day and time
    const options: any = {
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    return formattedDate;
  }

  const location = weatherData?.location?.name;
  const forecastData = weatherData?.forecast?.forecastday?.map((day) =>
    day?.hour?.map((hour) => ({
      icon_url: "https:" + hour.condition.icon,
      temp_c: hour.feelslike_c,
      temp_f: hour.feelslike_f,
      wind_kph: hour.wind_kph,
      wind_mph: hour.wind_mph,
      humidity: hour.humidity,
      precip_in: hour.precip_in,
      precip_mm: hour.precip_mm,
      condition: hour.condition.text,
      time: formatDateTime(hour.time),
    }))
  );

  const summaryData: any = forecastData?.[day]?.[hour];

  const toggleTempUnit = () => {
    setTempUnit(!tempUnit);
  };

  if (!summaryData) {
    return <div>Loading...</div>;
  }

  let temp;
  let precip;
  let wind;
  if (tempUnit === false) {
    temp = Math.ceil(summaryData?.temp_c ?? 0);
    precip = summaryData?.precip_in;
    wind = summaryData?.wind_kph;
  } else {
    temp = Math.ceil(summaryData?.temp_f ?? 0);
    precip = summaryData?.precip_mm;
    wind = summaryData?.wind_mph;
  }

  return (
    <div className="m-1 mt-4 px-2 flex flex-col lg:flex-row justify-between">
      <div className="flex flex-wrap lg:flex-row gap-3">
        <img
          src={summaryData?.icon_url}
          className="w-20 h-20"
          alt="Weather-Icon"
        />
        <h2 className="text-6xl text-right w-[6rem] max-w-[6rem] min-w-[6rem] text-black dark:text-white">
          {temp}
        </h2>
        <div className="flex flex-row py-1">
          <button
            className={`mr-1 h-fit items-center ${
              !tempUnit ? "text-black dark:text-white" : "text-gray-400"
            }`}
            onClick={toggleTempUnit}
          >
            °C
          </button>
          <span className="border h-[1rem] mt-1 mx-1 border-gray-600"></span>
          <button
            className={`mr-1 h-fit items-center ${
              tempUnit ? "text-black dark:text-white" : "text-gray-400"
            }`}
            onClick={toggleTempUnit}
          >
            °F
          </button>
        </div>
        <div className="mt-1 w-[100%] font-semibold text-[1.2rem] lg:font-normal lg:text-[.78rem] text-center lg:text-left lg:w-[9rem] ">
          <p className="">Precipitation: {precip}%</p>
          <p className="">Humidity: {summaryData?.humidity}%</p>
          <p className="">
            Wind: {wind} {tempUnit ? "mph" : "km/h"}
          </p>
        </div>
      </div>
      <div className="flex flex-col text-center lg:text-right mt-1 ">
        <p className="lg:text-[.8rem] font-bold">Weather: {location}</p>
        <p className="lg:text-[.78rem]">{summaryData?.time}</p>
        <p className="lg:text-[.78rem]">{summaryData?.condition}</p>
      </div>
    </div>
  );
};

export default Summary;
