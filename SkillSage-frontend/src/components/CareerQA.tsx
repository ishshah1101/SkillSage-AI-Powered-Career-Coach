import React, { useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

const CareerQA: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer(null);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE}/chat/ask`, {
        params: { q: question },
      });
      setAnswer(response.data.answer);
    } catch (err) {
      setError("⚠️ Failed to get a response from the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md mt-10 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🧠 Career Q&A</h2>

      <textarea
        className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
        rows={4}
        placeholder="Ask something like 'What are my top skills?'"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={handleAsk}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>

        <button
          onClick={() => {
            setQuestion("");
            setAnswer(null);
            setError(null);
          }}
          className="px-3 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded"
        >
          Clear
        </button>
      </div>

      {answer && (
        <div className="mt-6 p-4 bg-gray-900 text-white border border-blue-500 rounded-lg whitespace-pre-wrap">
          <h4 className="font-semibold mb-2 text-blue-400">💡 Answer:</h4>
          {answer}
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-900 text-red-300 border border-red-600 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default CareerQA;
