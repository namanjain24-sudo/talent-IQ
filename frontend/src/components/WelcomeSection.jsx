import { ArrowRightIcon, SparklesIcon, ZapIcon } from "lucide-react";
import authService from "../lib/auth";

function WelcomeSection({ onCreateSession }) {
  const user = authService.getUser();

  return (
    <div className="relative overflow-hidden bg-base-200/30">
      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-4xl font-bold text-primary">
                Welcome back, {user?.name || "there"}!
              </h1>
            </div>
            <p className="text-lg text-base-content/50 ml-13">
              Ready to level up your coding skills?
            </p>
          </div>
          <button
            onClick={onCreateSession}
            className="group px-6 py-3 bg-primary hover:bg-primary/90 rounded-lg transition-all duration-200 flex items-center gap-2"
          >
            <ZapIcon className="w-5 h-5 text-base-100" />
            <span className="text-base-100 font-semibold">Create Session</span>
            <ArrowRightIcon className="w-4 h-4 text-base-100 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;