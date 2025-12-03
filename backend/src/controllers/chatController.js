import { chatServer, videoServer } from '../config/streamConfig.js';
import jwt from 'jsonwebtoken';

export async function getStreamToken(req, res) {
  try {
    // Use MongoDB _id for Stream (from JWT middleware) instead of clerkId
    const userId = req.user._id.toString();
    const token = chatServer.createToken(userId);

    res.status(200).json({
      token,
      userId: userId,
      userName: req.user.name,
      userImage: req.user.image,
    });
  } catch (error) {
    console.log("Error in getStreamToken controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Generate Stream Chat Token
export const getChatToken = async (req, res) => {
  try {
    const userId = req.user._id.toString(); // Use MongoDB _id from JWT middleware
    const userName = req.user.name;

    // Create Stream Chat token
    const token = chatServer.createToken(userId);

    // Optionally: Create/Update user in Stream
    await chatServer.upsertUser({
      id: userId,
      name: userName,
      role: 'user'
    });

    res.status(200).json({
      success: true,
      token,
      userId,
      apiKey: process.env.STREAM_API_KEY
    });
  } catch (error) {
    console.error('Error generating chat token:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to generate chat token' 
    });
  }
};

// Generate Stream Video Token
export const getVideoToken = async (req, res) => {
  try {
    const userId = req.user._id.toString(); // Use MongoDB _id from JWT middleware
    const userName = req.user.name;

    // Create Stream Video token using JWT
    const token = jwt.sign(
      { user_id: userId },
      process.env.STREAM_API_SECRET,
      { algorithm: 'HS256', expiresIn: '1h' }
    );

    res.status(200).json({
      success: true,
      token,
      userId,
      apiKey: process.env.STREAM_API_KEY
    });
  } catch (error) {
    console.error('Error generating video token:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to generate video token' 
    });
  }
};