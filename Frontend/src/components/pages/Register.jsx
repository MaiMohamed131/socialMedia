// import React, { useState } from "react";
// import { Eye, EyeOff, Feather, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
// import { useNavigate, Link } from "react-router-dom";

// function Register() {
//   const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

//   // Password strength
//   const strength = (() => {
//     const p = form.password;
//     if (!p) return 0;
//     let score = 0;
//     if (p.length >= 8) score++;
//     if (/[A-Z]/.test(p)) score++;
//     if (/[0-9]/.test(p)) score++;
//     if (/[^A-Za-z0-9]/.test(p)) score++;
//     return score;
//   })();
//   const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
//   const strengthColor = ["", "bg-red-500", "bg-amber-400", "bg-emerald-400", "bg-emerald-500"][strength];

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!form.name || !form.email || !form.password || !form.confirm) {
//       setError("Please fill in all fields.");
//       return;
//     }
//     if (form.password !== form.confirm) {
//       setError("Passwords do not match.");
//       return;
//     }
//     if (form.password.length < 6) {
//       setError("Password must be at least 6 characters.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/users/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Registration failed. Please try again.");
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

//   const fields = [
//     { key: "name", label: "Full Name", type: "text", placeholder: "Jane Doe", autoComplete: "name" },
//     { key: "email", label: "Email", type: "email", placeholder: "you@example.com", autoComplete: "email" },
//   ];

//   return (
//     <div className="min-h-screen bg-[#0a0a0f] flex" style={{ fontFamily: "'DM Sans', sans-serif" }}>

//       {/* Left decorative panel */}
//       <div className="hidden lg:flex flex-col flex-1 relative overflow-hidden bg-[#0d0d15] border-r border-white/[0.05]">
//         <div className="absolute top-[-15%] right-[-10%] w-[550px] h-[550px] rounded-full bg-fuchsia-600/20 blur-[120px] animate-pulse" />
//         <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-violet-600/15 blur-[100px] animate-pulse" style={{ animationDelay: "1.2s" }} />

//         <div className="absolute inset-0 opacity-[0.03]"
//           style={{
//             backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
//             backgroundSize: "40px 40px"
//           }}
//         />

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

//           {/* Center content */}
//           <div>
//             <h1 className="text-white text-5xl font-bold leading-tight mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
//               Your voice.<br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
//                 Amplified.
//               </span>
//             </h1>
//             <p className="text-gray-500 text-lg leading-relaxed max-w-sm mb-10">
//               Join thousands of people sharing ideas, stories, and moments every day.
//             </p>

//             {/* Stats */}
//             <div className="flex gap-8">
//               {[
//                 { value: "10k+", label: "Members" },
//                 { value: "50k+", label: "Posts daily" },
//                 { value: "99%", label: "Uptime" },
//               ].map((stat) => (
//                 <div key={stat.label}>
//                   <p className="text-white text-2xl font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>{stat.value}</p>
//                   <p className="text-gray-600 text-sm">{stat.label}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Bottom perks */}
//           <div className="flex flex-col gap-3">
//             {[
//               "Free to join, always",
//               "No ads, ever",
//               "Your data stays yours",
//             ].map((perk) => (
//               <div key={perk} className="flex items-center gap-3">
//                 <CheckCircle2 size={16} className="text-violet-400 flex-shrink-0" />
//                 <span className="text-gray-400 text-sm">{perk}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Right form panel */}
//       <div className="flex flex-1 items-center justify-center p-8 lg:max-w-[520px]">
//         <div className="w-full max-w-[400px] flex flex-col gap-7">

//           {/* Mobile logo */}
//           <div className="flex lg:hidden items-center gap-3">
//             <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
//               <Feather size={18} className="text-white" />
//             </div>
//             <span className="text-white font-bold text-xl" style={{ fontFamily: "'Syne', sans-serif" }}>Pulse</span>
//           </div>

//           {/* Heading */}
//           <div>
//             <h2 className="text-white text-3xl font-bold mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
//               Create account
//             </h2>
//             <p className="text-gray-500 text-sm">Join Pulse and start sharing today</p>
//           </div>

//           {/* Error */}
//           {error && (
//             <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
//               <AlertCircle size={16} className="flex-shrink-0" />
//               {error}
//             </div>
//           )}

//           {/* Form */}
//           <form onSubmit={handleRegister} className="flex flex-col gap-4">
//             {/* Name & Email */}
//             {fields.map(({ key, label, type, placeholder, autoComplete }) => (
//               <div key={key} className="flex flex-col gap-1.5">
//                 <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">{label}</label>
//                 <input
//                   type={type}
//                   value={form[key]}
//                   onChange={update(key)}
//                   placeholder={placeholder}
//                   autoComplete={autoComplete}
//                   className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-violet-500/60 focus:bg-white/[0.06] transition-all duration-200"
//                 />
//               </div>
//             ))}

//             {/* Password */}
//             <div className="flex flex-col gap-1.5">
//               <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Password</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={form.password}
//                   onChange={update("password")}
//                   placeholder="••••••••"
//                   autoComplete="new-password"
//                   className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 pr-12 text-white text-sm placeholder-gray-600 outline-none focus:border-violet-500/60 focus:bg-white/[0.06] transition-all duration-200"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors duration-200"
//                 >
//                   {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                 </button>
//               </div>

//               {/* Strength meter */}
//               {form.password.length > 0 && (
//                 <div className="flex items-center gap-2 mt-1">
//                   <div className="flex gap-1 flex-1">
//                     {[1, 2, 3, 4].map((i) => (
//                       <div
//                         key={i}
//                         className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor : "bg-white/[0.07]"}`}
//                       />
//                     ))}
//                   </div>
//                   <span className={`text-xs font-medium ${["", "text-red-400", "text-amber-400", "text-emerald-400", "text-emerald-400"][strength]}`}>
//                     {strengthLabel}
//                   </span>
//                 </div>
//               )}
//             </div>

//             {/* Confirm password */}
//             <div className="flex flex-col gap-1.5">
//               <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Confirm Password</label>
//               <div className="relative">
//                 <input
//                   type={showConfirm ? "text" : "password"}
//                   value={form.confirm}
//                   onChange={update("confirm")}
//                   placeholder="••••••••"
//                   autoComplete="new-password"
//                   className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3 pr-12 text-white text-sm placeholder-gray-600 outline-none transition-all duration-200
//                     ${form.confirm && form.confirm !== form.password
//                       ? "border-red-500/40 focus:border-red-500/60"
//                       : form.confirm && form.confirm === form.password
//                       ? "border-emerald-500/40 focus:border-emerald-500/60"
//                       : "border-white/[0.08] focus:border-violet-500/60"
//                     } focus:bg-white/[0.06]`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirm(!showConfirm)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors duration-200"
//                 >
//                   {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
//                 </button>
//                 {form.confirm && form.confirm === form.password && (
//                   <CheckCircle2 size={14} className="absolute right-10 top-1/2 -translate-y-1/2 text-emerald-400" />
//                 )}
//               </div>
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="mt-2 w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2"
//             >
//               {loading ? <Loader2 size={16} className="animate-spin" /> : null}
//               {loading ? "Creating account..." : "Create account"}
//             </button>
//           </form>

//           {/* Terms note */}
//           <p className="text-center text-gray-600 text-xs leading-relaxed">
//             By creating an account you agree to our{" "}
//             <span className="text-gray-400 cursor-pointer hover:text-violet-400 transition-colors duration-200">Terms</span>{" "}
//             and{" "}
//             <span className="text-gray-400 cursor-pointer hover:text-violet-400 transition-colors duration-200">Privacy Policy</span>
//           </p>

//           {/* Login link */}
//           <p className="text-center text-gray-500 text-sm">
//             Already have an account?{" "}
//             <Link to="/login" className="text-violet-400 font-semibold hover:text-violet-300 transition-colors duration-200">
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;


import React, { useState } from "react";
import { Eye, EyeOff, Feather, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../UserContext";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  // Password strength
  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  })();
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "bg-red-500", "bg-amber-400", "bg-emerald-400", "bg-emerald-500"][strength];

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed. Please try again.");
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

  const fields = [
    { key: "name", label: "Full Name", type: "text", placeholder: "Jane Doe", autoComplete: "name" },
    { key: "email", label: "Email", type: "email", placeholder: "you@example.com", autoComplete: "email" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Left decorative panel */}
      <div className="hidden lg:flex flex-col flex-1 relative overflow-hidden bg-[#0d0d15] border-r border-white/[0.05]">
        <div className="absolute top-[-15%] right-[-10%] w-[550px] h-[550px] rounded-full bg-fuchsia-600/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-violet-600/15 blur-[100px] animate-pulse" style={{ animationDelay: "1.2s" }} />

        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "40px 40px"
          }}
        />

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

          {/* Center content */}
          <div>
            <h1 className="text-white text-5xl font-bold leading-tight mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
              Your voice.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                Amplified.
              </span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed max-w-sm mb-10">
              Join thousands of people sharing ideas, stories, and moments every day.
            </p>

            {/* Stats */}
            <div className="flex gap-8">
              {[
                { value: "10k+", label: "Members" },
                { value: "50k+", label: "Posts daily" },
                { value: "99%", label: "Uptime" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-white text-2xl font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>{stat.value}</p>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom perks */}
          <div className="flex flex-col gap-3">
            {[
              "Free to join, always",
              "No ads, ever",
              "Your data stays yours",
            ].map((perk) => (
              <div key={perk} className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-violet-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 items-center justify-center p-8 lg:max-w-[520px]">
        <div className="w-full max-w-[400px] flex flex-col gap-7">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <Feather size={18} className="text-white" />
            </div>
            <span className="text-white font-bold text-xl" style={{ fontFamily: "'Syne', sans-serif" }}>Pulse</span>
          </div>

          {/* Heading */}
          <div>
            <h2 className="text-white text-3xl font-bold mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
              Create account
            </h2>
            <p className="text-gray-500 text-sm">Join Pulse and start sharing today</p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
              <AlertCircle size={16} className="flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            {/* Name & Email */}
            {fields.map(({ key, label, type, placeholder, autoComplete }) => (
              <div key={key} className="flex flex-col gap-1.5">
                <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">{label}</label>
                <input
                  type={type}
                  value={form[key]}
                  onChange={update(key)}
                  placeholder={placeholder}
                  autoComplete={autoComplete}
                  className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-violet-500/60 focus:bg-white/[0.06] transition-all duration-200"
                />
              </div>
            ))}

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={update("password")}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 pr-12 text-white text-sm placeholder-gray-600 outline-none focus:border-violet-500/60 focus:bg-white/[0.06] transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Strength meter */}
              {form.password.length > 0 && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor : "bg-white/[0.07]"}`}
                      />
                    ))}
                  </div>
                  <span className={`text-xs font-medium ${["", "text-red-400", "text-amber-400", "text-emerald-400", "text-emerald-400"][strength]}`}>
                    {strengthLabel}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={form.confirm}
                  onChange={update("confirm")}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3 pr-12 text-white text-sm placeholder-gray-600 outline-none transition-all duration-200
                    ${form.confirm && form.confirm !== form.password
                      ? "border-red-500/40 focus:border-red-500/60"
                      : form.confirm && form.confirm === form.password
                      ? "border-emerald-500/40 focus:border-emerald-500/60"
                      : "border-white/[0.08] focus:border-violet-500/60"
                    } focus:bg-white/[0.06]`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors duration-200"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                {form.confirm && form.confirm === form.password && (
                  <CheckCircle2 size={14} className="absolute right-10 top-1/2 -translate-y-1/2 text-emerald-400" />
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* Terms note */}
          <p className="text-center text-gray-600 text-xs leading-relaxed">
            By creating an account you agree to our{" "}
            <span className="text-gray-400 cursor-pointer hover:text-violet-400 transition-colors duration-200">Terms</span>{" "}
            and{" "}
            <span className="text-gray-400 cursor-pointer hover:text-violet-400 transition-colors duration-200">Privacy Policy</span>
          </p>

          {/* Login link */}
          <p className="text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-violet-400 font-semibold hover:text-violet-300 transition-colors duration-200">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;

