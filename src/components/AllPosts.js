import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../Firebase";
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
import Blogs from "./Blogs";

const AllPosts = () => {
  const [user] = useAuthState(auth);

  const [myPosts, setMyPosts] = useState([]);
  useEffect(() => {
    onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setMyPosts(snapshot.docs);
      }
    );
  }, [db]);

  const myData = myPosts?.filter((post) => post.data().userId === user.uid);
  //   console.log(myData);

  return (
    <div>
      <h1 className="p-5 pl-24 text-3xl md:text-5xl font-bold mt-8 text-white">
        {myData.length > 0 ? "My Posts" : "Not Posted Yet"}
      </h1>
      <div className="grid sm:grid-2 md:grid-cols-3 gap-2 pl-12 pr-2 md:pl-16 md:pr-4 mb-12  max-w-screen-xl mx-auto">
        {myData.map((post) => (
          <Blogs key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
