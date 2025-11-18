import { WeatherObject } from "./weather-object";
import { getTemp, to12HourFormat, uvIndexScale, get24HourData } from "./data-manipulation";
import { weatherIcons } from "./icons";

export function applyThemeBasedOnTime() {
    const hour = new Date().getHours();
    
    const isNight = hour >= 19 || hour < 5;

    if (isNight) {
        document.body.classList.add("dark-theme");
    } else {
        document.body.classList.remove("dark-theme");
    }
}

export function updateMainInfo(dataObject: WeatherObject): void {
    const mainTemp = document.querySelector("#main-temp")!;
    const highAndLow = document.querySelector("#high-low")!;
    const weatherState = document.querySelector("#weather-state")!;
    const feelsLike = document.querySelector("#temp-sensation")!;
    const stateIcon = document.querySelector<HTMLImageElement>("#state-icon")!;

    const maxTemp = Math.round(getTemp(dataObject.days, "max"));
    const minTemp = Math.round(getTemp(dataObject.days, "min"));

    mainTemp.textContent = `${dataObject.currentConditions.temp}°`;
    highAndLow.textContent = `High: ${maxTemp}° - Low: ${minTemp}°`;

    weatherState.textContent = dataObject.currentConditions.conditions;
    feelsLike.textContent = `Feels like ${Math.round(dataObject.currentConditions.feelslike)}°`;

    stateIcon.src = weatherIcons[dataObject.currentConditions.icon]!;
    stateIcon.alt = dataObject.currentConditions.conditions;
}

export function updateConditionCards(dataObject: WeatherObject): void {
    const windSpeed = document.querySelector("#wind-speed")!;
    const windDirection = document.querySelector("#wind-direction")!;

    const humidityPerc = document.querySelector("#humidity-percentage")!;
    const dewPoint = document.querySelector("#dew-point")!;

    const uvIndex = document.querySelector("#uv-index")!;
    const uvScale = document.querySelector("#uv-scale")!;

    const pressure = document.querySelector("#pressure-value")!;

    windSpeed.textContent = `${dataObject.currentConditions.windspeed} km/h`;
    windDirection.textContent = `${dataObject.currentConditions.winddir}° (degrees from the north)`;

    humidityPerc.textContent = `${dataObject.currentConditions.humidity}%`;
    dewPoint.textContent = `Dew point ${dataObject.currentConditions.dew}°`;

    uvIndex.textContent = dataObject.currentConditions.uvindex;
    uvScale.textContent = uvIndexScale(dataObject.currentConditions.uvindex);

    pressure.textContent = dataObject.currentConditions.pressure;
}

export function generateHourlyCards(dataObject: WeatherObject): void {
    const cardContainer = document.querySelector("#hourly-forecast")!;


    const hourlyData = get24HourData(dataObject.days); // Index zero represents the current day
    
    cardContainer.innerHTML = "";

    for (const hour of hourlyData) {
        const card = document.createElement("div");
        card.classList.add("hour-card");

        card.innerHTML = `
            <p>${Math.round(hour.temp)}°</p>
            <img id="hour-icon" src="${weatherIcons[hour.icon]}" alt="${hour.conditions}">
            <p>${to12HourFormat(hour.datetime)}</p>
        `;
        
        cardContainer.append(card);
    }
}

export function generateDailyCards(dataObject: WeatherObject): void {
    const cardContainer = document.querySelector("#weekly-forecast")!;
    const weekData = dataObject.days.slice(0, 7);

    cardContainer.innerHTML = "";

    for (const day of weekData) {
        const card = document.createElement("div");
        card.classList.add("day-card")

        card.innerHTML = `
            <p>${day.datetime}</p>
            <div><p>${Math.round(day.precipprob)}%</p><img id="day-icon" src="${weatherIcons[day.icon]}" alt="${day.conditions}"></div>
            <p>${Math.round(day.tempmax)}°/${Math.round(day.tempmin)}°</p>
        `;

        cardContainer.append(card);
    }
}