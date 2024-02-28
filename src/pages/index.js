import React, { useState } from 'react';
import Speaker from '../components/Speaker';
import RaisedHandList from '@/components/RaisedHandList';
import LeaderBoard from '@/components/LeaderBoard';

export default function Home() {
    const [speakers, setSpeakers] = useState([]);

    const addSpeaker = () => {
        const name = prompt("Enter the speaker's name:");
        if (name) {
            setSpeakers([...speakers, { id: Date.now(), name, isActive: false, totalTime: 0, floorCount: 0, handRaised: false, handRaisedTime: null }]);
        }
    };

    const handleSpeakerAction = (id, actionType, time = 0) => {
        setSpeakers(prevSpeakers => {
            let updatedSpeakers = prevSpeakers.map(speaker => {
                // Deactivate any active speaker when another speaker starts
                if (actionType === 'start' && speaker.id !== id && speaker.isActive) {
                    return { ...speaker, isActive: false };
                }
                return speaker;
            });

            return updatedSpeakers.map(speaker => {
                if (speaker.id === id) {
                    switch (actionType) {
                        case 'start':
                            // No need to check for isActive here, since we already deactivated others
                            return { ...speaker, isActive: true, floorCount: speaker.floorCount + 1 };
                        case 'pause':
                            return { ...speaker, isActive: false };
                        case 'updateTime':
                            return { ...speaker, totalTime: speaker.totalTime + time };
                        case 'raiseHand':
                            return { ...speaker, handRaised: true, handRaisedTime: new Date() };
                        case 'lowerHand':
                            return { ...speaker, handRaised: false, handRaisedTime: null };
                        case 'giveFloor':
                            // Explicitly deactivate all other speakers in case of 'giveFloor' as well
                            updatedSpeakers.forEach(s => { if (s.id !== id) s.isActive = false; });
                            return { ...speaker, isActive: true, handRaised: false, floorCount: speaker.floorCount + 1, handRaisedTime: null };
                        default:
                            return speaker;
                    }
                }
                return speaker;
            });
        });
    };


    return (
        <div className='container py-5'>
            <div className="row">
                {speakers.sort((a, b) => a.id - b.id).map(speaker => (
                    <div key={speaker.id} className="col-md-4 mb-3">
                        <Speaker
                            speaker={speaker}
                            handleSpeakerAction={handleSpeakerAction}
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
                        <RaisedHandList speakers={speakers.filter(speaker => speaker.handRaised)} onHandleSpeakerAction={handleSpeakerAction} />
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
