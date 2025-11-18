export interface HourData {
  cloudcover: number;
  conditions: string;
  datetime: string;
  datetimeEpoch: number;
  dew: number;
  feelslike: number;
  humidity: number;
  icon: string;
  precip: number;
  precipprob: number;
  preciptype: string[];
  pressure: number;
  severerisk: number;
  snow: number;
  snowdepth: number;
  solarradiation: number;
  solarenergy: number | null;
  source: string;
  stations: string[] | null;
  temp: number;
  uvindex: number;
  visibility: number;
  winddir: number;
  windgust: number | null;
  windspeed: number;
};

interface DailyData {
  hours: HourData[];
};

// const weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]; Not used


export function getTemp(data: any, tempPoint: string): number {
    return tempPoint === "min" ? data[0].tempmin : data[0].tempmax;
}

export function to12HourFormat(dateString: string): string {
    const hour = Number(dateString.slice(0, 2));

    if (hour === 0) return "12 AM";
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return `12 PM`;
    
    return `${Number(hour) - 12} PM`;
}

export function uvIndexScale(uvIndex: number): string {
    if (uvIndex >= 0 && uvIndex <= 2) {
        return "Low";
    } else if (uvIndex >= 3 && uvIndex <= 5) {
        return "Moderate";
    } else if (uvIndex >= 6 && uvIndex <= 7) {
        return "High";
    } else if (uvIndex >= 8 && uvIndex <= 10) {
        return "Very High";
    } else if (uvIndex >= 11) {
        return "Extreme";
    } else {
        return "Invalid";
    }
}

export function get24HourData(dailyData: DailyData[]): HourData[] {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    const remainingHoursToday = dailyData[0]!.hours.filter(
        (hourRow: { datetime: any; }) => Number(hourRow.datetime.slice(0, 2)) >= currentHour);

    const pendingHoursTomorrow = dailyData[1]!.hours.filter(
        (hourRow: { datetime: any; }) => Number(hourRow.datetime.slice(0, 2)) <= currentHour);

    return [...remainingHoursToday, ...pendingHoursTomorrow];
}

/*

Works but doesn't look as good as I thought in the UI

function getMonthShort(monthNumber: number): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return months[monthNumber]!;
}

export function formatDate(dateString: string): string {
    const [year, month, day] = dateString.split("-").map(Number);

    const dayNumber = new Date(year!, month! - 1, day!).getDay();
    const weekDay = weekDays[dayNumber]!;
    const formattedString = `${weekDay}, ${getMonthShort(month! - 1)} ${day}`;

    return formattedString;
} */