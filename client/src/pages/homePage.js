const HomePage = ({ authUser }) => {
  const handleLogin = () => authUser();
  const handleRegister = () => authUser();
  return (
    <div>
      <h1>HomePage</h1>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default HomePage;
