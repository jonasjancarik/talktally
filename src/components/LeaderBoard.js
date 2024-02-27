import React from 'react';
import FormatTime from './FormatTime';

function LeaderBoard({ speakers }) {
    return (
        <div className="mt-3">
            <ul className="list-group">
                {speakers.sort((a, b) => b.totalTime - a.totalTime).map((speaker, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {speaker.name}
                        <span className="badge bg-primary rounded-pill">
                            {FormatTime({ seconds: speaker.totalTime })}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LeaderBoard;
