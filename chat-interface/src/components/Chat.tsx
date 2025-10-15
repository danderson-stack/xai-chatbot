import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { useState, useRef, useEffect } from "react";
import { type Message } from "../types";
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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState<string>("");
  const endRef = useRef<HTMLDivElement | null>(null);

  const addMessage = (message: Message) => {
    setSavedMessages((prevMessages) => [...prevMessages, message]);
  };

  function handleSendMessage(message: string) {
    setError(null);
    setLoading(true);
    const messageId = crypto.randomUUID();
    addMessage({ id: messageId, content: message, role: "user" });
    setInput("");
    serverResponse(message)
      .then((response) => {
        addMessage({
          id: `response-${messageId}`,
          content: response,
          role: "assistant",
        });
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [savedMessages]); // runs whenever messages change

  return (
    <div className="chat-container">
      <MessageList
        messages={savedMessages}
        endRef={endRef}
        isLoading={loading}
      />
      <ChatInput
        value={input}
        onChange={setInput}
        onSendMessage={handleSendMessage}
        isLoading={loading}
      />
      {error && <p className="error-alert">{error}</p>}
    </div>
  );
}
