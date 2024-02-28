import React, { useState, useEffect } from 'react';
import FormatTime from './FormatTime';

function Speaker({ speaker, handleSpeakerAction }) {
    const [seconds, setSeconds] = useState(0);
    const intervalSeconds = 0.01;

    useEffect(() => {
        let interval = null;
        if (speaker.isActive) {
            setSeconds(0); // Reset seconds to 0 when speaker becomes active
            interval = setInterval(() => {
                setSeconds(seconds => seconds + intervalSeconds);
                handleSpeakerAction(speaker.id, 'updateTime', intervalSeconds);
            }, intervalSeconds * 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [speaker.isActive, speaker.id, handleSpeakerAction]);

    return (
        <div className="card p-3">
            <h5 className="card-title">{speaker.name}</h5>
            <p className="card-text">Time: <FormatTime seconds={seconds} /></p>
            <p className="card-text">Total Time: <FormatTime seconds={speaker.totalTime} /></p>
            <p className="card-text">Floor Count: {speaker.floorCount}</p>
            <button onClick={() => handleSpeakerAction(speaker.id, speaker.isActive ? 'pause' : 'start')} className={`btn ${speaker.isActive ? 'btn-secondary' : 'btn-primary'}`}>
                {speaker.isActive ? 'Pause' : 'Start'}
            </button>
            <button onClick={() => handleSpeakerAction(speaker.id, speaker.handRaised ? 'lowerHand' : 'raiseHand')} className={`btn ${speaker.handRaised ? 'btn-danger' : 'btn-success'} mt-2`}>
                {speaker.handRaised ? 'Lower Hand' : 'Raise Hand'}
            </button>
        </div>
    );
}

export default Speaker;
