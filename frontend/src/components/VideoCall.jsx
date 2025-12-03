import React, { useEffect, useState } from 'react';
import {
  StreamVideo,
  StreamCall,
  CallControls,
  SpeakerLayout
} from '@stream-io/video-react-sdk';
import { useStreamVideo } from '../hooks/useStreamVideo';
import '@stream-io/video-react-sdk/dist/css/styles.css';

const VideoCall = ({ callId = 'default-call-id' }) => {
  const { client, isReady } = useStreamVideo();
  const [call, setCall] = useState(null);

  useEffect(() => {
    if (!isReady || !client) return;

    const initCall = async () => {
      // Create or join a call
      const newCall = client.call('default', callId);
      
      await newCall.join({ create: true });
      setCall(newCall);
    };

    initCall();

    return () => {
      if (call) {
        call.leave();
      }
    };
  }, [client, isReady, callId]);

  if (!isReady || !call) {
    return <div>Loading video call...</div>;
  }

  return (
    <div className="h-screen w-full">
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <SpeakerLayout />
          <CallControls />
        </StreamCall>
      </StreamVideo>
    </div>
  );
};

export default VideoCall;