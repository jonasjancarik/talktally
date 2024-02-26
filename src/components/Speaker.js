import React, { useState, useEffect } from 'react';

function Speaker({ id, name, onToggleTimer, isActive, totalTime, floorCount, onRaiseHand }) {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1); // Functional update
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive]); // Only re-run the effect if isActive changes

    const toggleTimer = () => {
        onToggleTimer(id);
        if (!isActive) {
            onRaiseHand(id, false); // Remove from raised hand queue when starting the timer
        }
    };

    return (
        <div className="p-4 border rounded shadow">
            <h3 className="text-lg">{name}</h3>
            <div>Time: {seconds}s</div>
            <div>Total Time: {totalTime}s</div>
            <div>Floor Count: {floorCount}</div>
            <button onClick={toggleTimer} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                {isActive ? 'Pause' : 'Start'}
            </button>
        </div>
    );
}

export default Speaker;
