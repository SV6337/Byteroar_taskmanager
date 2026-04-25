import './App.css';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';

async function readApiResponse(response) {
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  const text = await response.text();
  throw new Error(text.includes('<!DOCTYPE') ? 'Backend API is not reachable. Start server with npm run dev.' : 'Unexpected API response.');
}

function AuthLayout({ title, children, alternateText, alternateLink, alternateCta }) {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>{title}</h1>
        {children}
        <p className="auth-link-row">
          <button type="button" className="text-link" onClick={() => window.alert('Please contact support to reset your password.')}>
            Forgot Username / Password?
          </button>
        </p>
        <p className="auth-link-row">
          {alternateText}{' '}
          <Link to={alternateLink}>{alternateCta}</Link>
        </p>
      </div>
    </div>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await readApiResponse(response);
      if (!response.ok) {
        throw new Error(data.message || 'Login failed.');
      }

      navigate('/login-success');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Login"
      alternateText="Don't have an account?"
      alternateLink="/signup"
      alternateCta="Sign up"
    >
      <form className="auth-form" onSubmit={handleLogin}>
        <label htmlFor="login-email">Email:</label>
        <input
          id="login-email"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="login-password">Password:</label>
        <input
          id="login-password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <label className="checkbox-row" htmlFor="show-password">
          <input
            id="show-password"
            type="checkbox"
            checked={showPassword}
            onChange={(event) => setShowPassword(event.target.checked)}
          />
          Show Password
        </label>

        <button type="submit" disabled={isLoading}>{isLoading ? 'SIGNING IN...' : 'SIGN IN'}</button>
      </form>
      {message ? <p className="form-message error">{message}</p> : null}
    </AuthLayout>
  );
}

function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await readApiResponse(response);

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed.');
      }

      navigate('/signup-success');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Sign Up"
      alternateText="Already have an account?"
      alternateLink="/"
      alternateCta="Sign in"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="signup-name">Name:</label>
        <input
          id="signup-name"
          name="name"
          type="text"
          placeholder="Enter full name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="signup-email">Email:</label>
        <input
          id="signup-email"
          name="email"
          type="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="signup-password">Password:</label>
        <input
          id="signup-password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Create password"
          value={form.password}
          onChange={handleChange}
          required
          minLength={6}
        />

        <label className="checkbox-row" htmlFor="signup-show-password">
          <input
            id="signup-show-password"
            type="checkbox"
            checked={showPassword}
            onChange={(event) => setShowPassword(event.target.checked)}
          />
          Show Password
        </label>

        <button type="submit" disabled={isLoading}>{isLoading ? 'CREATING...' : 'CREATE ACCOUNT'}</button>
      </form>
      {message ? <p className="form-message error">{message}</p> : null}
    </AuthLayout>
  );
}

function SignupSuccessPage() {
  return (
    <div className="auth-page">
      <div className="auth-card success-card">
        <h1>Successful Sign Up</h1>
        <p className="success-subtext">Your account has been created.</p>
        <Link className="success-link" to="/">Go to Login</Link>
      </div>
    </div>
  );
}

function LoginSuccessPage() {
  return (
    <div className="auth-page">
      <div className="auth-card success-card">
        <h1>Login Successful</h1>
        <p className="success-subtext">You are authenticated.</p>
        <Link className="success-link" to="/">Back to Login</Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup-success" element={<SignupSuccessPage />} />
        <Route path="/login-success" element={<LoginSuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
