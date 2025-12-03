import { Users, Code2, Clock, Loader } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router";
import authService from "../lib/auth";

function ActiveSessions({ sessions, isLoading, isUserInSession, user }) {
  const navigate = useNavigate();
  const currentUser = user || authService.getUser();

  const handleJoinSession = (sessionId) => {
    navigate(`/session/${sessionId}`);
  };

  return (
    <div className="card bg-base-100 border-2 border-primary/20 hover:border-primary/30 col-span-1 lg:col-span-2">
      <div className="card-body">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl">
            <Users className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-black">Active Sessions</h2>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : sessions.length > 0 ? (
            sessions.map((session) => {
              const userInSession = isUserInSession(session);
              
              return (
                <div
                  key={session._id}
                  className={`card relative ${
                    userInSession
                      ? "bg-success/10 border-success/30"
                      : "bg-base-200 border-base-300"
                  }`}
                >
                  {userInSession && (
                    <div className="absolute top-3 right-3">
                      <div className="badge badge-success gap-1">
                        <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                        YOU'RE IN
                      </div>
                    </div>
                  )}

                  <div className="card-body p-5">
                    <div className="flex items-start gap-3 mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          userInSession
                            ? "bg-gradient-to-br from-success to-success/70"
                            : "bg-gradient-to-br from-primary to-secondary"
                        }`}
                      >
                        <Code2 className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-base mb-1 truncate">{session.problem}</h3>
                        <span
                          className={`badge badge-sm ${getDifficultyBadgeClass(session.difficulty)}`}
                        >
                          {session.difficulty}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm opacity-80 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>
                          {formatDistanceToNow(new Date(session.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>
                          {session.participant ? "2" : "1"} participant
                          {session.participant ? "s" : ""}
                        </span>
                      </div>
                    </div>

                    {!userInSession && (
                      <button
                        onClick={() => handleJoinSession(session._id)}
                        className="btn btn-primary btn-sm w-full"
                        disabled={!!session.participant && session.participant?._id?.toString() !== currentUser?._id?.toString()}
                      >
                        {session.participant && session.participant?._id?.toString() !== currentUser?._id?.toString() ? "Full" : "Join Session"}
                      </button>
                    )}
                    {userInSession && (
                      <button
                        onClick={() => handleJoinSession(session._id)}
                        className="btn btn-success btn-sm w-full"
                      >
                        Open Session
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-10">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-primary/50" />
              </div>
              <p className="text-lg font-semibold opacity-70 mb-1">No active sessions</p>
              <p className="text-sm opacity-50">Be the first to start a coding session!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActiveSessions;