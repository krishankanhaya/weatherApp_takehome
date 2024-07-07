import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { WeatherData } from "../utils/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PrecipitationChart = ({
  weatherData,
  tempUnit,
  day,
  setHour,
}: {
  weatherData: WeatherData | undefined;
  tempUnit: boolean;
  day: number;
  setHour: (hour: number) => void;
}) => {
  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const forecastData = weatherData.forecast?.forecastday?.map((day) => {
    return day?.hour?.map((hour) => {
      return {
        icon_url: "https:" + hour.condition.icon,
        temp_c: hour.feelslike_c,
        temp_f: hour.feelslike_f,
        wind_kph: hour.wind_kph,
        wind_mph: hour.wind_mph,
        humidity: hour.humidity,
        precip_in: hour.precip_in,
        precip_mm: hour.precip_mm,
        condition: hour.condition.text,
        time: hour.time,
      };
    });
  });

  const tempGraphData = forecastData?.[day]?.map((item) => {
    const hour = new Date(item?.time).getHours();
    return {
      temp: !tempUnit ? item.precip_in : item.precip_mm,
      hour: hour >= 12 ? `${hour} pm` : `${hour} am`,
    };
  });

  const handleGraphClicks = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    elements: { datasetIndex: number; index: number }[]
  ) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      setHour(index);
    }
  };

  const label_data = tempGraphData?.map((item) => item.hour);
  const temp_data = tempGraphData?.map((item) => item.temp);

  const data = {
    labels: label_data || [],
    datasets: [
      {
        label: !tempUnit
          ? "Precipitation ( Inches )"
          : "Precipitation ( Millimeters )",
        data: temp_data || [],
        backgroundColor: "#89DAFF",
        borderColor: "#89DAFF",
        tension: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    onClick: handleGraphClicks,
    plugins: {
      legend: {
        onClick: handleGraphClicks,
      },
    },
  };

  return (
    <div className="relative bg-dark">
      <Line options={options} data={data} />
    </div>
  );
};

export default PrecipitationChart;
