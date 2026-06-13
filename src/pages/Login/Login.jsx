import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useValidation, rules } from '../../hooks/useValidation';
import './Login.css';

const loginRules = {
  email:    [rules.required('Email'), rules.email()],
  password: [rules.required('Password')],
};

export default function Login() {
  const { login, authError, loading } = useAuth();
  const { errors, touched, touch, validateAll } = useValidation(loginRules);
  const navigate = useNavigate();

  const [form, setForm]         = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (touched[name]) touch(name, value);
  };
  const handleBlur = (e) => touch(e.target.name, e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll(form)) return;
    const result = await login(form.email, form.password);
    if (result.ok) navigate('/');
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <div className="login-logo-icon">P</div>
          <div>
            <div className="login-logo-name">PRIME</div>
            <div className="login-logo-sub">CONSULTANCY PLC</div>
          </div>
        </div>
        <div className="login-left-content">
          <h1>Welcome Back</h1>
          <p>Sign in to access your personalized consulting portal.</p>
          <div className="login-img-wrap">
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80" alt="Team" className="login-hero-img" />
            <div className="login-img-overlay"><span>🏆</span><div>Ethiopia's Top Consulting Firm</div></div>
          </div>
          <div className="login-stats">
            {[['200+','Projects'],['50+','Experts'],['98%','Satisfaction']].map(([v,l]) => (
              <div key={l} className="ls-item">
                <span className="ls-val">{v}</span>
                <span className="ls-lbl">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="login-right">
        <div className="login-form-container">
          <h2 className="login-title">Sign In</h2>
          <p className="login-subtitle">Access your Prime Consultancy portal.</p>
          <div className="login-hints">
            <p className="hint-label">Quick demo:</p>
            <div className="hints-row">
              <button className="hint-card" onClick={() => setForm({ email: 'user@prime.et', password: 'User@123' })} type="button">
                <span className="hint-icon">👤</span>
                <span className="hint-role">User</span>
                <span className="hint-email">user@prime.et</span>
              </button>
            </div>
          </div>
          {authError && <div className="auth-error" role="alert">{authError}</div>}
          <form onSubmit={handleSubmit} noValidate>
            <div className={`lf-group ${touched.email && errors.email ? 'has-error' : touched.email ? 'has-success' : ''}`}>
              <label htmlFor="email">Email Address</label>
              <div className="lf-input-wrap">
                <input id="email" name="email" type="email" placeholder="your@email.com"
                  value={form.email} onChange={handleChange} onBlur={handleBlur} autoComplete="email" />
              </div>
              {touched.email && errors.email && <p className="lf-error">{errors.email}</p>}
            </div>
            <div className={`lf-group ${touched.password && errors.password ? 'has-error' : touched.password ? 'has-success' : ''}`}>
              <label htmlFor="password">Password</label>
              <div className="lf-input-wrap">
                <input id="password" name="password" type={showPass ? 'text' : 'password'}
                  placeholder="Your password" value={form.password} onChange={handleChange} onBlur={handleBlur} />
                <button type="button" className="lf-toggle-pass" onClick={() => setShowPass(s => !s)}>{showPass ? '🙈' : '👁'}</button>
              </div>
              {touched.password && errors.password && <p className="lf-error">{errors.password}</p>}
            </div>
            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? <><span className="spinner" /> Signing in…</> : 'Sign In →'}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: '#9CA3AF' }}>
            <a href="/" style={{ color: '#1B3A6B', fontWeight: 600 }}>← Back to Website</a>
          </p>
        </div>
      </div>
    </div>
  );
}
