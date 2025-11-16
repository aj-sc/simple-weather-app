import "./style.css";
import globeIcon from "./assets/globe.svg";
import { fetchWeatherData } from "./modules/weather-object";
import { updateMainInfo, updateConditionCards, generateHourlyCards, generateDailyCards } from "./modules/dom-manipulation";

document.querySelector("#search-icon")!.setAttribute("src", globeIcon);

const searchBtn = document.querySelector<HTMLButtonElement>("#search-btn");
const locationInput = document.querySelector<HTMLInputElement>("#location-input");

let defaultLocation: string | null = localStorage.getItem("defaultLocation");

if (!defaultLocation) {
    defaultLocation = prompt("Type the name of your current city (this would be your default location): ")
    localStorage.setItem("defaultLocation", defaultLocation!);
}

window.addEventListener("load", async () => {
    const data = await fetchWeatherData(defaultLocation!);
        console.log(data);

        updateMainInfo(data);
        updateConditionCards(data);
        generateHourlyCards(data);
        generateDailyCards(data);
});

searchBtn?.addEventListener("click", async () => {
    const locationValue: string = locationInput!.value;

    if (locationValue.trim() !== "") {
        const data = await fetchWeatherData(locationValue);
        console.log(data);

        updateMainInfo(data);
        updateConditionCards(data);
        generateHourlyCards(data);
        generateDailyCards(data);

        locationInput!.value = "";
    } else {
        alert("Error, type a valid location");
    }
});