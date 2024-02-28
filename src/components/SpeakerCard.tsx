import React, { useState, useEffect } from 'react';
import FormatTime from './FormatTime';

interface SpeakerProps {
    speaker: {
        id: number;
        name: string;
        isActive: boolean;
        totalTime: number;
        floorCount: number;
        handRaised: boolean;
    };
    handleSpeakerAction: (id: number, action: string) => void;
}

function SpeakerCard({ speaker, handleSpeakerAction }: SpeakerProps) {
    const [seconds, setSeconds] = useState<number>(0);
    const intervalSeconds: number = 0.01;

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined = undefined;
        if (speaker.isActive) {
            setSeconds(0); // Reset seconds to 0 when speaker becomes active
            interval = setInterval(() => {
                setSeconds(seconds => seconds + intervalSeconds);
                handleSpeakerAction(speaker.id, 'updateTime');
            }, intervalSeconds * 1000);
        } else {
            interval !== undefined && clearInterval(interval);
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

export default SpeakerCard;
