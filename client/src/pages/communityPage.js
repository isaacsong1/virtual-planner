import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCard from "../components/postCard";
import MemberCard from "../components/memberCard";

const CommunityPage = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const getCommunity = () => {
      fetch(`/communities/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setPosts(data.posts);
          setMembers(data.users);
        })
        .catch((err) => console.log(err));
    };
    getCommunity();
  }, []);

  const allPosts = posts.map((post) => <PostCard key={post.id} {...post} />);

  const allMembers = members.map((mem) => <MemberCard key={mem.id} {...mem} />);

  return (
    <div>
      <h1>Community By Id</h1>
      <div className="posts">{allPosts}</div>
      <div className="members">{allMembers}</div>
    </div>
  );
};

export default CommunityPage;
