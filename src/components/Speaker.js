import React, { useState, useEffect } from 'react';

function Speaker({ id, name, onToggleTimer, isActive: isActiveProp, totalTime, floorCount, onRaiseHand }) {
    const [seconds, setSeconds] = useState(0);
    const [sessionStartTime, setSessionStartTime] = useState(null);
    const [handRaised, setHandRaised] = useState(false);

    useEffect(() => {
        // This handles the timer - it starts and stops the timer based on the isActiveProp and updates the seconds state
        let interval = null;
        if (isActiveProp) {
            if (!sessionStartTime) {
                setSessionStartTime(new Date());
            }
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else {
            if (sessionStartTime) {
                setSessionStartTime(null);
            }
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActiveProp, sessionStartTime]);

    const toggleTimer = () => {
        onToggleTimer(id, isActiveProp ? Math.floor((new Date() - sessionStartTime) / 1000) : 0, true);
        if (!isActiveProp) {
            onRaiseHand(id, false);
        }
    };

    const toggleHandRaise = () => {
        setHandRaised(!handRaised); // Toggle the handRaised state
        onRaiseHand(id, !handRaised); // Call onRaiseHand with the new state
    };
    
    return (
        <div className="p-4 border rounded shadow">
            <h3 className="text-lg">{name}</h3>
            <div>Time: {seconds}s</div>
            <div>Total Time: {totalTime}s</div>
            <div>Floor Count: {floorCount}</div>
            <button onClick={toggleTimer} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                {isActiveProp ? 'Pause' : 'Start'} {/* Use isActiveProp here */}
            </button>
            <button onClick={toggleHandRaise} className={`ml-2 ${handRaised ? 'bg-red-500' : 'bg-green-500'} hover:bg-red-700 text-white font-bold py-1 px-2 rounded`}>
                {handRaised ? 'Lower Hand' : 'Raise Hand'}
            </button>        
        </div>
    );
}

export default Speaker;
