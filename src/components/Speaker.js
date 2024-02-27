import React, { useState, useEffect, useRef } from 'react';

function Speaker({ speaker, onToggleTimer, onRaiseHand }) {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let interval = null;
        if (speaker.isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
                speaker.totalTime += 1;
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [speaker]);

    const toggleTimer = () => {
        // When starting the timer, ensure the hand is considered lowered
        if (!speaker.isActive) {
            onRaiseHand(speaker.id, false);
        }

        // Set current seconds to 0 when starting the timer
        if (!speaker.isActive) {
            setSeconds(0);
        }

        // Toggle the timer
        onToggleTimer(speaker.id, true);
    };

    const toggleHandRaise = () => {
        onRaiseHand(speaker.id, !speaker.handRaised);
    };
    
    return (
        <div className="p-4 border rounded shadow">
            <h3 className="text-lg">{speaker.name}</h3>
            <div>Time: {seconds}s</div>
            <div>Total Time: {speaker.totalTime}s</div>
            <div>Floor Count: {speaker.floorCount}</div>
            <button onClick={toggleTimer} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                {speaker.isActive ? 'Pause' : 'Start'}
            </button>
            <button onClick={toggleHandRaise} className={`ml-2 ${speaker.handRaised ? 'bg-red-500' : 'bg-green-500'} hover:bg-red-700 text-white font-bold py-1 px-2 rounded`}>
                {speaker.handRaised ? 'Lower Hand' : 'Raise Hand'}
            </button>        
        </div>
    );
}

export default Speaker;
