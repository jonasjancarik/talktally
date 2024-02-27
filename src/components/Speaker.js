import React, { useState, useEffect } from 'react';
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
        <div className="card p-3">
            <h5 className="card-title">{speaker.name}</h5>
            <p className="card-text">Time: <FormatTime seconds={seconds} /></p>
            <p className="card-text">Total Time: <FormatTime seconds={speaker.totalTime} /></p>
            <p className="card-text">Floor Count: {speaker.floorCount}</p>
            <button onClick={toggleTimer} className={`btn ${speaker.isActive ? 'btn-secondary' : 'btn-primary'}`}>
                {speaker.isActive ? 'Pause' : 'Start'}
            </button>
            <button onClick={toggleHand} className={`btn ${speaker.handRaised ? 'btn-danger' : 'btn-success'} mt-2`}>
                {speaker.handRaised ? 'Lower Hand' : 'Raise Hand'}
            </button>
        </div>
    );
}

export default Speaker;
