import { WeatherData } from "../utils/types";

const Forecast = ({
  weatherData,
  tempUnit,
  day,
  setDay,
}: {
  weatherData: WeatherData | undefined;
  tempUnit: boolean;
  day: number;
  setDay: (day:number) => void
}) => {
  if(!weatherData) {
    return 'Loading....'
  }

  function formatDateTime(dateString: string) {
    const date = new Date(dateString);

    if (isNaN(date)) {
      throw new Error("Invalid date string");
    }

    const options = {
      weekday: "long",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    return formattedDate;
  }

  const fsd = weatherData?.forecast?.forecastday?.map(
    (days) => {
      return {
        day: formatDateTime(days?.date),
        icon_url: days?.day?.condition?.icon,
        max_temp: !tempUnit
          ? " Max " + days.day?.maxtemp_c + "°C"
          : " Max " + days.day.maxtemp_f + " °F",
        min_temp: !tempUnit
          ? " Min " + days.day?.mintemp_c + "°C"
          : " Min " + days.day.mintemp_f + " °F",
      };
    }
  );
  return (
    <div className="my-1 px-4 relative flex flex-col justify-center gap-4">
      <p className="font-semibold text-[1.2rem] text-center w-fit m-auto">
        Future Forecast
      </p>
      <div className="flex flex-col lg:flex-row justify-center gap-4">
        {fsd.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => setDay(index)}
              className={`flex border hover:shadow-md transition-all duration-300 w-[100%] h-[100%] lg:min-w-[170px] lg:min-h-[170px]  border-gray-500 p-2 rounded  m-1 flex-col justify-center gap-2 items-center hover:cursor-pointer ${
                day === index ? "bg-[#eff6ff]" : "bg-white"
              }`}
            >
              <h3>{item?.day}</h3>
              <img
                src={item?.icon_url}
                alt="cloud-img"
                width={"50px"}
                height={"50px"}
              />
              <div className="flex flex-row justify-center gap-[3px]">
                <span className="text-[.8rem] opacity-40 ">
                  {item?.min_temp}
                </span>
                <span className="-mt-1">-</span>
                <span className="text-[.8rem] ">{item?.max_temp}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast