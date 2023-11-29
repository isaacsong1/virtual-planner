import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Snackbar from "./components/snackbar";
import Footer from "./components/footer";
import HomePage from "./pages/homePage";

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    const getData = () => {
      fetch("")
        .then((resp) => resp.json())
        .then()
        .catch((err) => {
          setAlert(err.error);
          setAlertType("error");
        });
    };
    getData();
  }, []);

  const authUser = () => {
    setUser(true);
    navigate(`/users/${12}/dashboard`);
  };

  const ctx = {
    user,
    setUser,
  };

  return (
    <div className="app">
      {!user ? (
        <HomePage authUser={authUser} />
      ) : (
        <>
          <Navbar />
          <main className="container">
            {alert && <Snackbar />}
            <div className="outlet">
              <Outlet context={ctx} />
            </div>
            <Footer />
          </main>
        </>
      )}
    </div>
  );
};

export default App;
