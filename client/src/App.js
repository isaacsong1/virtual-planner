import { useState, useEffect, useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// import Navbar from "./components/navbar";
// import Snackbar from "./components/snackbar";
// import Footer from "./components/footer";
import HomePage from "./pages/homePage";
// import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Authentication from "./pages/authentication";

const App = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [alertType, setAlertType] = useState("");
  const [dashboard, setDashboard] = useState(null)
  const [user, setUser] = useState(null);
  // const history = useHistory();

  const updateUser = (user) => setUser(user)

  const handleNewAlert = useCallback((alert) => {
    setAlert(alert)
  }, [])

  useEffect(() => {
    const fetchDashboard = () => {
      fetch("/dashboard")
      .then(resp => {
        if (resp.ok) {
          resp.json().then(setDashboard)
        } else {
          resp.json().then(handleNewAlert)
        }
      })
      .catch(handleNewAlert)
    }
    if (!user) {
      fetch("/checksession")
      .then(resp => {
        if (resp.ok) {
          resp.json().then(updateUser).then(fetchDashboard)
        } else {
          resp.json().then(errorObj => handleNewAlert(errorObj.error))
        }
      })
      .catch(handleNewAlert)
    } else {
      fetchDashboard()
    }
  }, [handleNewAlert, user])

  const ctx = { user, updateUser, handleNewAlert };

  if (!user) return (
    <>
      <HomePage />
      <Authentication updateUser={updateUser} handleNewAlert={handleNewAlert} />
    </>
  ) 
  return (
    <div className="app">
      <Dashboard />
      <Outlet context={ctx} />
    </div>
  )
  {/*alert && <Snackbar />*/}
};

export default App;
