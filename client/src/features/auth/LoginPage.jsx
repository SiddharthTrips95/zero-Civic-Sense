import { useMemo, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { GlassCard, GlassButton, GlassInput } from '@/components/ui';
import { useAuth } from './AuthContext';
import './login.css';


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, signIn, signUp, signInAsGuest, isInitializing } = useAuth();

  const [mode, setMode] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

const nextPath =
  location.state?.from && typeof location.state.from === "string"
    ? location.state.from
    : "/";

  const isSignUp = mode === 'signup';
  const normalizedEmail = email.trim().toLowerCase();

  const validation = useMemo(() => {
    const isEmailValid = EMAIL_REGEX.test(normalizedEmail);
    const isPasswordValid = password.length >= 8;
    const isNameValid = isSignUp ? name.trim().length >= 2 : true;
    const doPasswordsMatch = isSignUp ? password === confirmPassword : true;

    return {
      isEmailValid,
      isPasswordValid,
      isNameValid,
      doPasswordsMatch,
      canSubmit: isEmailValid && isPasswordValid && isNameValid && doPasswordsMatch,
    };
  }, [confirmPassword, isSignUp, name, normalizedEmail, password]);

  if (!isInitializing && isAuthenticated) {
    return <Navigate to={nextPath} replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!validation.canSubmit || isSubmitting) return;

    setIsSubmitting(true);

    try {
      if (isSignUp) {
        await signUp({ name: name.trim(), email, password });
      } else {
        await signIn({ email, password });
      }
      navigate(nextPath, { replace: true });
    } catch (error) {
      const fallback = isSignUp
        ? 'Unable to create account right now. Please try again.'
        : 'Unable to sign in. Please verify your credentials.';
      setErrorMessage(error instanceof Error && error.message ? error.message : fallback);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuestAccess = () => {
    signInAsGuest();
    navigate('/', { replace: true });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left col form */}
        <div className="login-form">
          <h1>
            {isSignUp ? 'Create your Civic account' : 'Sign in to CivicChain'}
          </h1>
          <p>
            {isSignUp
              ? 'Start reporting and tracking civic issues with privacy-first identity.'
              : 'Continue with your secure civic identity and dashboard access.'}
          </p>
          <div className="mode-toggle">
            <GlassButton
              onClick={() => { setMode('signin'); setErrorMessage(null); }}
            >
              Sign In
            </GlassButton>
            <GlassButton
              onClick={() => { setMode('signup'); setErrorMessage(null); }}
            >
              Sign Up
            </GlassButton>
          </div>
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <GlassInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
                required
              />
            )}
            <GlassInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
            <GlassInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              required
            />
            {isSignUp && (
              <GlassInput
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                autoComplete="new-password"
                required
              />
            )}
            {!validation.isEmailValid && email.length > 0 && (
              <p className="error">Enter a valid email address.</p>
            )}
            {!validation.isPasswordValid && password.length > 0 && (
              <p className="error">Password must be at least 8 characters long.</p>
            )}
            {isSignUp && !validation.doPasswordsMatch && confirmPassword.length > 0 && (
              <p className="error">Passwords do not match.</p>
            )}
            {errorMessage && <p className="error">{errorMessage}</p>}
            <div className="form-actions">
              <GlassButton
                type="submit"
                disabled={!validation.canSubmit || isSubmitting}
              >
                {isSubmitting ? 'Please wait…' : isSignUp ? 'Create Account' : 'Sign In'}
              </GlassButton>
              <GlassButton
                onClick={handleGuestAccess}
              >
                Continue as Guest
              </GlassButton>
            </div>
          </form>
        </div>
        {/* Right col info */}
        <div className="login-info">
          <div className="info-content">
            <p>
              Auth is now live for account creation and sign in. Anonymous reporting currently
              uses pseudonymous IDs.
            </p>
            <p>
              Full zero-knowledge identity proofs are planned as the next security milestone
              once backend proof verification is integrated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;