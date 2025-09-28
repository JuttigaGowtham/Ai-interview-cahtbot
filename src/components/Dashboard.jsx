import React from "react";

const Dashboard = ({ results, switchToChat }) => (
  <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-black">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-neutral-200 mb-6">
        Interview Dashboard
      </h2>
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg shadow-lg">
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
                <tr
                  key={result.id}
                  className="border-b border-neutral-800 last:border-b-0 hover:bg-neutral-800/50"
                >
                  <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                    {result.name}
                  </td>
                  <td className="px-6 py-4">{result.email}</td>
                  <td className="px-6 py-4 font-bold text-white text-right">
                    {result.percentage}%
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-16 text-neutral-500">
                  No interview results yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button
        onClick={switchToChat}
        className="mt-8 flex items-center gap-2 text-sm bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-4 py-2 rounded-full transition-colors"
      >
        Back to Chatbot
      </button>
    </div>
  </div>
);

export default Dashboard;
