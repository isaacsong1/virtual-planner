import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useOutletContext();

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  }

  const handleEmailChange = e => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log("Registering...")
    console.log(username)
    console.log(email)
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} >
        <label>
          Username: 
          <input type="text" name="username" onChange={handleUsernameChange} value={username}/>
        </label> 
        <label>
          Email: 
          <input type="email" name="email" onChange={handleEmailChange} value={email}/>
        </label>
        <label>
          Password: 
          <input type="password" name="password" onChange={handlePasswordChange} value={password}/>
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
