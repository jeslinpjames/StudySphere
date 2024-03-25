import React, { useState } from "react";

const Chat = ({ pdfName }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      // Add user message and bot's reply
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputMessage, sender: "user" },
        { text: "Hi, how are you?", sender: "bot" },
      ]);
      // Clear input
      setInputMessage("");
    }
  };

  return (
    <div className="flex flex-col h-[89vh] w-4/12	">
      <div className="px-4 py-2 ">
        <h1 className="text-2xl font-bold">{pdfName}</h1>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <div className="chat chat-start"></div>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${
              message.sender === "user" ? "chat-end" : "chat-start"
            } flex flex-col mb-4`}
          >
            <div className="chat-bubble">{message.text}</div>
          </div>
        ))}
        <div className="chat chat-end"></div>
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
