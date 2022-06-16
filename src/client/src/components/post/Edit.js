import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoVideo } from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import classes from "./Edit.module.css";

const Edit = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [inputTitle, setInputTitle] = useState("");
  const [inputText, setInputText] = useState("");
  const [inputImages, setInputImages] = useState([]);
  const [ImagesURL, setImagesURL] = useState();
  const [postData, setPostData] = useState({ title: "", body: "" });
  const [isEmpty, setIsEmpty] = useState(false);

  // get the post data by id from database
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/server/${param.id}`)
      .then(async (response) => {
        if (!response.ok)
          console.log("Something went wrong! Please try again...");
        else {
          const data = await response.json();
          console.log(data);
          setPostData({ title: data.title, body: data.body });
        }
      })
      .catch();
    return () => {
      setPostData({ title: "", body: "" });
    };
  }, []);

  useEffect(() => {
    // get the url from images
    if (inputImages.length !== 0) {
      const newImagesUrl = [];
      inputImages.forEach((image) =>
        newImagesUrl.push(URL.createObjectURL(image))
      );
      setImagesURL(newImagesUrl);
    }
  }, [inputImages]);

  const inputTitileHandler = (e) => {
    setIsEmpty(false);
    setInputTitle(e.target.value);
    setPostData((prev) => ({ ...prev, title: e.target.value }));
  };
  const inputTextHandler = (e) => {
    setIsEmpty(false);
    setInputText(e.target.value);
  };

  const inputImagesHandler = (e) => {
    setIsEmpty(false);
    setInputImages([...e.target.files]);
  };

  const editHandler = (e) => {
    e.preventDefault();
    if (inputText === "" && inputImages.length === 0) {
      setIsEmpty(true);
      return;
    }
    setIsEmpty(false);
    console.log(inputTitle, inputText);
    fetch(`${process.env.REACT_APP_API_URL}/server/edit/${postData._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: inputTitle,
        body: inputText,
        image: ImagesURL,
      }),
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
    setInputText("");
    setInputImages("");
    setImagesURL();
    // navigate("/");
  };

  const removePreviewHandler = (e) => {
    e.preventDefault();
    setImagesURL();
  };

  const locationHandler = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={editHandler} className={classes.form}>
        <div className={classes["form__section"]}>
          {postData && (
            <input
              className={classes["form__title"]}
              type="text"
              name="title"
              value={postData.title}
              placeholder="title"
              onChange={inputTitileHandler}
            ></input>
          )}
          {postData && (
            <textarea
              className={classes["form__text"]}
              type="text"
              name="post"
              value={postData.body}
              placeholder="write here"
              onChange={inputTextHandler}
            ></textarea>
          )}

          <label className={classes["custom-file-upload"]}>
            {postData && (
              <input
                type="file"
                name="file"
                value={postData.image}
                multiple
                onChange={inputImagesHandler}
              />
            )}
            <FontAwesomeIcon icon={faPhotoVideo} />
          </label>
          {/* link to location page and search and submit the location 
      then redirect to the write page and have a preview of the location and post it 
      then in the posts page(Home) have a link of location to the google map
      */}
          {/* <Link to="/location">
        <FontAwesomeIcon icon={faLocationPin} />
      </Link> */}
          {ImagesURL ? (
            ImagesURL.map((imageURL, inx) => (
              <a
                key={inx}
                href={imageURL}
                rel="noreferrer"
                target="_blank"
                className={classes["image__link"]}
              >
                <img
                  src={imageURL}
                  alt="preview"
                  className={classes["preview-img"]}
                ></img>
                <FontAwesomeIcon
                  icon={faClose}
                  className={classes["remove__btn"]}
                  onClick={removePreviewHandler}
                />
              </a>
            ))
          ) : (
            <div></div>
          )}
        </div>
        {isEmpty && (
          <p className={classes["empty-validation"]}>
            <small>Please write or upload a photo</small>
          </p>
        )}
        <button type="submit" className={classes["form__btn"]}>
          Edit
        </button>
      </form>
    </>
  );
};

export default Edit;
