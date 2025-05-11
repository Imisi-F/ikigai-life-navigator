'use client';

import { useState, useRef, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { db } from "../../firebaseConfig";
import { getAuth } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { generateChatResponse } from '@/openai/openai';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const persistMessage = async (msg: Message) => {
    const user = getAuth().currentUser;
    if (!user) return;

    try {
      await addDoc(collection(db, 'messages'), {
        ...msg,
        timestamp: serverTimestamp(),
        userId: user.uid,
      });
    } catch (err) {
      console.error('Failed to save message:', err);
    }
  };

  const handleSendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = { sender: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    persistMessage(userMsg);
    setInput('');
    setLoading(true);

    try {
      const replyText = await generateChatResponse(trimmed);
      const botMsg: Message = { sender: 'bot', text: replyText || "Hmm, I didn't get that." };
      setMessages((prev) => [...prev, botMsg]);
      persistMessage(botMsg);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: Message = { sender: 'bot', text: 'Oops! Something went wrong. Please try again.' };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-full space-y-6 px-6 py-4">
      <div>
        <h3 className="font-medium text-lg">Ikigai Life Plan Assistant</h3>
        <p className="text-sm text-gray-500">Ask me anything about your life plan</p>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto border rounded-lg p-4 max-h-[60vh]">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`whitespace-pre-line rounded-lg px-4 py-2 max-w-[75%] ${msg.sender === 'user'
              ? 'ml-auto bg-blue-100 text-right'
              : 'mr-auto bg-gray-100 text-left'
              }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="mr-auto bg-gray-100 text-left px-4 py-2 rounded-lg max-w-[75%]">
            <span className="animate-pulse">Typing...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-end space-x-4">
        <Textarea
          rows={2}
          className="flex-1 resize-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <Button onClick={handleSendMessage} disabled={loading || !input.trim()}>
          {loading ? 'Thinking...' : 'Send'}
        </Button>
      </div>
    </div>
  );
}
