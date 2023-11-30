import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCard from "../components/postCard";
import MemberCard from "../components/memberCard";

const CommunityPage = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [members, setMembers] = useState([]);
  const [community, setCommunity] = useState({});

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

  const allPosts = posts.map((post) => <PostCard key={post.id} {...post} />);

  const allMembers = members.map((mem) => <MemberCard key={mem.id} {...mem} />);

  return (
    <div>
      <div className="com-page-name">{community.name}</div>
      <div className="com-page">
        <div className="com-posts">{allPosts}</div>
        <div className="com-members">{allMembers}</div>
      </div>
    </div>
  );
};

export default CommunityPage;
