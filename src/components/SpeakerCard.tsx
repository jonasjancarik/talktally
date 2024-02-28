import React, { useState, useEffect } from 'react';
import FormatTime from './FormatTime';

interface SpeakerCardProps {
    speaker: {
        id: number;
        name: string;
        isActive: boolean;
        totalTime: number;
        floorCount: number;
        handRaised: boolean;
    };
    handleSpeakerAction: (id: number, action: string, timeIncrement?: number) => void;
    color: string;
}

function SpeakerCard({ speaker, handleSpeakerAction, color: color }: SpeakerCardProps) {
    const [seconds, setSeconds] = useState<number>(0);
    const intervalSeconds: number = 0.01;

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined = undefined;
        if (speaker.isActive) {
            setSeconds(0); // Reset seconds to 0 when speaker becomes active
            interval = setInterval(() => {
                setSeconds(seconds => {
                    const newSeconds = seconds + intervalSeconds;
                    if (speaker.isActive) {
                        handleSpeakerAction(speaker.id, 'updateTime', intervalSeconds);
                    }
                    return newSeconds;
                });
            }, intervalSeconds * 1000);
        } else {
            interval !== undefined && clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [speaker.isActive, speaker.id, handleSpeakerAction]);

    return (
        <div className="card p-3" style={{ borderColor: color, borderWidth: '2px', borderStyle: 'solid' }}>
            <h5 className="card-title">{speaker.name}</h5>
            <p className="card-text">Time: <FormatTime seconds={seconds} /></p>
            <p className="card-text">Total Time: <FormatTime seconds={speaker.totalTime} /></p>
            <p className="card-text">Floor Count: {speaker.floorCount}</p>
            <button onClick={() => handleSpeakerAction(speaker.id, speaker.isActive ? 'pause' : 'start')} className={`btn ${speaker.isActive ? 'btn-outline-secondary' : 'btn-outline-primary'}`}>
                {speaker.isActive ? '⏸️' : '▶️'}
            </button>
            <button onClick={() => handleSpeakerAction(speaker.id, speaker.handRaised ? 'lowerHand' : 'raiseHand')} className={`btn ${speaker.handRaised ? 'btn-outline-danger' : 'btn-outline-success'} mt-2`}>
                {speaker.handRaised ? '✋⬇️ ' : '🙋'}
            </button>
        </div>
    );
}

export default SpeakerCard;
