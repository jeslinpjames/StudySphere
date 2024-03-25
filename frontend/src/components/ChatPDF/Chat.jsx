import React, { useState, useEffect } from "react";

const Chat = ({ pdfName }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Function to handle sending messages
  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      // Add user message and bot's reply
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputMessage, sender: "user" },
        {
          text: `Hi, this will be answered from ${pdfName}?`,
          sender: "bot",
        },
      ]);
      // Clear input
      setInputMessage("");
    }
  };

  // Effect to clear messages and start chat when pdfName changes
  useEffect(() => {
    // Clear messages
    setMessages([]);

    // Optionally, you can send an initial message when the PDF changes
    if (pdfName) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: `Chat started for ${pdfName}`,
          sender: "bot",
        },
      ]);
    }
  }, [pdfName]);

  // Function to handle input change
  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  return (
    <div className="flex flex-col h-[89vh] w-4/12 bg-gray-800 md-rounded">
      <div className="px-4 py-2 ">
        <h1 className="text-2xl font-bold">{pdfName}</h1>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${
              message.sender === "user" ? "chat-end" : "chat-start"
            } flex flex-col mb-4`}
          >
            <div
              className={`chat-bubble ${
                message.sender === "user"
                  ? "chat-bubble-info"
                  : "chat-bubble-success"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className=" px-4 py-2 flex">
        <input
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex-1 border rounded-l-md px-2 py-1"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
