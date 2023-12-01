import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import CommunityCard from "../components/communityCard";
import "../styles/communities.css";

const initialValue = {
  name: "",
  description: "",
};

const Communities = () => {
  const { user, handleNewAlert, handleAlertType } = useOutletContext();
  const [communities, setCommunities] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState(initialValue);

  useEffect(() => {
    const getCommunities = () => {
      fetch("/communities")
        .then((resp) => resp.json())
        .then(setCommunities)
        .catch((err) => {
          handleNewAlert(err.error);
          handleAlertType("error");
        });
    };
    getCommunities();
  }, [showAdd]);

  const handleClick = () => setShowAdd(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/communities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, owner_id: user.id }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then(() => {
            setFormData(initialValue);
            setShowAdd(false);
            handleNewAlert("New community added!");
            handleAlertType("success");
          });
        } else {
          res.json().then((errorObj) => {
            handleNewAlert(errorObj.error);
            handleAlertType("error");
          });
        }
      })
      .catch((err) => {
        handleNewAlert(err.error);
        handleAlertType("error");
      });
  };

  const allCommunities = communities.map((com) => (
    <CommunityCard key={com.id} {...com} />
  ));

  return (
    <div className="coms-page">
      <div className="coms-page-name">Virtual Planner Communities</div>
      <div>
        {!showAdd ? (
          <div className="add-com">
            <button onClick={handleClick}>Start New Community</button>
          </div>
        ) : (
          <div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <label htmlFor="description">Description:</label>
              <input
                id="description"
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              <input type="submit" value="Add New" />
            </form>
          </div>
        )}
      </div>
      {allCommunities}
    </div>
  );
};

export default Communities;
