import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

import classes from "./Post.module.css";
import Comment from "../comment/Comment";

const Post = ({ title, body, image, _id, token, setPostData }) => {
  const isLogin = useSelector((state) => state.login.isLoggedIn);
  const tokenRedux = useSelector((state) => state.login.token);
  // const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState(false);

  const commentHandler = (e) => {
    e.preventDefault();
    setComment(!comment);
  };

  const removePostHandler = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/server/${_id}`, {
      method: "Delete",
      headers: { "Content-Type": "application/json" },
    })
      .then(async (response) => {
        if (!response.ok)
          console.log("Something went wrong! Please try again...");
        else {
          const data = await response.json();
          setPostData(data);
          // setUserContext(data);
          console.log(data);
        }
      })
      .catch();
    // setPostData.postData.filter(post => post.postId !== id)
  };

  return (
    <>
      {isLogin ? (
        <div className={classes.post}>
          <p className={classes["post__text"]}>{title}</p>
          <p className={classes["post__text"]}>{body}</p>
          <img src={image}></img>
          <div className={classes["reacts-btn"]}>
            {/* <button type="button" className={classes["btn"]} onClick={likeHandler}> */}
            {/* <div className={classes["btn__wrapper"]}>
            <FontAwesomeIcon
              icon={faHeart}
              className={isLiked ? classes["btn__isLiked"] : ""}
            />
            <p className={classes["btn__text"]}>Like</p>
          </div> */}
            {/* </button> */}
            <button type="button" className={classes["btn"]}>
              <div className={classes["btn__wrapper"]}>
                <FontAwesomeIcon icon={faEdit} />
                <Link to={`${_id}/edit`} className={classes["btn__link"]}>
                  <p className={classes["btn__text"]}>Edit</p>
                </Link>
              </div>
            </button>
            <button
              type="button"
              className={classes["btn"]}
              onClick={commentHandler}
            >
              <div className={classes["btn__wrapper"]}>
                <FontAwesomeIcon icon={faComment} />
                <p className={classes["btn__text"]}>Comment</p>
              </div>
            </button>
            <button
              type="button"
              className={classes["btn"]}
              onClick={removePostHandler}
            >
              <div className={classes["btn__wrapper"]}>
                <FontAwesomeIcon icon={faTrash} />
                <p className={classes["btn__text"]}>Remove</p>
              </div>
            </button>
          </div>
          {comment && <Comment _id={_id} />}
        </div>
      ) : (
        <p className={classes.comment}>
          Please first login or create your account
        </p>
      )}
    </>
  );
};

export default Post;
