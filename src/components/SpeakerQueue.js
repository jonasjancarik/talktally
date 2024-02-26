import React, { useState } from 'react';

function SpeakerQueue() {
    const [speakers, setSpeakers] = useState([]);

    // Function to add a new speaker to the queue
    const addSpeaker = (name) => {
        const newSpeaker = { id: Date.now(), name };
        setSpeakers([...speakers, newSpeaker]);
    };

    // Function to remove a speaker from the queue
    const removeSpeaker = (id) => {
        setSpeakers(speakers.filter(speaker => speaker.id !== id));
    };

    return (
        <div className="p-4">
            <ul className="space-y-2">
                {speakers.map((speaker) => (
                    <li key={speaker.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                        {speaker.name}
                        <button
                            onClick={() => removeSpeaker(speaker.id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            <button
                onClick={() => addSpeaker(prompt('Speaker Name:'))}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Add Speaker
            </button>
        </div>
    );

}

export default SpeakerQueue;
