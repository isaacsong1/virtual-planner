import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCard from "../components/postCard";
import MemberCard from "../components/memberCard";

const CommunityPage = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [members, setMembers] = useState([]);
  const [community, setCommunity] = useState({});
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    const getCommunity = () => {
      fetch(`/communities/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setPosts(data.posts);
          setMembers(data.users);
          setCommunity(data.community);
        })
        .catch((err) => console.log(err));
    };
    getCommunity();
  }, []);

  const handleClick = () => setShowAdd(true);

  const handleSubmit = (e) => {
    //! submit new post (POST)
    e.preventDefault();
    setShowAdd(false);
  };

  const allPosts = posts.map((post) => <PostCard key={post.id} {...post} />);

  const allMembers = members.map((mem) => <MemberCard key={mem.id} {...mem} />);

  return (
    <div className="com-page">
      <div className="com-page-name">{community.name}</div>
      <div>
        {!showAdd ? (
          <div className="add-com">
            <button onClick={handleClick}>Add Post</button>
          </div>
        ) : (
          <div>
            <form onSubmit={handleSubmit}>
              <label for="title">Title:</label>
              <input type="text" id="title" />
              <label for="content">Content:</label>
              <input type="text" id="content" />
              <input type="submit" value="Post" />
            </form>
          </div>
        )}
      </div>
      <div className="com-post-member">
        <div className="com-posts">{allPosts}</div>
        <div className="com-members">{allMembers}</div>
      </div>
    </div>
  );
};

export default CommunityPage;
