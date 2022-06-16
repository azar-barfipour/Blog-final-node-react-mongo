import { useState } from "react";

import classes from "./Comment.module.css";

const Comment = ({ _id }) => {
  const [inputComment, setInputComment] = useState("");
  const [commentData, setCommentData] = useState();

  const inputCommentHandler = (e) => {
    setInputComment(e.target.value);
  };

  const addCommentHandler = (e) => {
    e.preventDefault();
    setCommentData(inputComment);
    // post comment to DB
    fetch(`${process.env.REACT_APP_API_URL}/server/posts/create/${_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comments: inputComment,
      }),
    })
      .then(async (response) => {
        if (!response.ok)
          console.log("Something went wrong! Please try again...");
        else {
          const data = await response.json();
          console.log(data);
        }
      })
      .catch();

    //   fetch(`${process.env.REACT_APP_API_URL}/server`)
    //     .then(async (response) => {
    //       if (!response.ok)
    //         console.log("Something went wrong! Please try again...");
    //       else {
    //         const data = await response.json();
    //         // setCommentData(data);
    //       }
    //     })
    //     .catch();
  };

  return (
    <>
      <form onSubmit={addCommentHandler}>
        <input
          placeholder="write a comment"
          type="text"
          className={classes.comment}
          onChange={inputCommentHandler}
        ></input>
      </form>
      {commentData && <p className={classes["comment__text"]}>{commentData}</p>}
    </>
  );
};

export default Comment;
