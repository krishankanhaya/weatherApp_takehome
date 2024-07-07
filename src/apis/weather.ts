const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "http://api.weatherapi.com/v1";

export const fetchWeatherData = async (q: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${q}&days=5`
    );
    if (!response.ok) {
      throw new Error("Network response is not ok.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data: ", error);
    throw error;
  }
};
