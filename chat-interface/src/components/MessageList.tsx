import clsx from "clsx";

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
}

interface MessageListProps {
  messages: Message[];
  endRef: React.RefObject<HTMLDivElement | null>;
}

export default function MessageList({ messages, endRef }: MessageListProps) {
  return (
    <div className="chat-messages">
      {messages.map((message) => (
        <li
          key={message.id}
          className={clsx(
            "message",
            message.role
          )}
        >
          <p>{message.content}</p>
        </li>
      ))}
      <div ref={endRef} />
    </div>
  );
}
