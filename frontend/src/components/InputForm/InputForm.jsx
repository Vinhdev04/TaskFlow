import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';
import { FaGithub, FaTwitter } from 'react-icons/fa';

const InputForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-4 font-sans">
      {/* Logo Section */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 bg-[#4F46E5] rounded-lg flex items-center justify-center text-white shadow-lg">
          <CheckCircle2 size={24} strokeWidth={2.5} />
        </div>
        <h1 className="text-2xl font-bold text-[#111827]">TaskFlow</h1>
      </div>

      {/* Main Form Card */}
      <div className="w-full max-w-[480px] bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-8 md:p-12">
        <div className="text-center mb-10">
          <h2 className="text-[28px] font-bold text-[#111827] mb-2">Welcome back</h2>
          <p className="text-[#6B7280] text-base">Sign in to your account to continue</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#374151]" htmlFor="email">
              Email address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#9CA3AF] group-focus-within:text-[#4F46E5] transition-colors">
                <Mail size={20} />
              </div>
              <input
                type="email"
                id="email"
                placeholder="alex@company.com"
                className="block w-full pl-11 pr-4 py-3.5 bg-white border border-[#D1D5DB] rounded-xl text-[#111827] placeholder-[#9CA3AF] focus:ring-2 focus:ring-[#4F46E5]/10 focus:border-[#4F46E5] outline-none transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#374151]" htmlFor="password">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#9CA3AF] group-focus-within:text-[#4F46E5] transition-colors">
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="••••••••"
                className="block w-full pl-11 pr-12 py-3.5 bg-white border border-[#D1D5DB] rounded-xl text-[#111827] placeholder-[#9CA3AF] focus:ring-2 focus:ring-[#4F46E5]/10 focus:border-[#4F46E5] outline-none transition-all duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#9CA3AF] hover:text-[#4B5563] transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember & Forgot Section */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-[#D1D5DB] transition-all checked:bg-[#4F46E5] checked:border-[#4F46E5] hover:border-[#4F46E5]"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <div className="pointer-events-none absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
              <span className="text-sm text-[#6B7280] group-hover:text-[#4B5563] transition-colors select-none">Remember me</span>
            </label>
            <a href="#" className="text-sm font-semibold text-[#4F46E5] hover:text-[#4338CA] transition-colors">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold py-4 rounded-xl shadow-md shadow-[#4F46E5]/20 active:transform active:scale-[0.98] transition-all duration-200"
          >
            Sign In <ArrowRight size={20} />
          </button>
        </form>

        {/* Separator */}
        <div className="relative my-10 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E5E7EB]"></div>
          </div>
          <span className="relative bg-white px-4 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">Or continue with</span>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-3 py-3 border border-[#E5E7EB] rounded-xl hover:bg-[#F9FAFB] text-[#374151] font-semibold transition-all">
            <FaGithub size={20} /> GitHub
          </button>
          <button className="flex items-center justify-center gap-3 py-3 border border-[#E5E7EB] rounded-xl hover:bg-[#F9FAFB] text-[#374151] font-semibold transition-all">
            <FaTwitter size={20} className="text-[#1DA1F2]" /> Twitter
          </button>
        </div>
      </div>

      {/* Footer Link */}
      <p className="mt-8 text-[#6B7280] font-medium">
        Don't have an account?{' '}
        <a href="#" className="text-[#4F46E5] font-bold hover:underline transition-all">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default InputForm;
