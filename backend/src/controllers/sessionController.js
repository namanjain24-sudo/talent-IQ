import { chatServer, videoServer } from "../config/streamConfig.js";
import Session from "../models/Session.js";

export async function createSession(req, res) {
  try {
    const { problem, difficulty } = req.body;
    const userId = req.user._id; // Use MongoDB _id from JWT instead of separate clerkId

    if (!problem || !difficulty) {
      return res.status(400).json({ message: "Problem and difficulty are required" });
    }

    // generate a unique call id for stream video
    const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // create session in db
    const session = await Session.create({ problem, difficulty, host: userId, callId });

    // create stream video call using MongoDB _id
    await videoServer.video.call("default", callId).getOrCreate({
      data: {
        created_by_id: userId.toString(), // Use MongoDB _id
        custom: { problem, difficulty, sessionId: session._id.toString() },
      },
    });

    // chat messaging - create channel with both host and empty participant slot
    const channel = chatServer.channel("messaging", callId, {
      name: `${problem} Session`,
      created_by_id: userId.toString(), // Use MongoDB _id
      members: [userId.toString()], // Initially only host is member
    });

    await channel.create();

    res.status(201).json({ session });
  } catch (error) {
    console.log("Error in createSession controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getActiveSessions(_, res) {
  try {
    console.log("🔍 getActiveSessions called");
    const sessions = await Session.find({ status: "active" })
      .populate("host", "name profileImage email") // Removed clerkId
      .populate("participant", "name profileImage email") // Removed clerkId
      .sort({ createdAt: -1 })
      .limit(20);

    console.log("✅ Found sessions:", sessions.length);
    res.status(200).json({ sessions });
  } catch (error) {
    console.log("Error in getActiveSessions controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getMyRecentSessions(req, res) {
  try {
    const userId = req.user._id; // Use MongoDB _id from JWT

    // get sessions where user is either host or participant
    const sessions = await Session.find({
      status: "completed",
      $or: [{ host: userId }, { participant: userId }],
    })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({ sessions });
  } catch (error) {
    console.log("Error in getMyRecentSessions controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getSessionById(req, res) {
  try {
    const { id } = req.params;

    const session = await Session.findById(id)
      .populate("host", "name email profileImage") // Removed clerkId
      .populate("participant", "name email profileImage"); // Removed clerkId

    if (!session) return res.status(404).json({ message: "Session not found" });

    res.status(200).json({ session });
  } catch (error) {
    console.log("Error in getSessionById controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function joinSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id; // Use MongoDB _id from JWT

    const session = await Session.findById(id);

    if (!session) return res.status(404).json({ message: "Session not found" });

    if (session.status !== "active") {
      return res.status(400).json({ message: "Cannot join a completed session" });
    }

    if (session.host.toString() === userId.toString()) {
      return res.status(400).json({ message: "Host cannot join their own session as participant" });
    }

    // Check if user is already a participant
    if (session.participant && session.participant.toString() === userId.toString()) {
      return res.status(200).json({ session, message: "Already joined this session" });
    }

    // Check if session is already full - has a different participant
    if (session.participant) {
      return res.status(409).json({ message: "Session is full - maximum 2 participants allowed" });
    }

    // Set user as participant
    session.participant = userId;
    await session.save();

    // Add user to chat channel
    const channel = chatServer.channel("messaging", session.callId);
    await channel.addMembers([userId.toString()]); // Use MongoDB _id

    res.status(200).json({ session, message: "Joined session successfully" });
  } catch (error) {
    console.log("Error in joinSession controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function leaveSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id; // Use MongoDB _id from JWT

    const session = await Session.findById(id);

    if (!session) return res.status(404).json({ message: "Session not found" });

    if (session.status !== "active") {
      return res.status(400).json({ message: "Cannot leave a completed session" });
    }

    // Host cannot leave (they need to end the session instead)
    if (session.host.toString() === userId.toString()) {
      return res.status(400).json({ message: "Host cannot leave. Please end the session instead." });
    }

    // Check if user is the participant
    if (!session.participant || session.participant.toString() !== userId.toString()) {
      return res.status(400).json({ message: "You are not a participant in this session" });
    }

    // Remove participant from session
    session.participant = null;
    await session.save();

    // Remove user from chat channel
    try {
      const channel = chatServer.channel("messaging", session.callId);
      await channel.removeMembers([userId.toString()]);
    } catch (error) {
      console.log("Error removing from chat channel:", error.message);
      // Continue even if chat removal fails
    }

    res.status(200).json({ session, message: "Left session successfully" });
  } catch (error) {
    console.log("Error in leaveSession controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function endSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id; // Use MongoDB _id from JWT

    const session = await Session.findById(id);

    if (!session) return res.status(404).json({ message: "Session not found" });

    // check if user is the host
    if (session.host.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Only the host can end the session" });
    }

    // check if session is already completed
    if (session.status === "completed") {
      return res.status(400).json({ message: "Session is already completed" });
    }

    // delete stream video call
    const call = videoServer.video.call("default", session.callId);
    await call.delete({ hard: true });

    // delete stream chat channel
    const channel = chatServer.channel("messaging", session.callId);
    await channel.delete();

    session.status = "completed";
    await session.save();

    res.status(200).json({ session, message: "Session ended successfully" });
  } catch (error) {
    console.log("Error in endSession controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}