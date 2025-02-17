import './App.css'
import { useState } from 'react';
import Login from './components/login';

function App() {
  const [user, setUser] = useState(null); // State to hold user information

  return (
    <>
      {user ? ( 
        <div>
          <h1>Welcome, {user.name}!</h1>
          <img src={user.picture} alt={user.name} />
        </div>
      ) : (
        <Login setUser={setUser} /> 
      )}
    </>
  )
}

export default App
