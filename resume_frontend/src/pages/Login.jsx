import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../api/AuthService";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await AuthService.login(username, password);
      toast.success("Login successful!");
      navigate("/");
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6" 
    >
      <div className="relative w-full max-w-md animate-fade-in-up">
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl"></div>

        <div className="glass-effect dark:glass-dark rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-2xl border border-white/40 dark:border-white/10">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 italic">Welcome <span className="text-primary tracking-tighter">Back</span></h2>
            <p className="text-slate-500 font-medium italic">Your dream job is waiting for you.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-black uppercase tracking-widest text-slate-400 ml-2">Username</label>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="input input-bordered w-full bg-white/50 dark:bg-slate-800/50 border-white/50 dark:border-slate-700/50 rounded-2xl focus:ring-2 focus:ring-primary h-14 transition-all"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black uppercase tracking-widest text-slate-400 ml-2">Password</label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="input input-bordered w-full bg-white/50 dark:bg-slate-800/50 border-white/50 dark:border-slate-700/50 rounded-2xl focus:ring-2 focus:ring-primary h-14 transition-all pr-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-primary transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button 
                className={`btn btn-primary w-full h-14 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all ${loading ? "loading" : ""}`} 
                disabled={loading}
              >
                {loading ? "Verifying..." : "Sign In"}
              </button>
            </div>
          </form>

          <div className="text-center mt-10 space-y-4">
            <p className="text-slate-500 font-medium">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary font-bold hover:underline transition-all">
                Create Account
              </Link>
            </p>
            <div className="divider text-xs uppercase tracking-[0.2em] font-black text-slate-300">or</div>
            <Link to="/" className="btn btn-ghost btn-sm text-slate-400 hover:text-primary transition-colors">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
