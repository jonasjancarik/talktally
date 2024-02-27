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

    const handleToggleHand = (id) => {
        setSpeakers(speakers.map(speaker => {
            if (speaker.id === id) {
                // Toggle the handRaised state
                const isRaised = !speaker.handRaised;
                return { ...speaker, handRaised: isRaised, handRaisedTime: isRaised ? new Date() : null };
            }
            return speaker;
        }));
    };

    const handleUpdateTime = (id, time) => {
        setSpeakers(prevSpeakers => prevSpeakers.map(speaker => {
            if (speaker.id === id) {
                return { ...speaker, totalTime: speaker.totalTime + time };
            }
            return speaker;
        }));
    };

    return (
        <div className='container py-5'>
            <div className="row">
                {speakers.sort((a, b) => a.id - b.id).map(speaker => (
                    <div key={speaker.id} className="col-md-4 mb-3">
                        <Speaker
                            speaker={speaker}
                            isActive={speaker.isActive}
                            onToggleTimer={handleToggleTimer}
                            onToggleHand={handleToggleHand}
                            handleUpdateTime={handleUpdateTime}
                        />
                    </div>
                ))}
                <div className='col-md-4 mb-3'>
                    <button type='button' onClick={addSpeaker} className="btn btn-primary w-100 h-100">
                        Add Speaker
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <h2>Raised Hands</h2>
                    {speakers.filter(speaker => speaker.handRaised).length > 0 ? (
                        <RaisedHandList speakers={speakers.filter(speaker => speaker.handRaised)} onToggleHand={handleToggleHand} />
                    ) : (
                        <em>Queue empty</em>
                    )}
                </div>
                <div className="col-md-6">
                    <h2>Leaderboard</h2>
                    <LeaderBoard speakers={speakers} />
                </div>
            </div>
        </div>
    );
}
