// define a leaderboard component
import React, { Component } from 'react';
import FormatTime from './FormatTime';

function LeaderBoard({ speakers }) {
    return (
        <div className="">
            <ul>
                {speakers.sort((a, b) => b.totalTime - a.totalTime).map((speaker, index) => (
                    <li key={index} className="mt-2">
                        {`${speaker.name}: ${FormatTime({ seconds: speaker.totalTime })}`}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LeaderBoard;