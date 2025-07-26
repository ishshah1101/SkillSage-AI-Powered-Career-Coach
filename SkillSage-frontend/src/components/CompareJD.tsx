import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

type MatchResponse = {
  result?: string;
  missing_keywords?: string[];
  similarity?: number; // 0-1 (backend)
};

const API_BASE = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

const JobMatcher: React.FC = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [matchResult, setMatchResult] = useState("");
  const [missingKeywords, setMissingKeywords] = useState<string[]>([]);
  const [similarityScore, setSimilarityScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleMatch = async () => {
    if (!jobDescription.trim()) return;

    setLoading(true);
    setMatchResult("");
    setMissingKeywords([]);
    setSimilarityScore(null);

    try {
      const { data } = await axios.post<MatchResponse>(
        `${API_BASE}/match/compare`,
        { job_description: jobDescription }
      );

      setMatchResult(data.result ?? "No match result returned.");
      setMissingKeywords(data.missing_keywords ?? []);
      setSimilarityScore(typeof data.similarity === "number" ? data.similarity : null);
    } catch (error) {
      console.error(error);
      setMatchResult("❌ Error: Could not fetch match result.");
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = (score: number) => {
    if (score >= 0.8) return "bg-green-600";
    if (score >= 0.6) return "bg-yellow-600";
    return "bg-red-600";
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow text-white">
      <h2 className="text-2xl font-bold mb-4">📄 Job Description Matcher</h2>

      <textarea
        rows={10}
        className="w-full p-3 border border-gray-700 bg-gray-900 text-white rounded mb-4"
        placeholder="Paste job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <div className="flex gap-3">
        <button
          onClick={handleMatch}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Matching..." : "Compare with Resume"}
        </button>
        <button
          onClick={() => {
            setMatchResult("");
            setMissingKeywords([]);
            setSimilarityScore(null);
          }}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
        >
          Clear
        </button>
      </div>

      {matchResult && (
        <div className="mt-8 bg-gray-900 p-5 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold">Result</h3>

          {similarityScore !== null && (
            <span
              className={`text-sm px-2 py-1 rounded ${scoreColor(
                similarityScore
              )}`}
            >
              Similarity: {(similarityScore * 100).toFixed(2)}%
            </span>
          )}
          </div>

          {/* Markdown answer */}
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>{matchResult}</ReactMarkdown>
          </div>

          {missingKeywords.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold mb-2">❌ Missing Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {missingKeywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-2 py-1 text-xs rounded bg-red-700/30 text-red-300 border border-red-600/40"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobMatcher;
