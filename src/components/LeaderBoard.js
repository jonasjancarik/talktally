// define a leaderboard component
import React, { Component } from 'react';

function LeaderBoard({ speakers }) {
    return (
        <div className="p-4 border rounded shadow">
            <ul>
                {speakers.sort((a, b) => b.totalTime - a.totalTime).map((speaker, index) => (
                    <li key={index} className="mt-2">
                        {`${speaker.name}: ${speaker.totalTime}s`}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LeaderBoard;