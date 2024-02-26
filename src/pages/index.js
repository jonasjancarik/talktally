import React, { useState } from 'react';
import Speaker from '../components/Speaker';

export default function Home() {
    const [speakers, setSpeakers] = useState([]);
    const [raisedHands, setRaisedHands] = useState([]);
    const [speakerLog, setSpeakerLog] = useState([]);

    const addSpeaker = () => {
        const name = prompt("Enter the speaker's name:");
        if (name) {
            setSpeakers([...speakers, { id: Date.now(), name, isActive: false, totalTime: 0, floorCount: 0 }]);
        }
    };

    const handleToggleTimer = (id) => {
        setSpeakers(speakers.map(speaker => {
            if (speaker.id === id) {
                if (!speaker.isActive) {
                    // Starting this speaker's timer
                    setSpeakerLog([...speakerLog, { id: speaker.id, name: speaker.name, startTime: new Date() }]);
                    return { ...speaker, isActive: true, floorCount: speaker.floorCount + 1 };
                } else {
                    // Pausing this speaker's timer
                    const updatedTime = speaker.totalTime + Math.floor((new Date() - speakerLog.find(log => log.id === speaker.id).startTime) / 1000);
                    return { ...speaker, isActive: false, totalTime: updatedTime };
                }
            } else {
                // Ensure all other speakers are paused
                return { ...speaker, isActive: false };
            }
        }));
    };

    const handleRaiseHand = (id, isRaised) => {
        setRaisedHands(prev => isRaised ? [...prev, speakers.find(speaker => speaker.id === id).name] : prev.filter(name => name !== speakers.find(speaker => speaker.id === id).name));
    };

    return (
        <div>
            <div className="grid grid-cols-3 gap-4">
                {speakers.map(speaker => (
                    <Speaker key={speaker.id} {...speaker} onToggleTimer={handleToggleTimer} onRaiseHand={handleRaiseHand} />
                ))}
                <button onClick={addSpeaker} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add Speaker
                </button>
            </div>
            <div>
                <h2>Raised Hands</h2>
                <ul>
                    {raisedHands.map((name, index) => (
                        <li key={index}>{name}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Speaker Log</h2>
                <ul>
                    {speakerLog.map((log, index) => (
                        <li key={index}>{`${log.name} started at ${log.startTime.toLocaleTimeString()}`}</li>
                    ))}
                </ul>
            </div>
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Leaderboard</h2>
                <ul>
                    {speakers.sort((a, b) => b.totalTime - a.totalTime).map((speaker, index) => (
                        <li key={index} className="mt-2">
                            {`${speaker.name}: ${speaker.totalTime}s`}
                        </li>
                    ))}
                </ul>
            </div>            
        </div>
    );
}
