import React, { useState } from "react";
import mc from "../assets/microphone.png";
import arrow from "../assets/arrow.png";
import listen from "../assets/listening.png";
import { gemini } from "../gemini";

const Input = () => {
  const [text, setText] = useState("");
  const [latestUserMessage, setLatestUserMessage] = useState(null);
  const [latestAIMessage, setLatestAIMessage] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript + " ";
      }
      setText(transcript.trim());
    };

    recognition.start();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;

    // Store only the latest user input
    setLatestUserMessage(text);
    setText("");
    setLoading(true);

    try {
      const response = await gemini(text);
      setLatestAIMessage(response);
    } catch (error) {
      setLatestAIMessage("Failed to generate a response. Please try again.");
      console.error("Gemini API error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col flex-grow justify-between p-4 bg-white text-black">
      {/* Chat Messages */}
      <div className="flex-1 overflow-auto space-y-3 pb-4 mt-4">
        {latestUserMessage && (
          <div className="p-3 rounded-lg w-fit max-w-[70%] bg-gray-200 self-end">
            {latestUserMessage}
          </div>
        )}
        {loading && <div className="p-4 bg-blue-100 text-blue-700 rounded-lg mt-2">Generating response...</div>}
        {latestAIMessage && (
          <div className="p-3 rounded-lg w-fit max-w-[70%] bg-green-100 self-start">
            {latestAIMessage}
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="flex items-center justify-center w-full border-gray-300 pt-3">
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Enter your prompt"
          className="text-lg border border-gray-400 px-4 py-3 rounded-xl w-[70%] bg-white focus:outline-none text-black"
          onKeyDown={handleKeyDown}
        />
        <div className="flex flex-row justify-between items-center gap-5 ml-4">
          <button onClick={startListening} disabled={isListening}>
            {isListening ? (
              <img className="w-8" src={listen} alt="Listening" />
            ) : (
              <img className="w-8 cursor-pointer" src={mc} alt="Microphone" />
            )}
          </button>
          <button onClick={handleSubmit}>
            <img src={arrow} alt="Submit" className="w-8 cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
