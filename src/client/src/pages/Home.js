import { useEffect, useState } from "react";

import Post from "../components/post/Post";

const Home = () => {
  const [postData, setPostData] = useState(null);
  // get the post data from database
  useEffect(() => {
    // fetch(`${process.env.REACT_APP_API_URL}/server`)
    //   .then(async (response) => {
    //     if (!response.ok)
    //       console.log("Something went wrong! Please try again...");
    //     else {
    //       console.log("render");
    //       const data = await response.json();
    //       setPostData(data);
    //     }
    //   })
    //   .catch();

    const fetchData = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/server`);
      if (!response.ok)
        console.log("Something went wrong! Please try again...");
      else {
        const data = await response.json();
        setPostData(data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => console.log(postData), [postData]);

  return (
    <div>
      {postData &&
        postData.map((post) => {
          return (
            <Post
              key={post._id}
              title={post.title}
              body={post.body}
              image={post.image}
              _id={post._id}
              token={post.token}
              setPostData={setPostData}
            />
          );
        })}
    </div>
  );
};

export default Home;
