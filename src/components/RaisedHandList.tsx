import React, { useState, useEffect } from 'react';
import { Speaker } from '../types';

interface RaisedHandListProps {
    speakers: Speaker[];
    onHandleSpeakerAction: (id: number, action: string) => void;
}

function RaisedHandList({ speakers, onHandleSpeakerAction }: RaisedHandListProps) {
    // Sort speakers by the time their hand was raised
    const sortedSpeakers = speakers.sort((a, b) => {
        if (a.handRaisedTime && b.handRaisedTime) {
            return a.handRaisedTime.getTime() - b.handRaisedTime.getTime();
        }
        return 0;
    });

    const getTimeSinceHandRaised = (time: Date): string => {
        const currentTime = new Date().getTime();

        if (!time) return '';

        const seconds = Math.floor((currentTime - Number(time)) / 1000);

        if (seconds < 0) return '0 seconds ago';
        if (seconds < 60) return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
        const hours = (minutes / 60).toFixed(1);
        if (Number(hours) < 24) return `${hours} hour${hours === '1.0' ? '' : 's'} ago`;
        const days = (Number(hours) / 24).toFixed(1);
        if (Number(days) < 365) return `${days} day${days === '1.0' ? '' : 's'} ago`;
        const years = (Number(days) / 365).toFixed(1);
        return `${years} year${years === '1.0' ? '' : 's'} ago`;
    }

    return (
        <div className="mt-4">
            <ul className="list-group">
                {sortedSpeakers.map(speaker => (
                    <li key={speaker.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {speaker.name}
                        <span>({speaker.handRaisedTime && getTimeSinceHandRaised(speaker.handRaisedTime)})</span>
                        <button onClick={() => onHandleSpeakerAction(speaker.id, 'lowerHand')} className="btn btn-danger">
                            Lower Hand
                        </button>
                        <button onClick={() => onHandleSpeakerAction(speaker.id, 'giveFloor')} className="btn btn-success ml-2">
                            Give Floor
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RaisedHandList;
