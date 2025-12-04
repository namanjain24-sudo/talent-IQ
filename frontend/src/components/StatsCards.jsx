import { TrophyIcon, UsersIcon } from "lucide-react";

function StatsCards({ activeSessionsCount, recentSessionsCount }) {
  return (
    <div className="lg:col-span-1 grid grid-cols-1 gap-6">
      {/* Active Count */}
      <div className="p-6 bg-base-200/50 border border-primary/10 rounded-xl hover:border-primary/30 transition-all duration-200">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 bg-primary/10 rounded-lg">
            <UsersIcon className="w-6 h-6 text-primary" />
          </div>
          <div className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">Live</div>
        </div>
        <div className="text-3xl font-bold mb-1">{activeSessionsCount}</div>
        <div className="text-sm text-base-content/50">Active Sessions</div>
      </div>

      {/* Recent Count */}
      <div className="p-6 bg-base-200/50 border border-primary/10 rounded-xl hover:border-primary/30 transition-all duration-200">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 bg-primary/10 rounded-lg">
            <TrophyIcon className="w-6 h-6 text-primary" />
          </div>
        </div>
        <div className="text-3xl font-bold mb-1">{recentSessionsCount}</div>
        <div className="text-sm text-base-content/50">Total Sessions</div>
      </div>
    </div>
  );
}

export default StatsCards;