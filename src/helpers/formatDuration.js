export const formatDuration = (durationString) => {
    // Split duration string into hours, minutes, & seconds
    const [hours, minutes, seconds] = durationString.split(":");
    // Convert hours & minutes to int
    const hoursInt = parseInt(hours, 10);
    const minutesInt = parseInt(minutes, 10);
    // Create formatted duration string
    let formattedDuration = "";
    // Add hours if greater than 0
    if (hoursInt > 0) {
        formattedDuration += `${hoursInt}h `;
    }

    // Add minutes if greater than 0
    if(minutesInt > 0){
        formattedDuration += `${minutesInt}min`;
    }

    return formattedDuration;
};