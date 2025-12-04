import { Code2, Clock, Users, Trophy, Loader } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import { formatDistanceToNow } from "date-fns";

function RecentSessions({ sessions, isLoading }) {
  return (
    <div className="p-8 glass-effect rounded-2xl mt-8 animate-fade-in">
      <div>
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Clock className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Your Past Sessions</h2>
            <p className="text-sm text-base-content/50 mt-0.5">Review your coding history</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center py-20">
              <Loader className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : sessions.length > 0 ? (
            sessions.map((session, index) => (
              <div
                key={session._id}
                className={`group relative p-6 rounded-xl border transition-all duration-300 ${
                  session.status === "active"
                    ? "bg-primary/5 border-primary/30 hover:border-primary/50"
                    : "bg-base-300/20 border-primary/10 hover:border-primary/30 hover:bg-base-300/30"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {session.status === "active" && (
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-lg flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      ACTIVE
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${
                        session.status === "active"
                          ? "bg-primary/10"
                          : "bg-primary/10"
                      }`}
                    >
                      <Code2 className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg mb-2 truncate">{session.problem}</h3>
                      <span
                        className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                          session.difficulty === 'easy' ? 'bg-primary/10 text-primary' :
                          session.difficulty === 'medium' ? 'bg-warning/10 text-warning' :
                          'bg-error/10 text-error'
                        }`}
                      >
                        {session.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-base-content/60 mb-5">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">
                        {formatDistanceToNow(new Date(session.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span className="font-medium">
                        {session.participant ? "2" : "1"} participant
                        {session.participant ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                    <span className="text-xs font-bold text-base-content/60 uppercase tracking-wide">Completed</span>
                    <span className="text-xs text-base-content/40 font-medium">
                      {new Date(session.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Trophy className="w-8 h-8 text-primary/50" />
              </div>
              <p className="text-base font-semibold text-base-content/70 mb-1">No sessions yet</p>
              <p className="text-sm text-base-content/50">Start your coding journey today!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecentSessions;