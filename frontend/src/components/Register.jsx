"use client"

import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import authService from "../lib/auth"
import { Mail, Lock, Loader2, Eye, EyeOff, Chrome, CheckCircle2, User } from "lucide-react"

const Register = ({ onRegisterSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { name, email, password } = formData

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
    setSuccess(false)

    // Basic validation
    if (!name || !email || !password) {
      setError("Please fill in all fields")
      setLoading(false)
      return
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters")
      setLoading(false)
      return
    }

    try {
      const userData = {
        name,
        email,
        password,
      }

      const response = await authService.register(userData)

      if (response.success) {
        // Auto-login after successful registration
        const loginResponse = await authService.login({ email, password });
        if (loginResponse.success) {
          onRegisterSuccess()
          navigate('/dashboard')
        } else {
          setSuccess(true)
          setTimeout(() => {
            navigate('/login')
          }, 2000)
        }
      } else {
        if (response.message && response.message.includes("already exists")) {
          setError("An account with this email already exists. Please use a different email or login instead.")
        } else {
          setError(response.message || "Error registering. Please try again.")
        }
      }
    } catch (err) {
      console.error(err)
      setError("Network error. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          {/* <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 mb-4 shadow-lg shadow-blue-600/30">
            <code className="text-white font-bold text-xl">&lt;/&gt;</code>
          </div> */}
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">CodeFlow</h1>
          <p className="text-gray-400 text-sm font-medium">Collaborative Code Interviews & Practice</p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-2xl border border-gray-800/50 rounded-2xl p-5 shadow-2xl">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-white mb-1">Create Account</h2>
            <p className="text-gray-400 text-sm">Join our collaborative coding community</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-950/40 border border-red-900/50 rounded-lg backdrop-blur-sm">
              <p className="text-red-300 text-sm font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-950/40 border border-green-900/50 rounded-lg backdrop-blur-sm">
              <p className="text-green-300 text-sm font-medium">Registration successful! Redirecting to login...</p>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-3">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-200 mb-2">
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={onChange}
                  placeholder="John Doe"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-gray-800/80 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>

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

            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-700 disabled:to-gray-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* <div className="my-3 flex items-center gap-3"> */}
            {/* <div className="flex-1 h-px bg-gray-800/50"></div>
            <span className="text-xs text-gray-600 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-800/50"></div>
          </div>

          <button
            type="button"
            className="w-full py-3 px-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 hover:border-gray-700 text-gray-300 font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:text-white"
          >
            <Chrome className="w-5 h-5" />
            Continue with Google
          </button> */}

          <div className="mt-4 pt-5 border-t border-gray-800/50 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <button
                onClick={() => navigate('/login')}
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                Sign in here
              </button>
            </p>
          </div>

          <div className="mt-3 text-center">
            <p className="text-xs text-gray-600 font-medium">🔒 Enterprise-grade security • End-to-end encrypted</p>
          </div>
        </div>

        <div className="mt-3 text-center text-xs text-gray-600">
          <p>
            By creating an account, you agree to our{" "}
            <button className="hover:text-gray-400 transition-colors">Terms</button> and{" "}
            <button className="hover:text-gray-400 transition-colors">Privacy Policy</button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register