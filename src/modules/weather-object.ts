const API_KEY = "SN3T2C3T8GFPRBSFUPJSTNVLG";

export interface WeatherObject {
    currentConditions: any;
    days: any[];
}

function formatApiResponse(response: any): WeatherObject {
    if (!response?.currentConditions || !response?.days) {
        throw new Error("Invalid API response format");
    }

    return {
        currentConditions: response.currentConditions,
        days: response.days,
    };
}

export async function fetchWeatherData(
    location: string,
    apiKey: string = API_KEY
): Promise<WeatherObject> {
    try {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}`;
        
        const params = new URLSearchParams({
            unitGroup: "metric",
            include: "days,hours,current",
            key: apiKey,
            contentType: "json",
        });

        const response = await fetch(`${url}?${params}`);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        return formatApiResponse(data);

    } catch (error) {
        console.error(error);
        throw error;
    }
}