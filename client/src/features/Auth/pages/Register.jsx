import React,{useState} from 'react'
import "../auth.css"
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, User, ShieldCheck, Badge } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const {loading,handleRegister} = useAuth();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("member");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    await handleRegister({ name, email, password, role });
    navigate("/");
  };

  if (loading) {
    return <main className="auth-container"><h1>Loading...</h1></main>;
  }

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <div className="auth-header">
          <div className="auth-logo">
            <span className="material-icons">rocket_launch</span>
            <h2>Ethara</h2>
          </div>
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-lead">Precision task management starts here.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <div className="input-wrapper">
              <User className="input-icon" size={20} />
              <input type="text" onChange={(e)=>{setName(e.target.value)}} placeholder="John Doe" required />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="name@company.com" required />
            </div>
          </div>

          <div className="form-grid-2col">
            <div className="form-group">
              <label>Password *</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  onChange={(e)=>{setPassword(e.target.value)}} 
                  required 
                />
                <div className="visibility-icon" onClick={() => setShowPassword(!showPassword)}>
                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Confirm Password *</label>
              <div className="input-wrapper">
                <ShieldCheck className="input-icon" size={20} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required 
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Workspace Role *</label>
            <div className="input-wrapper">
              <Badge className="input-icon" size={20} />
              <select defaultValue="member" onChange={(e)=>{setRole(e.target.value)}} className="auth-select">
                <option value="member">Team Member</option>
                <option value="admin">Workspace Administrator</option>
              </select>
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" required />
              <span className="checkmark"></span>
              I agree to the <a href="#terms" className="auth-link">Terms and Conditions</a> and <a href="#privacy" className="auth-link">Privacy Policy</a>.
            </label>
          </div>

          <button type="submit" className="auth-btn-primary">
            Create Account
             {/* <span className="material-icons">arrow_forward</span> */}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR REGISTER WITH</span>
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
          Already have an account? <Link to="/login" className="auth-link">Login</Link>
        </p>

        
      </div>
    </div>
  );
}


export default Register