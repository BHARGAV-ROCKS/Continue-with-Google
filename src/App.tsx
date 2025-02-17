import './App.css'
import { useState, useEffect } from 'react';
import Login from './components/login';
import Logout from './components/logout';

function App() {
  const [user, setUser] = useState(() => {
    // Check local storage for user data
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null; // Parse and return user data or null
  });

  useEffect(() => {
    // Store user data in local storage whenever it changes
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user'); // Remove user data if logged out
    }
  }, [user]);

  return (
    <>
      {user ? ( 
        <div>
          <h1>Welcome, {user.name}!</h1>
          <img src={user.picture} alt={user.name} />
          <Logout setUser={setUser} />
        </div>
      ) : (
        <Login setUser={setUser} /> 
      )}
    </>
  )
}

export default App
