import React, { useState } from 'react';
import Speaker from '../components/Speaker';
import RaisedHandList from '@/components/RaisedHandList';
import LeaderBoard from '@/components/LeaderBoard';

export default function Home() {
    const [speakers, setSpeakers] = useState([]);
    const [speakerLog, setSpeakerLog] = useState([]);

    const addSpeaker = () => {
        const name = prompt("Enter the speaker's name:");
        if (name) {
            setSpeakers([...speakers, { id: Date.now(), name, isActive: false, totalTime: 0, floorCount: 0 }]);
        }
    };

    const handleToggleTimer = (id, isManualToggle) => {
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
                        return { ...speaker, isActive: false };
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
        setSpeakers(speakers.map(speaker => {
            if (speaker.id === id) {
                return { ...speaker, handRaised: isRaised, handRaisedTime: isRaised ? new Date() : null };
            }
            return speaker;
        }));
    };


    const handleLowerHand = (id) => {
        setSpeakers(speakers.map(speaker => {
            if (speaker.id === id) {
                return { ...speaker, handRaised: false };
            }
            return speaker;
        }));
    };
 

    return (
        <div>
            <div className="grid grid-cols-3 gap-4">
                {speakers.sort((a, b) => a.id - b.id).map(speaker => (
                    <Speaker key={speaker.id} speaker={speaker} isActive={speaker.isActive} onToggleTimer={handleToggleTimer} onRaiseHand={handleRaiseHand} />
                ))}
                <button onClick={addSpeaker} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add Speaker
                </button>
            </div>
            <div>
                <h2>Raised Hands</h2>
                <RaisedHandList speakers={speakers.filter(speaker => speaker.handRaised)} onHandLower={handleLowerHand} />
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
                <LeaderBoard speakers={speakers} />
            </div>            
        </div>
    );
}
