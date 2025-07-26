import React from "react";

interface MatchResultProps {
  result: string;
  keywords?: string[];
}

const MatchResultDisplay: React.FC<MatchResultProps> = ({ result, keywords }) => {
  return (
    <div className="bg-white shadow p-4 rounded-lg mt-6">
      <h2 className="text-lg font-semibold mb-2 text-green-600">Comparison Result</h2>
      <p className="mb-4">{result}</p>
      {keywords && keywords.length > 0 && (
        <>
          <h3 className="font-medium text-gray-700">Missing Keywords:</h3>
          <ul className="list-disc list-inside text-red-600">
            {keywords.map((kw, idx) => (
              <li key={idx}>{kw}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MatchResultDisplay;
