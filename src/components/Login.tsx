import { useState, FormEvent } from 'react';
import './Login.css';

interface LoginProps {
  onLoginSuccess: (username: string) => void;
}

// Mock users database
const MOCK_USERS = [
  { username: 'admin', password: 'admin123', role: 'Administrator' },
  { username: 'user', password: 'user123', role: 'User' },
  { username: 'demo', password: 'demo', role: 'Guest' },
];

export default function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Check credentials
    const user = MOCK_USERS.find(
      u => u.username === username && u.password === password
    );

    if (user) {
      onLoginSuccess(user.username);
    } else {
      setError('Username o password non validi');
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Animated particles background */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="login-card">
        {/* Logo/Icon */}
        <div className="login-icon">
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="32" cy="32" r="30" fill="url(#gradient)" />
            <path
              d="M32 16C23.163 16 16 23.163 16 32C16 40.837 23.163 48 32 48C40.837 48 48 40.837 48 32C48 23.163 40.837 16 32 16ZM32 28C34.209 28 36 29.791 36 32C36 34.209 34.209 36 32 36C29.791 36 28 34.209 28 32C28 29.791 29.791 28 32 28Z"
              fill="white"
              opacity="0.9"
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="64" y2="64">
                <stop offset="0%" stopColor="#667eea" />
                <stop offset="100%" stopColor="#764ba2" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Title */}
        <h1 className="login-title">Benvenuto</h1>
        <p className="login-subtitle">Accedi al tuo account</p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Username Input */}
          <div className="input-group">
            <label htmlFor="username" className="input-label">
              Username
            </label>
            <div className="input-wrapper">
              <svg
                className="input-icon"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z"
                  fill="currentColor"
                  opacity="0.6"
                />
                <path
                  d="M10 12C4.477 12 0 14.477 0 17.5V20H20V17.5C20 14.477 15.523 12 10 12Z"
                  fill="currentColor"
                  opacity="0.6"
                />
              </svg>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Inserisci username"
                className="input-field"
                required
                autoComplete="username"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="input-group">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <div className="input-wrapper">
              <svg
                className="input-icon"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M15 8H14V5C14 2.243 11.757 0 9 0C6.243 0 4 2.243 4 5V8H3C1.897 8 1 8.897 1 10V18C1 19.103 1.897 20 3 20H15C16.103 20 17 19.103 17 18V10C17 8.897 16.103 8 15 8ZM6 5C6 3.346 7.346 2 9 2C10.654 2 12 3.346 12 5V8H6V5Z"
                  fill="currentColor"
                  opacity="0.6"
                />
              </svg>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Inserisci password"
                className="input-field"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Nascondi password' : 'Mostra password'}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="8" fill="currentColor" opacity="0.2" />
                <path
                  d="M8 4V9M8 11V12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`submit-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Accesso in corso...
              </>
            ) : (
              'Accedi'
            )}
          </button>
        </form>

        {/* Demo Credentials Info */}
        <div className="demo-info">
          <p className="demo-title">🔑 Credenziali Demo:</p>
          <div className="demo-credentials">
            {MOCK_USERS.map((user) => (
              <div key={user.username} className="demo-credential">
                <code>
                  {user.username} / {user.password}
                </code>
                <span className="demo-role">{user.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
