import { useEffect, useState } from "react";

const PostCard = ({ id, title, content }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const getUser = () => {
      fetch(`/posts/${id}`)
        .then((res) => res.json())
        .then((data) => setUser(data.user))
        .catch((err) => console.log(err));
    };
    getUser();
  }, []);
  return (
    <div className="post-card">
      <div className="post-title">{title}</div>
      <div className="post-content">{content}</div>
      <div className="post-user">{user.username}</div>
    </div>
  );
};

export default PostCard;
