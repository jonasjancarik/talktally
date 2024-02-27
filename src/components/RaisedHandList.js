import React, { useState, useEffect } from 'react';

function RaisedHandList({ speakers, onToggleHand }) {
    // Sort speakers by the time their hand was raised
    const sortedSpeakers = speakers.sort((a, b) => a.handRaisedTime - b.handRaisedTime);

    // State to trigger re-renders
    const [currentTime, setCurrentTime] = useState(Date.now());

    useEffect(() => {
        // Update the current time every second
        const intervalId = setInterval(() => {
            setCurrentTime(Date.now()); // This will trigger a re-render
        }, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array means this effect runs only once on mount

    const getTimeSinceHandRaised = (time) => {
        if (!time) return '';

        const seconds = Math.floor((currentTime - time) / 1000);
        
        if (seconds < 0) return '0 seconds ago';
        if (seconds < 60) return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
        const hours = (minutes / 60).toFixed(1);
        if (hours < 24) return `${hours} hour${hours === '1.0' ? '' : 's'} ago`;
        const days = (hours / 24).toFixed(1);
        if (days < 365) return `${days} day${days === '1.0' ? '' : 's'} ago`;
        const years = (days / 365).toFixed(1);
        return `${years} year${years === '1.0' ? '' : 's'} ago`;
    }

    return (
        <div>
            <ul className="mt-4 space-y-2">
                {sortedSpeakers.map(speaker => (
                    <li key={speaker.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                        {speaker.name}
                        <span className="text-gray-500 ml-2">({getTimeSinceHandRaised(speaker.handRaisedTime)})</span>
                        <button onClick={() => onToggleHand(speaker.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                            Lower Hand
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RaisedHandList;
