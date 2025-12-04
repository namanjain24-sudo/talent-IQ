"use client"

import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import authService from "../lib/auth"
import { Mail, Lock, Loader2, Eye, EyeOff, Chrome, CheckCircle2 } from "lucide-react"

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
    setError("")
  }


  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const userData = {
        email,
        password,
      }

      const response = await authService.login(userData)

      if (response.success) {
        onLoginSuccess()
        navigate('/dashboard')
      } else {
        setError(response.message || "Error logging in")
      }
    } catch (err) {
      console.error(err)
      setError("Error logging in")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="w-full max-w-md relative z-10">
         <div className="text-center mb-10">
          {/* <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 mb-4 shadow-lg shadow-blue-600/30"> */}
            {/* <code className="text-white font-bold text-xl">&lt;/&gt;</code> */}
          {/* </div> */}
          <h1 className="text-4xl font-bold text-primary mb-2 tracking-tight">TALENT IQ</h1>
          <p className="text-gray-400 text-sm font-medium">Collaborative Code Interviews & Practice</p>
        </div> 

        <div className="bg-gray-900/50 backdrop-blur-2xl border border-gray-800/50 rounded-2xl p-6 shadow-2xl">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-white mb-1">Welcome Back</h2>
            <p className="text-gray-400 text-sm">Access your collaborative coding workspace</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-950/40 border border-red-900/50 rounded-lg backdrop-blur-sm">
              <p className="text-red-300 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-2">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder="you@company.com"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-gray-800/80 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-200 mb-2">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-12 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-gray-800/80 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-sm text-gray-400 hover:text-blue-400 transition-colors font-medium">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-700 disabled:to-gray-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* <div className="my-4 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-800/50"></div>
            <span className="text-xs text-gray-600 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-800/50"></div>
          </div> */}

          {/* <button
            type="button"
            className="w-full py-3 px-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 hover:border-gray-700 text-gray-300 font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:text-white"
          >
            <Chrome className="w-5 h-5" />
            Continue with Google
          </button> */}

          <div className="mt-5 pt-6 border-t border-gray-800/50 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <button
                onClick={() => navigate('/register')}
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                Create one now
              </button>
            </p>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-600 font-medium">🔒 Enterprise-grade security • End-to-end encrypted</p>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-gray-600">
          <p>
            By signing in, you agree to our <button className="hover:text-gray-400 transition-colors">Terms</button> and{" "}
            <button className="hover:text-gray-400 transition-colors">Privacy Policy</button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
