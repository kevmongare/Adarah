import React, { useState, useEffect, useRef } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: "user" | "assistant";
  content: any;
  isLoading?: boolean;
}

const ChatModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [feedbackMode, setFeedbackMode] = useState<{msgIndex: number, open: boolean} | null>(null);
  const [additionalFeedback, setAdditionalFeedback] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: {
            urgency: "Normal",
            advice:
              "👋 Hello! I’m Adarah, your AI maternal health assistant. Ask me anything about pregnancy, newborn care, or maternal health.",
            disclaimer: "This AI does not replace professional medical care."
          }
        }
      ]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user" as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    const messageToSend = input;
    setInput("");

    const loadingMsg: Message = { role: "assistant", content: { advice: "Adarah is typing..." }, isLoading: true };
    setMessages(prev => [...prev, loadingMsg]);

    try {
      const res = await fetch("https://adarahbackend.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageToSend })
      });
      const data = await res.json();

      setMessages(prev =>
        prev.map(msg => (msg.isLoading ? { role: "assistant", content: data } : msg))
      );
    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev =>
        prev.map(msg =>
          msg.isLoading
            ? { role: "assistant", content: { urgency: "Error", advice: "Failed to get response", disclaimer: "" } }
            : msg
        )
      );
    }
  };

  const sendFeedback = async (helpful: boolean, response: any, extra?: string) => {
    try {
      await fetch("https://adarahbackend.onrender.com/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response, helpful, extra })
      });
    } catch (err) {
      console.error("Feedback error:", err);
    }
  };

  const handleHelpful = async (msgIndex: number) => {
    // Show happy face
    setMessages(prev =>
      prev.map((msg, i) =>
        i === msgIndex ? { ...msg, content: { ...msg.content, advice: "😊 Thanks for your feedback!" } } : msg
      )
    );

    // Save feedback
    await sendFeedback(true, messages[msgIndex].content);

    // Close chat after short delay
    setTimeout(onClose, 1200);
  };

  const handleNotHelpful = (msgIndex: number) => {
    setFeedbackMode({ msgIndex, open: true });
  };

  const submitAdditionalFeedback = async () => {
    if (!feedbackMode) return;
    const { msgIndex } = feedbackMode;

    // Save feedback with additional text
    await sendFeedback(false, messages[msgIndex].content, additionalFeedback);

    // Close modal and reset state
    setFeedbackMode(null);
    setAdditionalFeedback("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[400px] max-w-[90%] h-[600px] rounded-2xl flex flex-col shadow-xl overflow-hidden">

        <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-pink-500 to-pink-700 text-white">
          <h2 className="font-bold text-lg flex items-center space-x-4">
            Chat with Adarah
            <span>
              <img src="/AdarahLogo.png" alt="" className="h-10 bg-white rounded-full ml-4"/>
            </span>
          </h2>
          <button onClick={onClose} className="text-2xl font-bold">×</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`p-3 rounded-2xl max-w-[80%] shadow ${
                  msg.role === "user" ? "bg-pink-200 text-pink-900" : "bg-white text-gray-900"
                }`}
              >
                {msg.role === "assistant" ? (
                  <>
                    {msg.content.urgency && <p className="font-semibold">Urgency: {msg.content.urgency}</p>}
                    <p>{msg.content.advice}</p>
                    {msg.content.disclaimer && <p className="text-xs text-gray-400 mt-1">{msg.content.disclaimer}</p>}

                    {!msg.isLoading && !feedbackMode && (
                      <div className="mt-2 flex gap-2 text-sm">
                        <button
                          onClick={() => handleHelpful(i)}
                          className="text-green-600 hover:underline"
                        >👍 Helpful</button>

                        <button
                          onClick={() => handleNotHelpful(i)}
                          className="text-red-600 hover:underline"
                        >👎 Not Helpful</button>
                      </div>
                    )}
                  </>
                ) : (
                  <p>{msg.content}</p>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {feedbackMode && (
          <div className="p-3 border-t flex flex-col gap-2 bg-white sticky bottom-0">
            <p className="text-sm">We're sorry this wasn't helpful. Please tell us how we can improve:</p>
            <textarea
              value={additionalFeedback}
              onChange={e => setAdditionalFeedback(e.target.value)}
              className="border rounded-2xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
              rows={2}
              placeholder="Your feedback..."
            />
            <button
              onClick={submitAdditionalFeedback}
              className="bg-pink-600 hover:bg-pink-700 text-white px-4 rounded-2xl font-semibold"
            >
              Submit Feedback
            </button>
          </div>
        )}

        {!feedbackMode && (
          <div className="p-3 border-t flex gap-2 bg-white sticky bottom-0">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 border rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Type a message..."
              onKeyDown={e => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-pink-600 hover:bg-pink-700 text-white px-4 rounded-2xl font-semibold"
            >
              Send
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ChatModal;
