import { createContext, useEffect, useState } from 'react';
import { StreamVideoClient } from '@stream-io/video-react-sdk';
import { getStreamVideoToken } from '../lib/stream';

const StreamVideoContext = createContext();

export const StreamVideoProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initVideo = async () => {
      try {
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

        const { token: streamToken, apiKey, userId } = await getStreamVideoToken();

        const videoClient = new StreamVideoClient({
          apiKey,
          user: {
            id: userId,
            name: user.name,
            image: user.avatar
          },
          token: streamToken
        });

        setClient(videoClient);
        setIsReady(true);
      } catch (error) {
        // Only log if it's not a network error (backend might not be running)
        if (error.code !== 'ERR_NETWORK' && error.message !== 'Network Error') {
          console.error('Failed to initialize video:', error);
        }
        setIsReady(true); // Set ready even on error to prevent blocking
      }
    };

    initVideo();

    return () => {
      if (client) {
        client.disconnectUser().catch(console.error);
      }
    };
  }, []);

  return (
    <StreamVideoContext.Provider value={{ client, isReady }}>
      {children}
    </StreamVideoContext.Provider>
  );
};

export default StreamVideoContext;