import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRightIcon,
  CheckIcon,
  Code2Icon,
  SparklesIcon,
  UsersIcon,
  VideoIcon,
  ZapIcon,
} from "lucide-react";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-100">
      {/* NAVBAR */}
      <nav className="bg-base-200/50 backdrop-blur-md border-b border-primary/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* LOGO */}
          <Link
            to={"/"}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
          >
            <div className="size-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <SparklesIcon className="size-5 text-primary" />
            </div>

            <div className="flex flex-col">
              <span className="font-bold text-lg text-primary font-mono tracking-wide">
                TALENT IQ
              </span>
              <span className="text-xs text-base-content/50 font-medium -mt-1">Code Together</span>
            </div>
          </Link>

          {/* AUTH BTN */}
          <button 
            onClick={() => navigate('/login')}
            className="group px-6 py-2.5 bg-primary hover:bg-primary/90 rounded-lg text-base-100 font-semibold text-sm transition-all duration-200 flex items-center gap-2"
          >
            <span>Get Started</span>
            <ArrowRightIcon className="size-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-primary">
                Code Together,
              </span>
              <br />
              <span className="text-base-content">Learn Together</span>
            </h1>

            <p className="text-lg text-base-content/60 leading-relaxed max-w-xl">
              The ultimate platform for collaborative coding interviews and pair programming.
              Connect face-to-face, code in real-time, and ace your technical interviews.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => navigate('/login')}
                className="px-8 py-3 bg-primary hover:bg-primary/90 rounded-lg text-base-100 font-semibold transition-all duration-200 flex items-center gap-2"
              >
                <span>Start Coding</span>
                <ArrowRightIcon className="size-5" />
              </button>

              <button className="px-8 py-3 border border-primary/30 hover:border-primary/50 rounded-lg text-base-content font-semibold transition-all duration-200 flex items-center gap-2">
                <VideoIcon className="size-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-base-content/50">Active Users</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-base-content/50">Sessions</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-base-content/50">Uptime</div>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-3xl"></div>
            <img
              src="/image.png"
              alt="CodeCollab Platform"
              className="relative w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to <span className="text-primary">Succeed</span>
          </h2>
          <p className="text-lg text-base-content/50 max-w-2xl mx-auto">
            Powerful features designed to make your coding interviews seamless and productive
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-8 bg-base-200/50 border border-primary/10 rounded-xl hover:border-primary/30 transition-all duration-200">
            <div className="size-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
              <VideoIcon className="size-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">HD Video Call</h3>
            <p className="text-base-content/60 leading-relaxed">
              Crystal clear video and audio for seamless communication during interviews
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 bg-base-200/50 border border-primary/10 rounded-xl hover:border-primary/30 transition-all duration-200">
            <div className="size-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
              <Code2Icon className="size-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Live Code Editor</h3>
            <p className="text-base-content/60 leading-relaxed">
              Collaborate in real-time with syntax highlighting and multiple language support
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 bg-base-200/50 border border-primary/10 rounded-xl hover:border-primary/30 transition-all duration-200">
            <div className="size-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
              <UsersIcon className="size-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Easy Collaboration</h3>
            <p className="text-base-content/60 leading-relaxed">
              Share your screen, discuss solutions, and learn from each other in real-time
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;