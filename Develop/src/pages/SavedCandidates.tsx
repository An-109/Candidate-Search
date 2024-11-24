import { useState, useEffect } from 'react';
import './can.css'
const SavedCandidates = () => {

  const [users, setUsers] = useState<
    { login: string; 
      avatar_url: string; 
      company?: string; 
      email?: string; 
      location?: string; 
      bio?: string }[]
  >([]);
     

  useEffect(() => {
    const fetchStoredUser= async()=>{
    const storedUser = await localStorage.getItem('savedCandidates');
    if (storedUser) {
      console.log('Stored User:', JSON.parse(storedUser)); 
      setUsers(JSON.parse(storedUser));
    }
  }
  fetchStoredUser();
  }, []);

  const handleDelete = (login: string) => {
 
    const updatedUsers = users.filter(user => user.login !== login);
    

    setUsers(updatedUsers);
    
  
    localStorage.setItem('userProfiles', JSON.stringify(updatedUsers));
  };
  return (
    <div className="user-table">
      <div className="table-header">
        <div>Name</div>
        <div>Image</div>
        <div>Location</div>
        <div>Email</div>
        <div>Company</div>
        <div>Bio</div>
        <div>Reject</div>
      </div>
      {users.length > 0 &&
        users.map((user, index) =>
          Object.keys(user).length ? (
            <div className="table-row" key={index}>
              <div>{user.login}</div>
              <div>
                <img src={user.avatar_url} alt={user.login} />
              </div>
              <div>{user.location || 'Not available'}</div>
              <div>{user.email || 'Not available'}</div>
              <div>{user.company || 'Not available'}</div>
              <div>{user.bio || 'Not available'}</div>
              <div><button onClick={() => handleDelete(user.login)}>reject</button></div>
            </div>
          ) : (
            <div className="table-row" key={index}>
              <div className='empty'>Empty user object</div>
            </div>
          )
        )}
    </div>
  );
};
export default SavedCandidates;
