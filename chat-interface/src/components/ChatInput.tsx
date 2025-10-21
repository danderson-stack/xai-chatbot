interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({
  value,
  onChange,
  onSendMessage,
  isLoading,
}: ChatInputProps) {
  const handleSendMessage = () => {
    if (value.trim() === "" || isLoading) {
      return;
    }
    onSendMessage(value);
    onChange("");
  };
  return (
    <div className="chat-input">
      <textarea
        className="chat-input-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            // The default behavior when pressing Enter in a textarea is to insert a new line.
            handleSendMessage();
            e.preventDefault();
          }
        }}
      />
      <button
        className="chat-input-button"
        onClick={handleSendMessage}
        disabled={isLoading}
      >
        Send
      </button>
    </div>
  );
}
