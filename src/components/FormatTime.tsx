import React from "react";

interface FormatTimeProps {
    seconds: number;
    includeMilliseconds?: boolean;
    secondsPadding?: number;
    millisecondsDecimals?: number;
}

const FormatTime: React.FC<FormatTimeProps> = ({
    seconds,
    includeMilliseconds = true,
    secondsPadding = 2,
    millisecondsDecimals = 2,
}) => {
    if (seconds < 0) {
        throw new Error("Seconds cannot be negative");
    }

    const minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);

    let formattedTime = `${minutes
        .toString()
        .padStart(secondsPadding, "0")}:${remainingSeconds
        .toString()
        .padStart(secondsPadding, "0")}`;

    if (includeMilliseconds) {
        let milliseconds = seconds - Math.floor(seconds);
        const factor = Math.pow(10, millisecondsDecimals);
        milliseconds = Math.round(milliseconds * factor);

        // Adjust for rounding that might exceed the expected decimal places due to the factor
        if (milliseconds === factor) {
            remainingSeconds += 1;
            milliseconds = 0; // Reset milliseconds after rounding up
        }

        const millisecondsString = milliseconds
            .toString()
            .padStart(millisecondsDecimals, "0");
        formattedTime += `.${millisecondsString}`;
    }

    return formattedTime;
};

export default FormatTime;
