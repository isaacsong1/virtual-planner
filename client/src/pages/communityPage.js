import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import PostCard from "../components/postCard";
import MemberCard from "../components/memberCard";

const initialValue = {
  title: "",
  content: "",
};

const CommunityPage = () => {
  const { id } = useParams();
  const { handleNewAlert, handleAlertType } = useOutletContext();
  const [posts, setPosts] = useState([]);
  const [members, setMembers] = useState([]);
  const [community, setCommunity] = useState({});
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState(initialValue);

  useEffect(() => {
    const getCommunity = () => {
      fetch(`/communities/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setPosts(data.posts);
          setMembers(data.users);
          setCommunity(data.community);
        })
        .catch((err) => {
          handleNewAlert(err.error);
          handleAlertType("error");
        });
    };
    getCommunity();
  }, [id]);

  const handleClick = () => setShowAdd(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(community);
    const ucid = community.user_communities.filter(
      (obj) => (obj.user_id = community.owner_id)
    );
    console.log(ucid);
    // fetch("/posts", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ ...formData, user_communities_id: '' }),
    // })
    //   .then((res) => res.json())
    //   .then(() => {
    //     // setFormData(initialValue);
    //     // setShowAdd(false);
    //   })
    //           .catch((err) => {
    //   handleNewAlert(err.error);
    //   handleAlertType("error");
    // });
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
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" />
              <label htmlFor="content">Content:</label>
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
