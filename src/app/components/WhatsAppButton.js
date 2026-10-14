"use client";

import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WHATSAPP_URL = `https://wa.me/9779823153502?text=${encodeURIComponent('Hello! I have a question.')}`;

export default function WhatsAppButton() {
  const [showChatText, setShowChatText] = useState(false);

  useEffect(() => {
    // Show the chat bubble briefly after load
    const showTimer = setTimeout(() => setShowChatText(true), 1500);
    const hideTimer = setTimeout(() => setShowChatText(false), 6500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {showChatText && (
        <div className="hidden md:block relative glass bg-[#07080d]/80 backdrop-blur-md px-4 py-2.5 rounded-xl max-w-xs enter">
          <div className="text-sm text-gray-200">Need help? <span className="text-accent">Chat with me</span></div>
        </div>
      )}
      {/* wa.me opens the app on mobile and WhatsApp Web on desktop */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Manish on WhatsApp"
        className="flex items-center justify-center gap-2 bg-accent text-black rounded-full shadow-[0_8px_30px_-6px_rgba(29,205,159,0.6)] hover:bg-white transition-colors w-12 h-12 md:w-auto md:h-auto md:px-4 md:py-2.5"
      >
        <FaWhatsapp className="w-6 h-6 md:w-4 md:h-4" />
        <span className="hidden md:inline text-sm font-medium">WhatsApp</span>
      </a>
    </div>
  );
}
