import { useEffect, useState } from "react";
import CommunityCard from "../components/communityCard";
import "../styles/communities.css";

const Communities = () => {
  const [communities, setCommunities] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    const getCommunities = () => {
      fetch("/communities")
        .then((resp) => resp.json())
        .then(setCommunities)
        .catch((err) => console.log(err));
    };
    getCommunities();
  }, []);

  const handleClick = () => setShowAdd(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAdd(false);
  };

  const allCommunities = communities.map((com) => (
    <CommunityCard key={com.id} {...com} />
  ));

  return (
    <div className="coms-page">
      <div className="coms-page-name">Virtual Planner Communities</div>
      <div className="add-com">
        {!showAdd ? (
          <div>
            <button onClick={handleClick}>Start New Community</button>
          </div>
        ) : (
          <div>
            <form onSubmit={handleSubmit}>
              <label for="name">Name:</label>
              <input type="text" id="name" />
              <label for="description">Description:</label>
              <input type="text" id="description" />
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
