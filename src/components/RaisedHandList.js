import React, { useState, useEffect } from 'react';

function RaisedHandList({ speakers, onToggleHand, onGiveFloor }) {
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
        <div className="mt-4">
            <ul className="list-group">
                {sortedSpeakers.map(speaker => (
                    <li key={speaker.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {speaker.name}
                        <span>({getTimeSinceHandRaised(speaker.handRaisedTime)})</span>
                        <button onClick={() => onToggleHand(speaker.id)} className="btn btn-danger">
                            Lower Hand
                        </button>
                        <button onClick={() => onGiveFloor(speaker.id)} className="btn btn-success ml-2">
                            Give Floor
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RaisedHandList;
