// import React, { useState } from "react";
// import { Eye, EyeOff, Feather, Loader2, AlertCircle } from "lucide-react";
// import { useNavigate, Link } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!email || !password) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/users/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Login failed. Please try again.");
//         return;
//       }

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));
//       navigate("/");
//     } catch (err) {
//       setError("Network error. Is the server running?");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0a0a0f] flex" style={{ fontFamily: "'DM Sans', sans-serif" }}>

//       {/* Left panel вЂ” decorative */}
//       <div className="hidden lg:flex flex-col flex-1 relative overflow-hidden bg-[#0d0d15] border-r border-white/[0.05]">
//         {/* Animated gradient orbs */}
//         <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/20 blur-[120px] animate-pulse" />
//         <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-fuchsia-600/15 blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />

//         {/* Grid pattern */}
//         <div className="absolute inset-0 opacity-[0.03]"
//           style={{
//             backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
//             backgroundSize: "60px 60px"
//           }}
//         />

//         {/* Content */}
//         <div className="relative z-10 flex flex-col justify-between h-full p-14">
//           {/* Logo */}
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/40">
//               <Feather size={20} className="text-white" />
//             </div>
//             <span className="text-white font-bold text-2xl tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
//               Pulse
//             </span>
//           </div>

//           {/* Tagline */}
//           <div className="flex flex-col gap-6">
//             <h1 className="text-white text-5xl font-bold leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
//               Share your<br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
//                 thoughts
//               </span>
//               <br />with the world.
//             </h1>
//             <p className="text-gray-500 text-lg leading-relaxed max-w-sm">
//               Connect, post, and discover what's happening around you right now.
//             </p>
//           </div>

//           {/* Floating post cards */}
//           <div className="flex flex-col gap-3">
//             {[
//               { name: "Alex Rivera", handle: "alexr", text: "Just shipped a new feature рџљЂ Loving the stack!", time: "2m" },
//               { name: "Mia Chen", handle: "miachen", text: "Dark UIs just hit different at 2am honestly", time: "8m" },
//             ].map((post) => (
//               <div key={post.handle} className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-4 backdrop-blur-sm">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500/50 to-fuchsia-500/50 flex items-center justify-center text-white text-xs font-bold">
//                     {post.name[0]}
//                   </div>
//                   <div>
//                     <span className="text-white text-sm font-semibold">{post.name}</span>
//                     <span className="text-gray-500 text-xs ml-2">@{post.handle} В· {post.time}</span>
//                   </div>
//                 </div>
//                 <p className="text-gray-300 text-sm">{post.text}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Right panel вЂ” form */}
//       <div className="flex flex-1 items-center justify-center p-8 lg:max-w-[520px]">
//         <div className="w-full max-w-[400px] flex flex-col gap-8">

//           {/* Mobile logo */}
//           <div className="flex lg:hidden items-center gap-3 mb-2">
//             <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
//               <Feather size={18} className="text-white" />
//             </div>
//             <span className="text-white font-bold text-xl" style={{ fontFamily: "'Syne', sans-serif" }}>Pulse</span>
//           </div>

//           {/* Heading */}
//           <div>
//             <h2 className="text-white text-3xl font-bold mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
//               Welcome back
//             </h2>
//             <p className="text-gray-500 text-sm">Sign in to continue to Pulse</p>
//           </div>

//           {/* Error */}
//           {error && (
//             <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
//               <AlertCircle size={16} className="flex-shrink-0" />
//               {error}
//             </div>
//           )}

//           {/* Form */}
//           <form onSubmit={handleLogin} className="flex flex-col gap-4">
//             {/* Email */}
//             <div className="flex flex-col gap-1.5">
//               <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="you@example.com"
//                 className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-violet-500/60 focus:bg-white/[0.06] transition-all duration-200"
//                 autoComplete="email"
//               />
//             </div>

//             {/* Password */}
//             <div className="flex flex-col gap-1.5">
//               <div className="flex items-center justify-between">
//                 <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Password</label>
//                 <button type="button" className="text-violet-400 text-xs hover:text-violet-300 transition-colors duration-200">
//                   Forgot password?
//                 </button>
//               </div>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="вЂўвЂўвЂўвЂўвЂўвЂўвЂўвЂў"
//                   className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 pr-12 text-white text-sm placeholder-gray-600 outline-none focus:border-violet-500/60 focus:bg-white/[0.06] transition-all duration-200"
//                   autoComplete="current-password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors duration-200"
//                 >
//                   {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                 </button>
//               </div>
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="mt-2 w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2"
//             >
//               {loading ? <Loader2 size={16} className="animate-spin" /> : null}
//               {loading ? "Signing in..." : "Sign in"}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="flex items-center gap-4">
//             <div className="flex-1 h-px bg-white/[0.06]" />
//             <span className="text-gray-600 text-xs">or</span>
//             <div className="flex-1 h-px bg-white/[0.06]" />
//           </div>

//           {/* Register link */}
//           <p className="text-center text-gray-500 text-sm">
//             Don't have an account?{" "}
//             <Link to="/register" className="text-violet-400 font-semibold hover:text-violet-300 transition-colors duration-200">
//               Create one
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import { Eye, EyeOff, Feather, Loader2, AlertCircle } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed. Please try again.");
        return;
      }

      login(data.user, data.token);
      navigate("/");
    } catch (err) {
      setError("Network error. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Left panel вЂ” decorative */}
      <div className="hidden lg:flex flex-col flex-1 relative overflow-hidden bg-[#0d0d15] border-r border-white/[0.05]">
        {/* Animated gradient orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-fuchsia-600/15 blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "60px 60px"
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-14">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/40">
              <Feather size={20} className="text-white" />
            </div>
            <span className="text-white font-bold text-2xl tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              Pulse
            </span>
          </div>

          {/* Tagline */}
          <div className="flex flex-col gap-6">
            <h1 className="text-white text-5xl font-bold leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              Share your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                thoughts
              </span>
              <br />with the world.
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed max-w-sm">
              Connect, post, and discover what's happening around you right now.
            </p>
          </div>

          {/* Floating post cards */}
          <div className="flex flex-col gap-3">
            {[
              { name: "Alex Rivera", handle: "alexr", text: "Just shipped a new feature рџљЂ Loving the stack!", time: "2m" },
              { name: "Mia Chen", handle: "miachen", text: "Dark UIs just hit different at 2am honestly", time: "8m" },
            ].map((post) => (
              <div key={post.handle} className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500/50 to-fuchsia-500/50 flex items-center justify-center text-white text-xs font-bold">
                    {post.name[0]}
                  </div>
                  <div>
                    <span className="text-white text-sm font-semibold">{post.name}</span>
                    <span className="text-gray-500 text-xs ml-2">@{post.handle} В· {post.time}</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">{post.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel вЂ” form */}
      <div className="flex flex-1 items-center justify-center p-8 lg:max-w-[520px]">
        <div className="w-full max-w-[400px] flex flex-col gap-8">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <Feather size={18} className="text-white" />
            </div>
            <span className="text-white font-bold text-xl" style={{ fontFamily: "'Syne', sans-serif" }}>Pulse</span>
          </div>

          {/* Heading */}
          <div>
            <h2 className="text-white text-3xl font-bold mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
              Welcome back
            </h2>
            <p className="text-gray-500 text-sm">Sign in to continue to Pulse</p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
              <AlertCircle size={16} className="flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-violet-500/60 focus:bg-white/[0.06] transition-all duration-200"
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Password</label>
                <button type="button" className="text-violet-400 text-xs hover:text-violet-300 transition-colors duration-200">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="12345abcd"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 pr-12 text-white text-sm placeholder-gray-600 outline-none focus:border-violet-500/60 focus:bg-white/[0.06] transition-all duration-200"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-gray-600 text-xs">or</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* Register link */}
          <p className="text-center text-gray-500 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-violet-400 font-semibold hover:text-violet-300 transition-colors duration-200">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

