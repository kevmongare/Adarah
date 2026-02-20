import { MessageCircle } from "lucide-react";

interface Props {
  onClick: () => void;
}

export default function FloatingChatButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-pink-600 hover:bg-pink-700 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition transform z-50"
    >
      <MessageCircle size={24} />
    </button>
  );
}
