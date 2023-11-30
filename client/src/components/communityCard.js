import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CommunityCard = ({ id, name, description, owner_id, users }) => {
  const navigate = useNavigate();
  const [owner, setOwner] = useState({});
  const [members, setMembers] = useState(0);

  useEffect(() => {
    const getOwner = () => {
      fetch(`/users/${owner_id}`)
        .then((res) => res.json())
        .then(setOwner)
        .catch((err) => console.log(err));
    };
    getOwner();
  }, [owner_id]);

  const handleClick = () => {
    navigate(`/communities/${id}`);
  };

  return (
    <div className="com-card" onClick={handleClick}>
      <span className="com-left">
        <div className="com-name">{name}</div>
        <div className="com-desc">• {description}</div>
      </span>
      <span className="com-right">
        <div>
          <span>Owner: </span>
          <span className="com-owner">{owner.username}</span>
        </div>
        <div>
          <span>Members: </span>
          <span className="com-owner">{users.length}</span>
        </div>
      </span>
    </div>
  );
};

export default CommunityCard;
