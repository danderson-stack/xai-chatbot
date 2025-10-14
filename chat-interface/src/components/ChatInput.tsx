interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSendMessage: (message: string) => void; //TODO: Implement and remove optional
}

export default function ChatInput({
  value,
  onChange,
  onSendMessage,
}: ChatInputProps) {
  return (
    <div className="chat-input">
      <textarea
        className="chat-input-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            // The default behavior when pressing Enter in a textarea is to insert a new line.
            onSendMessage(value);
            e.preventDefault();
          }
        }}
      />
      <button
        className="chat-input-button"
        onClick={() => onSendMessage?.(value)}
      >
        Send
      </button>
    </div>
  );
}
