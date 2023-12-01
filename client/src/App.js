import { useState, useEffect, useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";
// import Snackbar from "./components/snackbar";
// import Footer from "./components/footer";
import HomePage from "./pages/homePage";
import Authentication from "./pages/authentication";

const App = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  // const [alertType, setAlertType] = useState("");
  const [user, setUser] = useState(null);
  // const history = useHistory();

  const updateUser = (user) => setUser(user)

  const handleNewAlert = useCallback((alert) => {
    setAlert(alert)
  }, [])

  useEffect(() => {
    if (!user) {
      navigate('/')
      fetch("/checksession")
      .then(resp => {
        if (resp.ok) {
          resp.json().then(updateUser).then(navigate(`/users/${user.id}/dashboard`))
        } else {
          resp.json().then(errorObj => handleNewAlert(errorObj.error))
        }
      })
      .catch(handleNewAlert)
    } else {
      navigate(`/users/${user.id}/dashboard`)
    }
  }, [navigate, handleNewAlert, user])

  const ctx = { user, updateUser, handleNewAlert };

  if (!user) return (
    <>
      <HomePage />
      <Authentication updateUser={updateUser} handleNewAlert={handleNewAlert} />
    </>
  ) 
  return (
    <div className="app">
      <Navbar user={user} updateUser={updateUser} handleNewAlert={handleNewAlert} />
      <Outlet context={ctx} />
    </div>
  )
};

export default App;
