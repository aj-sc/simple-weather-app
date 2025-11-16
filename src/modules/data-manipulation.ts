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