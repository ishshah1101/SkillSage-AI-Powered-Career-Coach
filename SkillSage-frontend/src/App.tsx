import React from "react";
import UploadResume from "./components/UploadResume";
import JobMatcher from "./components/CompareJD";
import CareerQA from "./components/CareerQA";

function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg5.jpg')" }} 
    >
      <div className="bg-black bg-opacity-70 min-h-screen p-6 text-white">
        <UploadResume />
        <JobMatcher />
        <CareerQA />
      </div>
    </div>
  );
}

export default App;
