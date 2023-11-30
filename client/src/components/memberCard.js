import { FaRegUserCircle } from "react-icons/fa";

const MemberCard = ({ username, email, bio }) => {
  return (
    <div className="mem-card">
      <FaRegUserCircle className="mem-avatar" />
      <div>
        <div className="mem-username">{username}</div>
        <div className="mem-email">{email}</div>
        {/* <div className="mem-head">
          <span className="mem-username">{username}</span>
          <span className="mem-email">{email}</span>
        </div>
        <div className="mem-bio">{bio}</div> */}
      </div>
    </div>
  );
};

export default MemberCard;
