import React, { useState } from 'react';

function RaisedHandList() {
    const [participants, setParticipants] = useState([]);

    const addParticipant = () => {
        const name = prompt('Enter participant name:');
        if (name) {
            setParticipants([...participants, { id: Date.now(), name }]);
        }
    };

    const removeParticipant = (id) => {
        setParticipants(participants.filter(participant => participant.id !== id));
    };

    return (
        <div>
            <button onClick={addParticipant} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Raise Hand
            </button>
            <ul className="mt-4 space-y-2">
                {participants.map(participant => (
                    <li key={participant.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                        {participant.name}
                        <button onClick={() => removeParticipant(participant.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                            Lower Hand
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RaisedHandList;
