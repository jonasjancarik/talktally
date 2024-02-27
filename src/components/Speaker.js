import React, { useState, useEffect, useRef } from 'react';

function Speaker({ speaker, onToggleTimer, handleUpdateTime, onToggleHand }) {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let interval = null;
        if (speaker.isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
                // Call handleUpdateTime instead of mutating speaker.totalTime
                handleUpdateTime(speaker.id, 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [speaker, handleUpdateTime]);


    const toggleTimer = () => {
        // When starting the timer, ensure the hand is considered lowered
        if (!speaker.isActive) {
            onToggleHand(speaker.id, false);
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
            <div>Time: {seconds}s</div>
            <div>Total Time: {speaker.totalTime}s</div>
            <div>Floor Count: {speaker.floorCount}</div>
            <button onClick={toggleTimer} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                {speaker.isActive ? 'Pause' : 'Start'}
            </button>
            <button onClick={toggleHand} className={`ml-2 ${speaker.handRaised ? 'bg-red-500' : 'bg-green-500'} hover:bg-red-700 text-white font-bold py-1 px-2 rounded`}>
                {speaker.handRaised ? 'Lower Hand' : 'Raise Hand'}
            </button>        
        </div>
    );
}

export default Speaker;
