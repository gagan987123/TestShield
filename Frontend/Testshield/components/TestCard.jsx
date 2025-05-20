import React from "react";

const TestCard = ({ title, description, isActive, onStart }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>

      <p className="text-gray-600 mb-4">{description}</p>

      <span
        className={`inline-block px-3 py-1 text-sm font-medium rounded-full mb-4 ${
          isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}
      >
        {isActive ? "Active" : "Not Active"}
      </span>

      <div>
        <button
          onClick={onStart}
          disabled={!isActive}
          className={`px-4 py-2 rounded-lg text-white font-medium transition ${
            isActive
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Start Test
        </button>
      </div>
    </div>
  );
};

export default TestCard;
