import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import SearchComponent from "./components/SearchComponent";
import Summary from "./components/Summary";
import Tab from "./components/Tab";
import Tabs from "./components/Tabs";
import LinearGraph from "./components/LinearGraph";
import Forecast from "./components/Forcast";
import { fetchWeatherData } from "./apis/weather";
import { WeatherData } from "./utils/types";
import WindChart from "./components/WindChart";
import PrecipitationChart from "./components/PrecipitationChart";
import Quotes from "./components/Quotes";
function App() {
  const [tempUnit, setTempUnit] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean[]>([true, false, false]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const d = new Date();
  const current_hour = d.getHours();
  const [day, setDay] = useState<number>(0);
  const [hour, setHour] = useState<number>(current_hour);
  const DEFAULT_CITY = "faridabad";
  const [city, setCity] = useState(DEFAULT_CITY);
  const [weatherData, setWeatherData] = useState<WeatherData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchWeatherData(city);
        setWeatherData(res);
        console.log(res);
        if (res) {
          setWeatherData(res);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [city]);

  const handleTabToggle = (index: number) => {
    setIsActive((prevState) => {
      const ns = prevState.map((_, i) => {
        if (index === i) {
          return true;
        }
        return false;
      });
      return ns;
    });
  };
  if (isLoading) return <h1>Loading....</h1>;
  return (
    <Dashboard>
      <div className="lg:px-[4rem] px-4 py-2 flex flex-col lg:flex-row justify-center gap-4 w-[100%] ">
        <div className="left w-[100%] lg:w-[50%]">
          <SearchComponent setCity={setCity} />
          <Summary
            weatherData={weatherData}
            tempUnit={tempUnit}
            setTempUnit={setTempUnit}
            day={day}
            hour={hour}
          />
          <Tabs className={`flex flex-row gap-2 mt-4 relative `}>
            <Tab
              handleTabToggle={handleTabToggle}
              isActive={isActive}
              tabIndex={0}
              heading="Temperature"
              bgColor="bg-yellow-50"
              borderColor="border-yellow-300"
              graph={
                <LinearGraph
                  weatherData={weatherData}
                  tempUnit={tempUnit}
                  day={day}
                  setHour={setHour}
                />
              }
              className={`flex flex-col gap-1`}
            />
            <span className="border border-gray-200 h-[1.5rem] mt-1"></span>
            <Tab
              handleTabToggle={handleTabToggle}
              isActive={isActive}
              tabIndex={1}
              heading="Precipitation"
              bgColor="bg-blue-50"
              borderColor="border-blue-300"
              graph={
                <PrecipitationChart
                  weatherData={weatherData}
                  tempUnit={tempUnit}
                  day={day}
                  setHour={setHour}
                />
              }
              className={`flex flex-col gap-1`}
            />
            <span className="border border-gray-200 h-[1.5rem] mt-1"></span>
            <Tab
              handleTabToggle={handleTabToggle}
              isActive={isActive}
              tabIndex={2}
              heading="Wind"
              bgColor="bg-gray-100"
              borderColor="border-gray-300"
              graph={
                <WindChart
                  weatherData={weatherData}
                  tempUnit={tempUnit}
                  day={day}
                  setHour={setHour}
                />
              }
              className={`flex flex-col gap-1`}
            />
          </Tabs>
        </div>
        <div className="right w-[100%] lg:w-[50%] mt-[50%] lg:mt-0">
          <Forecast
            weatherData={weatherData}
            tempUnit={tempUnit}
            day={day}
            setDay={setDay}
          />
          <Quotes />
          <div className="my-4 border p-2 rounded">
            <h3>Developed By : Krishan Kanhaya</h3>
            <h3>
              Github :{" "}
              <a
                href="https://github.com/krishankanhaya"
                target="blank"
                className="text-blue-400"
              >
                github.com/krishankanhaya
              </a>
            </h3>
            <h3>
              X :{" "}
              <a
                href="https://x.com/krishan_kanhaya"
                target="blank"
                className="text-blue-400"
              >
                x.com/krishan_kanhaya
              </a>
            </h3>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

export default App;
