import './nav.css'
import {Link} from 'react-router-dom'
const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <div className="buttons-container">
    <Link to="/" className="buttons">Candidate Search</Link>
    <Link to="/savedCandidates" className="buttons">Saved Candidates</Link>
  </div>
            
    
         
  )
};

export default Nav;
