import { WeatherObject } from "./weather-object";
import { getTemp, to12HourFormat } from "./data-manipulation";

function updateContent(htmlObject: HTMLElement, newValue: any) {
    return htmlObject!.textContent = newValue;
}

export function updateMainInfo(dataObject: WeatherObject): void {
    const mainTemp = document.querySelector<HTMLSpanElement>("#main-temp")!;
    const tempHigh = document.querySelector<HTMLSpanElement>("#temp-high")!;
    const tempLow = document.querySelector<HTMLSpanElement>("#temp-low")!;

    const weatherState = document.querySelector<HTMLParagraphElement>("#weather-state")!;
    const feelsLike = document.querySelector<HTMLSpanElement>("#temp-sensation")!;

    updateContent(mainTemp, `${dataObject.currentConditions.temp}°`);
    updateContent(tempHigh, `${Math.round(getTemp(dataObject.days, "max"))}°`);
    updateContent(tempLow, `${Math.round(getTemp(dataObject.days, "min"))}°`);

    updateContent(weatherState, dataObject.currentConditions.conditions);
    updateContent(feelsLike, `${dataObject.currentConditions.feelslike}°`);
};

export function updateConditionCards(dataObject: WeatherObject): void {
    const windSpeed = document.querySelector<HTMLSpanElement>("#wind-speed")!;
    const windDirection = document.querySelector<HTMLParagraphElement>("#wind-direction")!;

    const humidityPerc = document.querySelector<HTMLParagraphElement>("#humidity-percentage")!;
    const dewPoint = document.querySelector<HTMLSpanElement>("#dew-value")!;

    const uvIndex = document.querySelector<HTMLParagraphElement>("#uv-index")!;
    const uvScale = document.querySelector<HTMLParagraphElement>("#uv-scale")!;

    const pressure = document.querySelector<HTMLParagraphElement>("#pressure-value")!;

    updateContent(windSpeed, dataObject.currentConditions.windspeed);
    updateContent(windDirection, dataObject.currentConditions.winddir);

    updateContent(humidityPerc, dataObject.currentConditions.humidity);
    updateContent(dewPoint, dataObject.currentConditions.dew);

    updateContent(uvIndex, dataObject.currentConditions.uvindex);
    updateContent(uvScale, dataObject.currentConditions.uvindex);

    updateContent(pressure, dataObject.currentConditions.pressure);
};

export function generateHourlyCards(dataObject: WeatherObject): void {
    const cardContainer = document.querySelector<HTMLDivElement>("#hourly-forecast")!;
    const hourlyData = dataObject.days[0].hours; // Index zero represents the current day
    
    cardContainer.innerHTML = "";

    for (const hour of hourlyData) {
        const card = document.createElement("div");
        card.classList.add("hour-card");

        card.innerHTML = `
            <p>${Math.round(hour.temp)}°</p>
            <p>${hour.conditions}</p>
            <p>${to12HourFormat(hour.datetime)}</p>
        `;
        
        cardContainer.append(card);
    }
};

export function generateDailyCards(dataObject: WeatherObject): void {
    const cardContainer = document.querySelector<HTMLDivElement>("#weekly-forecast")!;
    const weekData = dataObject.days.slice(0, 7);

    cardContainer.innerHTML = "";

    for (const day of weekData) {
        const card = document.createElement("div");
        card.classList.add("day-card")

        card.innerHTML = `
            <p>${day.datetime}</p>
            <p>${Math.round(day.temp)}</p>
            <p>${Math.round(day.tempmax)}°/${Math.round(day.tempmin)}°</p>
        `;

        cardContainer.append(card);
    }
}