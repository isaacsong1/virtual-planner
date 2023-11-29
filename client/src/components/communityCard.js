import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CommunityCard = ({ id, name, description, owner_id }) => {
  const navigate = useNavigate();
  const [owner, setOwner] = useState({});

  useEffect(() => {
    const getOwner = () => {
      fetch(`users/${owner_id}`)
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
      <div className="com-name">{name}</div>
      <div className="com-desc">{description}</div>
      <div className="com-owner">{owner.username}</div>
    </div>
  );
};

export default CommunityCard;
