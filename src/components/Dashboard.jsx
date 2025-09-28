import React from 'react';

// --- SVG Icon Components ---
const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
);

// --- Progress Circle Component for Dashboard ---
const ProgressCircle = ({ percentage, value, label, subLabel, size = 110, strokeWidth = 8 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-between text-center bg-neutral-900/70 border border-neutral-800 p-6 rounded-2xl shadow-lg backdrop-blur-sm w-full h-full">
            <div className="relative" style={{ width: size, height: size }}>
                <svg width={size} height={size} className="absolute top-0 left-0 -rotate-90">
                    {/* Background Circle */}
                    <circle
                        className="text-neutral-700"
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        r={radius}
                        cx={size / 2}
                        cy={size / 2}
                    />
                    {/* Foreground Progress Circle */}
                    <circle
                        className="text-indigo-400"
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        fill="transparent"
                        r={radius}
                        cx={size / 2}
                        cy={size / 2}
                        style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
                    />
                </svg>
                {/* Centered Content */}
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-white">{value}</span>
                    <p className="text-xs font-medium text-neutral-400 mt-1">{label}</p>
                </div>
            </div>
            {/* Sub-label remains outside for clarity, with a placeholder to maintain consistent card height */}
            {subLabel ? (
                 <p className="text-sm text-indigo-300 font-semibold mt-4 h-5">{subLabel}</p>
            ) : (
                <div className="mt-4 h-5"></div>
            )}
        </div>
    );
};


// --- Main Dashboard Component ---
const Dashboard = ({ results = [], switchToChat }) => {
    const totalInterviews = results.length;
    const averageScore = totalInterviews > 0 ? parseFloat((results.reduce((sum, r) => sum + r.percentage, 0) / totalInterviews).toFixed(1)) : 0;
    const topPerformer = totalInterviews > 0 ? results.reduce((max, r) => r.percentage > max.percentage ? r : max, results[0]) : null;

    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-transparent">
            <div className="max-w-4xl mx-auto">
                 <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-neutral-200">Interview Dashboard</h2>
                     <button onClick={switchToChat} className="flex items-center gap-2 text-sm bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-4 py-2 rounded-full transition-colors">
                        <ArrowLeftIcon />
                        Back to Chatbot
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                   <ProgressCircle
                        percentage={100} // A full circle represents a total count
                        value={totalInterviews}
                        label="Total Interviews"
                    />
                    <ProgressCircle
                        percentage={averageScore}
                        value={`${averageScore}%`}
                        label="Average Score"
                    />
                    <ProgressCircle
                        percentage={topPerformer ? topPerformer.percentage : 0}
                        value={topPerformer ? `${topPerformer.percentage}%` : 'N/A'}
                        label="Top Performer"
                        subLabel={topPerformer ? topPerformer.name : ''}
                    />
                </div>

                <h3 className="text-xl font-bold text-neutral-300 mb-4">Recent Results</h3>
                <div className="bg-neutral-900/70 border border-neutral-800 rounded-lg shadow-lg backdrop-blur-sm">
                    <table className="w-full text-left text-sm text-neutral-300">
                        <thead className="border-b border-neutral-700 text-xs text-neutral-400 uppercase tracking-wider">
                            <tr>
                                <th scope="col" className="px-6 py-4">Candidate Name</th>
                                <th scope="col" className="px-6 py-4">Email</th>
                                <th scope="col" className="px-6 py-4 text-right">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.length > 0 ? (
                                results.map((result) => (
                                    <tr key={result.id} className="border-b border-neutral-800 last:border-b-0 hover:bg-neutral-800/50">
                                        <td className="px-6 py-4 font-medium whitespace-nowrap text-white">{result.name}</td>
                                        <td className="px-6 py-4">{result.email}</td>
                                        <td className="px-6 py-4 font-bold text-white text-right">{result.percentage}%</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center py-16 text-neutral-500">No interview results yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

