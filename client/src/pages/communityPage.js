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
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClick = () => setShowAdd((p) => !p);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    fetch(`/communities/${id}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          res.json().then((data) => {
            setPosts([...posts, data]);
            setFormData(initialValue);
            setShowAdd(false);
            handleNewAlert("New Post Submitted!");
            handleAlertType("success");
          });
        } else {
          res.json().then((errorObj) => {
            handleNewAlert(errorObj.error);
            handleAlertType("error");
          });
        }
      })
      .catch((err) => {
        handleNewAlert(err.error);
        handleAlertType("error");
      });
  };

  const allPosts = posts.map((post) => <PostCard key={post.id} {...post} />);

  const allMembers = members.map((mem) => <MemberCard key={mem.id} {...mem} />);

  return (
    <div className="com-page">
      <div className="add-com">
        {!showAdd ? (
          <button className="com-btn" onClick={handleClick}>
            New Post
          </button>
        ) : (
          <button className="com-btn" onClick={handleClick}>
            Cancel
          </button>
        )}
      </div>
      <div className="com-page-name">{community.name}</div>
      <div className="com-post-member">
        <div className="com-posts">
          <div>
            {showAdd && (
              <form onSubmit={handleSubmit}>
                <div className="post-card">
                  <input
                    type="submit"
                    value="Post"
                    className="com-btn post-user"
                  />
                  <div className="post-title">
                    <label htmlFor="title">Title:</label>
                    <input
                      id="post-title-input"
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="post-content">
                    <label htmlFor="content">Content:</label>
                    <input
                      id="post-content-input"
                      type="text"
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </form>
            )}
          </div>
          {allPosts}
        </div>
        <div className="com-members">{allMembers}</div>
      </div>
    </div>
  );
};

export default CommunityPage;
