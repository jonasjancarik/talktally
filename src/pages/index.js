import React, { useState } from 'react';
import Speaker from '../components/Speaker';
import RaisedHandList from '@/components/RaisedHandList';

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

    const handleToggleTimer = (id, sessionDuration, isManualToggle) => {
        setSpeakers(prevSpeakers => {
            console.log('running handleToggleTimer');  
            let isStartingNewTimer = false;

            const updatedSpeakers = prevSpeakers.map(speaker => {
                console.log(speaker);
                if (speaker.id === id) {
                    if (!speaker.isActive) {
                        // Starting this speaker's timer
                        isStartingNewTimer = true;
                        return { ...speaker, isActive: true, floorCount: speaker.floorCount + 1 };
                    } else {
                        // Pausing this speaker's timer
                        return { ...speaker, isActive: false, totalTime: speaker.totalTime + sessionDuration };
                    }
                }
                return speaker;
            });

            if (isStartingNewTimer && isManualToggle) {
                // Deactivate all other speakers
                return updatedSpeakers.map(speaker => {
                    if (speaker.id !== id) {
                        return { ...speaker, isActive: false };
                    }
                    return speaker;
                });
            }

            return updatedSpeakers;
        });
    };

    const handleRaiseHand = (id, isRaised) => {
        const speaker = speakers.find(speaker => speaker.id === id);
        if (speaker) {
            setRaisedHands(prev => isRaised ? [...prev, speaker.name] : prev.filter(name => name !== speaker.name));
        }
    };

    const handleLowerHand = (name) => {
        // Find the speaker by name
        const updatedSpeakers = speakers.map(speaker => {
            if (speaker.name === name) {
                return { ...speaker, raisedHand: false };  // Add a 'raisedHand' property or directly update your existing structure
            } else {
                return speaker;
            }
        });
        setSpeakers(updatedSpeakers); // Update the speakers state

        setRaisedHands(raisedHands.filter(hand => hand !== name)); // Update raisedHands
    };    

    return (
        <div>
            <div className="grid grid-cols-3 gap-4">
                {speakers.sort((a, b) => a.id - b.id).map(speaker => (
                    <Speaker key={speaker.id} {...speaker} onToggleTimer={handleToggleTimer} onRaiseHand={handleRaiseHand} />
                ))}
                <button onClick={addSpeaker} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add Speaker
                </button>
            </div>
            <div>
                <h2>Raised Hands</h2>
                <RaisedHandList raisedHands={raisedHands} onHandLower={handleLowerHand} />
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
