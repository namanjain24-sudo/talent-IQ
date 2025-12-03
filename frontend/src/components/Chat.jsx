import React, { useEffect, useState } from 'react';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import { useStreamClient } from '../hooks/useStreamClient';
import 'stream-chat-react/dist/css/v2/index.css';

const ChatComponent = () => {
  const { client, isReady } = useStreamClient();
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    if (!isReady || !client) return;

    const initChannel = async () => {
      // Create or join a channel
      const newChannel = client.channel('messaging', 'general', {
        name: 'General Chat',
        members: [client.userID] // Add members as needed
      });

      await newChannel.watch();
      setChannel(newChannel);
    };

    initChannel();
  }, [client, isReady]);

  if (!isReady || !channel) {
    return <div>Loading chat...</div>;
  }

  return (
    <div className="h-screen w-full">
      <Chat client={client} theme="str-chat__theme-light">
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatComponent;