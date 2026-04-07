import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';
import { FaGithub, FaTwitter } from 'react-icons/fa';

const InputForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-4 font-sans antialiased">
      {/* Logo Section */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-12 h-12 bg-[#4F46E5] rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
          <CheckCircle2 size={28} strokeWidth={2.5} />
        </div>
        <h1 className="text-3xl font-extrabold text-[#111827] tracking-tight">TaskFlow</h1>
      </div>

      {/* Main Form Card */}
      <div className="w-full max-w-[480px] bg-white rounded-3xl border border-[#E5E7EB] shadow-xl shadow-gray-100/50 p-10 md:p-14">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#111827] mb-3">Welcome back</h2>
          <p className="text-[#6B7280] text-lg font-medium opacity-80">Sign in to your account to continue</p>
        </div>

        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          {/* Email Field */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-[#374151] ml-1" htmlFor="email">
              Email address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#9CA3AF] group-focus-within:text-[#4F46E5] transition-colors">
                <Mail size={22} />
              </div>
              <input
                type="email"
                id="email"
                placeholder="alex@company.com"
                className="block w-full pl-12 pr-4 py-4 bg-white border-2 border-[#E5E7EB] rounded-2xl text-[#111827] text-lg placeholder-[#9CA3AF] focus:ring-4 focus:ring-[#4F46E5]/5 focus:border-[#4F46E5] outline-none transition-all duration-300"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-[#374151] ml-1" htmlFor="password">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#9CA3AF] group-focus-within:text-[#4F46E5] transition-colors">
                <Lock size={22} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="••••••••"
                className="block w-full pl-12 pr-12 py-4 bg-white border-2 border-[#E5E7EB] rounded-2xl text-[#111827] text-lg placeholder-[#9CA3AF] focus:ring-4 focus:ring-[#4F46E5]/5 focus:border-[#4F46E5] outline-none transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-[#9CA3AF] hover:text-[#4B5563] transition-colors"
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
          </div>

          {/* Remember & Forgot Section */}
          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border-2 border-[#D1D5DB] transition-all checked:bg-[#4F46E5] checked:border-[#4F46E5] hover:border-[#4F46E5]"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <div className="pointer-events-none absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1.5">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
              <span className="text-base text-[#6B7280] group-hover:text-[#4B5563] font-medium transition-colors select-none">Remember me</span>
            </label>
            <a href="#" className="text-base font-bold text-[#4F46E5] hover:text-[#4338CA] hover:underline transition-all">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold py-5 rounded-2xl shadow-lg shadow-indigo-100 active:transform active:scale-[0.98] transition-all duration-300 text-lg"
          >
            Sign In <ArrowRight size={22} strokeWidth={2.5} />
          </button>
        </form>

        {/* Separator */}
        <div className="relative my-12 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E5E7EB]"></div>
          </div>
          <span className="relative bg-white px-6 text-sm font-bold text-[#9CA3AF] uppercase tracking-[0.1em]">Or continue with</span>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-5">
          <button className="flex items-center justify-center gap-3 py-4 border-2 border-[#E5E7EB] rounded-2xl hover:bg-[#F9FAFB] hover:border-[#D1D5DB] text-[#374151] font-bold text-base transition-all">
            <FaGithub size={22} /> GitHub
          </button>
          <button className="flex items-center justify-center gap-3 py-4 border-2 border-[#E5E7EB] rounded-2xl hover:bg-[#F9FAFB] hover:border-[#D1D5DB] text-[#374151] font-bold text-base transition-all">
            <FaTwitter size={22} className="text-[#1DA1F2]" /> Twitter
          </button>
        </div>
      </div>

      {/* Footer Link */}
      <p className="mt-12 text-[#6B7280] text-lg font-medium">
        Don't have an account?{' '}
        <a href="#" className="text-[#4F46E5] font-extrabold hover:underline transition-all">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default InputForm;

