import React,{useState} from 'react'
import "../auth.css"
import { useNavigate,Link } from 'react-router-dom';
import {useAuth} from "../hooks/useAuth"
import { Mail, Lock, Eye, EyeOff, Rocket } from 'lucide-react';

const Login = () => {
  const {loading,handleLogin} = useAuth();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    await handleLogin({email,password});
    navigate("/");
  }
  if(loading){
    return <main><h1>Loading...</h1></main>
  }




  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <Rocket size={32} />
            <h2>Ethara</h2>
          </div>
          <p className="auth-subtitle">Precision Task Engineering</p>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-lead">Sign in to continue your sprint</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address *</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input type="email" placeholder="Email"  onChange={(e)=>{setEmail(e.target.value)}} required />
            </div>
          </div>

          <div className="form-group">
            <div className="label-row">
              <label>Password *</label>
              <Link to="/register" className="auth-link small">Forgot?</Link>
            </div>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                onChange={(e)=>{setPassword(e.target.value)}} 
                required 
              />
              <div 
                className="visibility-icon" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Remember me for 30 days
            </label>
          </div>

          <button type="submit" className="auth-btn-primary">
            Sign In 
            {/* <span className="material-icons">arrow_forward</span> */}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR CONTINUE WITH</span>
        </div>

        <div className="social-auth-grid">
          <button type="button" className="social-btn">
            <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" alt="Google" />
            Google
          </button>
          <button type="button" className="social-btn">
            <i className="devicon-github-original"></i>
            GitHub
          </button>
        </div>

        <p className="auth-footer-text">
          New to the platform? <Link to="/register" className="auth-link">Register</Link>
        </p>

        {/* <div className="auth-legal-footer">
          <span>© 2026 Ethara Task Manager. Precision & Control.</span>
          <div className="legal-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#security">Security</a>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Login