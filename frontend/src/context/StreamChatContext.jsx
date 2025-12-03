import { createContext, useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { getStreamChatToken } from '../lib/stream';

const StreamChatContext = createContext();

export const StreamChatProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initChat = async () => {
      try {
        // Get user info from your auth system
        const userStr = localStorage.getItem('user');
        if (!userStr) {
          setIsReady(true); // Set ready even if no user to prevent blocking
          return;
        }

        const user = JSON.parse(userStr);
        
        // Check if we have a token before trying to get Stream token
        const token = localStorage.getItem('token');
        if (!token) {
          setIsReady(true);
          return;
        }

        // Get Stream token from your backend
        const { token: streamToken, apiKey, userId } = await getStreamChatToken();

        // Initialize Stream Chat client
        const chatClient = StreamChat.getInstance(apiKey);

        // Connect user
        await chatClient.connectUser(
          {
            id: userId,
            name: user.name,
            image: user.avatar || `https://getstream.io/random_png/?name=${user.name}`
          },
          streamToken
        );

        setClient(chatClient);
        setIsReady(true);
      } catch (error) {
        // Only log if it's not a network error (backend might not be running)
        if (error.code !== 'ERR_NETWORK' && error.message !== 'Network Error') {
          console.error('Failed to initialize chat:', error);
        }
        setIsReady(true); // Set ready even on error to prevent blocking
      }
    };

    initChat();

    // Cleanup on unmount
    return () => {
      if (client) {
        client.disconnectUser().catch(console.error);
      }
    };
  }, []);

  return (
    <StreamChatContext.Provider value={{ client, isReady }}>
      {children}
    </StreamChatContext.Provider>
  );
};

export default StreamChatContext;