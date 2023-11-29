import { useEffect, useState } from "react";

const Communities = () => {
  const [communities, setCommunities] = useState(null);

  useEffect(() => {
    fetch("/communities")
      .then((resp) => resp.json())
      .then(setCommunities)
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Communities</h1>
      {console.log(communities)}
    </div>
  );
};

export default Communities;
