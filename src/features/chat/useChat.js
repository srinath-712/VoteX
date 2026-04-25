import { useState, useCallback } from 'react';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (content) => {
    if (!content.trim()) return;

    const userMessage = { role: 'user', content };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    // Provide a placeholder assistant message that will be updated via stream
    const assistantMessageId = Date.now().toString();
    setMessages((prev) => [...prev, { id: assistantMessageId, role: 'assistant', content: '' }]);

    try {
      const apiMessages = [...messages, userMessage].map((m) => ({
        role: m.role,
        text: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch chat response');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');
      
      let done = false;
      let streamedResponse = '';

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ') && !line.includes('[DONE]')) {
              try {
                const data = JSON.parse(line.replace('data: ', ''));
                if (data.text) {
                  streamedResponse += data.text;
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === assistantMessageId ? { ...msg, content: streamedResponse } : msg
                    )
                  );
                }
              } catch (_e) {
                // Ignore malformed SSE chunks
              }
            }
          }
        }
      }
    } catch (err) {
      setError(err.message);
      // Remove empty assistant message on error
      setMessages((prev) => prev.filter(msg => msg.id !== assistantMessageId || msg.content.length > 0));
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const setInitialMessage = useCallback((msg) => {
    setMessages([{ role: 'assistant', content: msg }]);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    setInitialMessage
  };
}
