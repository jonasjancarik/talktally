import React, { useState } from 'react';

function RaisedHandList({ speakers, onHandLower }) {
    // Sort speakers by the time their hand was raised
    const sortedSpeakers = speakers.sort((a, b) => a.handRaisedTime - b.handRaisedTime);

    return (
        <div>
            <ul className="mt-4 space-y-2">
                {sortedSpeakers.map(speaker => (
                    <li key={speaker.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                        {speaker.name}
                        <button onClick={() => onHandLower(speaker.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                            Lower Hand
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default RaisedHandList;
