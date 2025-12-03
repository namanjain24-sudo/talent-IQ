import { useContext } from 'react';
import StreamVideoContext from '../context/StreamVideoContext';

export const useStreamVideo = () => useContext(StreamVideoContext);