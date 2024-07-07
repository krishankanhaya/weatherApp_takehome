export interface WeatherData {
    forecast: {
      forecastday: Array<{
        hour: Array<{
          condition: { icon: string; text: string };
          feelslike_c: number;
          feelslike_f: number;
          wind_kph: number;
          wind_mph: number;
          humidity: number;
          precip_in: number;
          precip_mm: number;
          time: string;
        }>;
      }>;
    };
  }