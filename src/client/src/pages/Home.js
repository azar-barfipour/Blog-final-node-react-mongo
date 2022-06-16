import { useEffect, useState } from "react";

import Post from "../components/post/Post";

const Home = () => {
  const [postData, setPostData] = useState();
  // get the post data from database
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/server`)
      .then(async (response) => {
        if (!response.ok)
          console.log("Something went wrong! Please try again...");
        else {
          const data = await response.json();
          setPostData(data);
        }
      })
      .catch();
  }, []);
  return (
    <div>
      {postData !== undefined ? (
        postData.map((post) => {
          return (
            <Post
              title={post.title}
              body={post.body}
              image={post.image}
              _id={post._id}
              token={post.token}
              setPostData={setPostData}
            />
          );
        })
      ) : (
        <di></di>
      )}
    </div>
  );
};

export default Home;
