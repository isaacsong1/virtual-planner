const MemberCard = ({ username, email, bio }) => {
  return (
    <div className="mem-card">
      <div className="mem-username">{username}</div>
      <div className="mem-email">{email}</div>
      <div className="mem-bio">{bio}</div>
    </div>
  );
};

export default MemberCard;
