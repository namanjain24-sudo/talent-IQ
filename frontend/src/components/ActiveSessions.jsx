import {
  ArrowRightIcon,
  Code2Icon,
  CrownIcon,
  SparklesIcon,
  UsersIcon,
  ZapIcon,
  LoaderIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getDifficultyBadgeClass } from "../lib/utils";
import authService from "../lib/auth";

function ActiveSessions({ sessions, isLoading, isUserInSession, user }) {
  const currentUser = user || authService.getUser();

  return (
    <div className="lg:col-span-2 p-8 glass-effect rounded-2xl h-full animate-fade-in">
      <div>
        {/* HEADERS SECTION */}
        <div className="flex items-center justify-between mb-8">
          {/* TITLE AND ICON */}
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-xl">
              <ZapIcon className="size-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Live Sessions</h2>
              <p className="text-sm text-base-content/50 mt-0.5">Join an active coding session</p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
            <div className="size-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-primary">{sessions.length} active</span>
          </div>
        </div>

        {/* SESSIONS LIST */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <LoaderIcon className="size-10 animate-spin text-primary" />
            </div>
          ) : sessions.length > 0 ? (
            sessions.map((session) => (
              <div
                key={session._id}
                className="p-4 bg-base-300/30 border border-primary/10 rounded-lg hover:border-primary/30 transition-all duration-200"
              >
                <div className="flex items-center justify-between gap-4">
                  {/* LEFT SIDE */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Code2Icon className="size-6 text-primary" />
                      <div className="absolute -top-1 -right-1 size-3 bg-primary rounded-full border-2 border-base-200 animate-pulse" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="font-semibold text-base truncate">{session.problem}</h3>
                        <span
                          className={`px-2 py-0.5 text-xs font-semibold rounded ${
                            session.difficulty === 'easy' ? 'bg-primary/10 text-primary' :
                            session.difficulty === 'medium' ? 'bg-warning/10 text-warning' :
                            'bg-error/10 text-error'
                          }`}
                        >
                          {session.difficulty.slice(0, 1).toUpperCase() +
                            session.difficulty.slice(1)}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-base-content/60">
                        <div className="flex items-center gap-1.5">
                          <CrownIcon className="size-3.5" />
                          <span>{session.host?.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <UsersIcon className="size-3.5" />
                          <span>{session.participant ? "2/2" : "1/2"}</span>
                        </div>
                        {session.participant && session.participant?._id?.toString() !== currentUser?._id?.toString() ? (
                          <span className="px-2 py-0.5 bg-error/10 text-error text-xs font-semibold rounded">FULL</span>
                        ) : (
                          <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded">OPEN</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {session.participant && session.participant?._id?.toString() !== currentUser?._id?.toString() ? (
                    <button className="px-4 py-2 bg-base-300/50 text-base-content/40 rounded-lg text-sm font-semibold cursor-not-allowed">Full</button>
                  ) : (
                    <Link to={`/session/${session._id}`} className="px-4 py-2 bg-primary hover:bg-primary/90 text-base-100 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2">
                      {isUserInSession(session) ? "Rejoin" : "Join"}
                      <ArrowRightIcon className="size-4" />
                    </Link>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                <SparklesIcon className="w-8 h-8 text-primary/50" />
              </div>
              <p className="text-base font-semibold text-base-content/70 mb-1">No active sessions</p>
              <p className="text-sm text-base-content/50">Be the first to create one!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActiveSessions;