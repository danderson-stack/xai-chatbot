import clsx from "clsx";
import { type Message } from "../types";

interface MessageListProps {
  messages: Message[];
  endRef: React.RefObject<HTMLDivElement | null>;
  isLoading: boolean;
}

export default function MessageList({
  messages,
  endRef,
  isLoading,
}: MessageListProps) {
  return (
    <ul className="chat-messages">
      {messages.map((message) => (
        <li key={message.id} className={clsx("message", message.role)}>
          <p>{message.content}</p>
        </li>
      ))}
      {isLoading && (
        <li className="message assistant">
          <p>Loading...</p>
        </li>
      )}
      <div ref={endRef} />
    </ul>
  );
}
