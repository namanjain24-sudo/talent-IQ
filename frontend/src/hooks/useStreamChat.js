import { useContext } from 'react';
import StreamChatContext from '../context/StreamChatContext';

export const useStreamChat = () => useContext(StreamChatContext);