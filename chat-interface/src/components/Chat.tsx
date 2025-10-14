import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { useState, useRef, useEffect } from "react";
import { type Message } from "./MessageList";
import { useLocalStorage } from "../hooks/useLocalStorage";

function serverResponse(message: string): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (message.trim() === "42") {
        reject(new Error("Message content '42' is not allowed."));
      } else {
        resolve(`Your message ${message} was recieved`);
      }
    }, 1500);
  });
}

export default function Chat() {
  const [savedMessages, setSavedMessages] = useLocalStorage<Message[]>(
    "messages",
    []
  );
  const [input, setInput] = useState<string>("");
  const endRef = useRef<HTMLDivElement | null>(null);

  function handleSendMessage(message: string) {
    serverResponse(message)
      .then((response) => {
        setSavedMessages([
          ...savedMessages,
          { id: message, content: message, role: "user" },
          { id: response, content: response, role: "assistant" },
        ]);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [savedMessages]); // runs whenever messages change

  return (
    <div className="chat-container">
      <MessageList messages={savedMessages} endRef={endRef} />
      <ChatInput
        value={input}
        onChange={setInput}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
