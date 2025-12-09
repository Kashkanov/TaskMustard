export const dateOnly = (dateTime: string) => {
    const date = new Date(dateTime)
    return date.toLocaleDateString('en-PH', {})
}

export const timeOnly = (dateTime: string) => {
    const date = new Date(dateTime)
    return date.toLocaleTimeString('en-PH', {})
}


export const dateOnlyFromDate = (dateTime: Date) => {
    return dateTime.toLocaleDateString("en-PH", {
        month: "short",
        day: "numeric",
    });
}


export const dateDiff = (dateTime1: string, dateTime2: string) => {
    const date1 = new Date(dateTime1);
    const date2 = new Date(dateTime2);
    const diffMs = date2.getTime() - date1.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days >= 1) {
        return `${days} day${days > 1 ? "s" : ""}`;
    } else if (hours >= 1) {
        return `${hours} hour${hours > 1 ? "s" : ""}`;
    } else if (minutes >= 1) {
        return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    } else {
        return `${seconds} second${seconds !== 1 ? "s" : ""}`;
    }
}