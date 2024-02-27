import React, { useState, useEffect, useRef } from 'react';
import FormatTime from './FormatTime';

function Speaker({ speaker, onToggleTimer, handleUpdateTime, onToggleHand }) {
    const [seconds, setSeconds] = useState(0);

    const intervalSeconds = 0.01;

    useEffect(() => {
        let interval = null;
        if (speaker.isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + intervalSeconds);
                // Call handleUpdateTime instead of mutating speaker.totalTime
                handleUpdateTime(speaker.id, intervalSeconds);
            }, intervalSeconds * 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [speaker, handleUpdateTime]);


    const toggleTimer = () => {
        // When starting the timer, ensure the hand is considered lowered
        if (!speaker.isActive && speaker.handRaised) {
            onToggleHand(speaker.id);
        }

        // Set current seconds to 0 when starting the timer
        if (!speaker.isActive) {
            setSeconds(0);
        }

        // Toggle the timer
        onToggleTimer(speaker.id, true);
    };

    const toggleHand = () => {
        onToggleHand(speaker.id);
    };

    return (
        <div className="p-4 border rounded shadow">
            <h3 className="text-lg font-bold">{speaker.name}</h3>
            <div>Time: <FormatTime seconds={seconds} /> </div>
            <div>Total Time: <FormatTime seconds={speaker.totalTime} /> </div>
            <div>Floor Count: {speaker.floorCount}</div>
            <button onClick={toggleTimer} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                {speaker.isActive ? 'Pause' : 'Start'}
            </button>
            <button onClick={toggleHand} className={`ml-2 ${speaker.handRaised ? 'bg-red-500' : 'bg-green-500'} ${speaker.isActive ? 'opacity-50' : ''} hover:bg-red-700 text-white font-bold py-1 px-2 rounded`}>
                {speaker.handRaised ? 'Lower Hand' : 'Raise Hand'}
            </button>
        </div>
    );
}

export default Speaker;
