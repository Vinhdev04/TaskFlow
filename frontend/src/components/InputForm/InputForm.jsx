import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import './InputForm.css';

const InputForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="login-form">
      {/* Logo Section */}
      <div className="login-form__logo-container">
        <div className="login-form__logo-box">
          <CheckCircle2 size={28} strokeWidth={2.5} />
        </div>
        <h1 className="login-form__logo-text">TaskFlow</h1>
      </div>

      {/* Main Form Card */}
      <div className="login-form__card">
        <div className="login-form__header">
          <h2 className="login-form__title">Welcome back</h2>
          <p className="login-form__subtitle">Sign in to your account to continue</p>
        </div>

        <form className="login-form__body" onSubmit={(e) => e.preventDefault()}>
          <div className="container-fluid p-0">
            {/* Email Field */}
            <div className="row mb-4">
              <div className="col-12 login-form__group">
                <label className="login-form__label" htmlFor="email">
                  Email address
                </label>
                <div className="login-form__input-wrapper">
                  <div className="login-form__icon-left">
                    <Mail size={22} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    placeholder="alex@company.com"
                    className="login-form__input"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="row mb-4">
              <div className="col-12 login-form__group">
                <label className="login-form__label" htmlFor="password">
                  Password
                </label>
                <div className="login-form__input-wrapper">
                  <div className="login-form__icon-left">
                    <Lock size={22} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="••••••••"
                    className="login-form__input"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="login-form__password-toggle"
                  >
                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Remember & Forgot Section */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="login-form__actions">
                  <label className="login-form__remember">
                    <input
                      type="checkbox"
                      className="login-form__checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <span className="login-form__remember-text">Remember me</span>
                  </label>
                  <a href="#" className="login-form__forgot">
                    Forgot password?
                  </a>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="row mb-4">
              <div className="col-12">
                <button type="submit" className="login-form__submit">
                  Sign In <ArrowRight size={22} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Separator */}
            <div className="row">
              <div className="col-12">
                <div className="login-form__separator">
                  <div className="login-form__separator-line"></div>
                  <span className="login-form__separator-text">Or continue with</span>
                </div>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="row">
              <div className="col-12">
                <div className="login-form__social-grid">
                  <button type="button" className="login-form__social-btn">
                    <FaGithub size={22} /> GitHub
                  </button>
                  <button type="button" className="login-form__social-btn">
                    <FaTwitter size={22} className="login-form__social-icon--twitter" /> Twitter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Footer Link */}
      <div className="login-form__footer">
        <p>
          Don't have an account?{' '}
          <a href="#" className="login-form__signup-link">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default InputForm;
