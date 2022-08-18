import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import GlitchText from "react-glitch-effect/core/GlitchText";
import { db, auth } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Moment from "react-moment";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import { FaBeer } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { FaHeart, FaPlus } from "react-icons/fa";

function Blog() {
  const [user] = useAuthState(auth);

  const { state } = useLocation();

  const {
    moviename,
    details,
    story,
    director,
    horizontalPoster,
    verticalPoster,
    storyPic,
    directorPic,
  } = state.data;
  const id = state.id;

  // post a comment
  const [comment, setComment] = useState("");
  const sendComment = async (e) => {
    e.preventDefault();

    // copy the comment value
    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      // add comment
      comment: commentToSend,
      username: user.displayName,
      profileImg: user.photoURL,
      timestamp: serverTimestamp(),
    });
  };

  // get all the comments
  const [comments, setComments] = useState([]);
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db]
  );

  // check if user like or not
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === user?.uid) !== -1);
  }, [likes]);

  // set likes
  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", user.uid), {
        username: user.displayName,
      });
    }
  };

  // get likes from firebase
  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db]
  );

  return (
    <div className="grid gap-3 pt-24 pb-24 px-3 md:px-12 bg-black">
      {/* Top Poster */}
      <div className="h-[200px] md:h-[400px] xl:h-[600px] relative">
        <div className="absolute w-full h-full bg-pink-900 rounded-b-md" />
        <img
          src={horizontalPoster}
          className="w-full relative h-full object-cover clip-your-needful-style border-8 border-pink-900"
        />
      </div>
      {/* Blog Details */}
      <div className="bg-white grid grid-cols-2 sm:grid-cols-3 pl-4 mt-12 lg:mt-24 xl:mt-36">
        <div className="relative pl-2">
          <div className="absolute shadow-lg shadow-black -top-5 h-[250px] md:h-[350px] xl:h-[500px] xl:-top-20 right-2 lg:right-20">
            <div className="absolute w-1/2 h-full bg-gradient-to-b from-pink-400 to-blue-500 shadow-lg shadow-black -bottom-6 -left-2 sm:-left-5" />
            <img
              src={verticalPoster}
              className="relative w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="sm:col-span-2 py-8 xl:py-20">
          <GlitchText>
            <h1 className="text-xl md:text-4xl font-bold text-pink-900 font-orbitron">
              {moviename}
            </h1>
          </GlitchText>
          <p className="line-clamp-4 md:line-clamp-6 lg:line-clamp-[7] text-pink-600 text-sm sm:text-base font-changa">
            {details}
          </p>
          <button className="px-3 py-1 border-2 border-pink-600 text-pink-600 mt-1">
            More
          </button>
        </div>
      </div>
      {/* Story */}
      <div className="pb-20 mt-28 sm:mt-44 pr-3 pl-12 sm:pl-24 xl:pl-48">
        <div className="relative w-60 h-[300px] sm:w-80 sm:h-[350px] lg:w-96 lg:h-[500px] mr-auto">
          {/*content on front */}
          <div className="absolute z-20 w-full h-full bg-orange-600 top-44 sm:top-44 -right-7 sm:-right-56 border-l-4 sm:border-l-8 border-white ">
            <div className=" h-full w-full text-white font-changa bg-gradient-to-tr from-orange-200 via-pink-700 to-blue-900 ">
              <GlitchText>
                <h1 className="py-1 sm:py-4 px-3 sm:px-8 text-xl md:text-4xl mb-1 sm:mb-2 font-bold bg-white text-blue-700 font-orbitron">
                  STORY
                </h1>
              </GlitchText>
              <p className="px-3 sm:px-8 line-clamp-[8] lg:line-clamp-[14]">
                {story}
              </p>
              <button className="mx-3 sm:mx-8 mb-3 sm:mb-8 px-3 py-1 border-2 border-black text-black mt-2">
                More
              </button>
            </div>
          </div>

          {/* middle image */}
          <img
            src={storyPic}
            className="z-10 w-full h-full object-cover relative"
          />

          {/* orange box at back */}
          <div className="absolute w-1/2 h-full bg-red-600 blur top-16 -left-6 md:-left-20" />
        </div>
      </div>
      {/* Director */}
      <div className="pb-20 mt-40 pl-3 pr-12 lg:pr-48">
        <div className="relative w-60 h-[300px] sm:w-80 sm:h-[350px] lg:w-96 lg:h-[500px] ml-auto">
          {/*content on front */}
          <div className="absolute z-20 w-full h-full bg-orange-600 top-36 sm:top-16 -left-7 sm:-left-56  border-5-4 sm:border-r-8 border-white ">
            <div className="h-full w-full text-white font-changa bg-gradient-to-tr from-orange-200 via-pink-700 to-blue-900 ">
              <GlitchText>
                <h1 className="py-1 sm:py-4 px-3 sm:px-8 text-xl md:text-4xl mb-1 sm:mb-2 font-bold bg-white text-blue-700 font-orbitron">
                  STORY
                </h1>
              </GlitchText>
              <p className="px-3 sm:px-8  line-clamp-[8] lg:line-clamp-[14]">
                {director}
              </p>
              <button className="mx-3 sm:mx-8 mb-3 sm:mb-8 px-3 py-1 border-2 border-black text-black mt-2">
                More
              </button>
            </div>
          </div>

          {/* middle image */}
          <img
            src={directorPic}
            className="z-10 w-full h-full object-cover relative"
          />

          {/* orange box at back */}
          <div className="absolute w-1/2 h-full bg-red-600 blur -top-16 -right-6 md:-right-20" />
        </div>
      </div>

      {/* floating like comment button */}
      <Fab
        alwaysShowTitle={true}
        icon={<FaPlus />}
        mainButtonStyles={{ backgroundColor: "red" }}
        actionButtonStyles={{ backgroundColor: "blue" }}
      >
        <Action
          style={{ marginTop: "10px" }}
          onClick={() => console.log("fire")}
        >
          🔥
        </Action>

        <Action onClick={likePost} text="Like">
          {hasLiked ? <FaHeart className="text-red-500" /> : <FaHeart />}
        </Action>

        <Action text="Down" onClick={() => console.log("Down")}>
          👎
        </Action>
      </Fab>
      {/* like post */}
      <div onClick={likePost} className="cursor-pointer">
        {hasLiked ? (
          <FaHeart className="text-red-500 w-12 h-12" />
        ) : (
          <FaHeart className="w-12 h-12 text-white" />
        )}
      </div>

      {/* comments section  */}
      <input
        placeholder="comment"
        type="text"
        value={comment}
        className=""
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        className="bg-white"
        type="submit"
        disabled={!comment.trim()}
        onClick={sendComment}
      >
        Post
      </button>

      {comments.length > 0 && (
        <div className=" text-white ml-10">
          {comments.map((comment) => {
            return (
              <div key={comment.id} className="flex gap-2 items-center mb-3">
                <img
                  className="h-7 w-7 rounded-full"
                  src={comment.data().profileImg}
                  referrerPolicy="no-referrer"
                />

                <p className="flex-1">
                  <span className="font-bold ">{comment.data().username} </span>
                  {comment.data().comment}
                </p>
                <Moment fromNow>{comment.data().timestamp?.toDate()}</Moment>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Blog;
