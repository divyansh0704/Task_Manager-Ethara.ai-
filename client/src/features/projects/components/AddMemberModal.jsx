import React,{useState} from 'react'
import "./addmember.css"
// import { useProject } from '../hooks/useProject';
import { UserPlus, X, Mail, ChevronRight } from 'lucide-react'; 

const AddMemberModal = ({setShowAddMember,projectId,handleAddMember}) => {
  
  const[email,setEmail] = useState('');

//   const {handleAddMember} = useProject();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    handleAddMember({projectId,email});
    setShowAddMember(false);
  }

//   if(loading) return <main><h1>Loading...</h1></main>;

 
  return (
    <div className="modal-backdrop" 
    onClick={()=>setShowAddMember(false)}
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-area">
            <span className="material-icons invite-icon"><UserPlus/></span>
            <div>
              <h3>Add Team Member</h3>
              <p className="project-subtext">Assigning to: <span>
                {
                // projectName ||
                 'Workspace'}
                </span></p>
            </div>
          </div>
          <button className="modal-close-x" 
          onClick={()=>setShowAddMember(false)} 
          aria-label="Close modal">
            <span className="material-icons"><X/></span>
          </button>
        </div>

        {/* Form Body */}
        <form 
        onSubmit={handleSubmit}
         className="modal-body-form">
          <div className="modal-input-field-group">
            <label htmlFor="invite-email">User Email Address *</label>
            <div className="modal-field-wrapper">
              <span className="material-icons mail-field-icon"><Mail/></span>
              <input
                id="invite-email"
                type="email"
                placeholder="developer@ethara.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <p className="field-hint-text">
              The collaborator must possess an active, registered account inside the system to access this project's sprint metrics.
            </p>
          </div>

          {/* Action Button Row Footer */}
          <div className="modal-footer-actions">
            <button type="button" className="btn-modal-cancel" 
              onClick={() => setShowAddMember(false)}
             >
              Cancel
            </button>
            <button type="submit" className="btn-modal-submit" 
            // disabled={!email.trim()}
            >
              <span>Add Member</span>
              {/* <span className="material-icons">chevron_right</span> */}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default AddMemberModal