const Logout = ({ setUser }) => {
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <button onClick={handleLogout} style={{display:"flex"}}>
      Logout
    </button>
  );
};

export default Logout;