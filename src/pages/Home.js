import React, { useState, useEffect } from "react";
import PopularBlogs from "../components/PopularBlogs";
import HeroSection from "../components/HeroSection";
import Blogs from "../components/Blogs";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../Firebase";
// import darksvg from "./images/scattered-forcefields.svg";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  return (
    <div className="bg-black text-white ">
      {/* Hero section */}
      <HeroSection />

      <div className="bg-black w-full relative h-[400px] sm:h-[500px] lg:h-screen flex items-center justify-center overflow-hidden">
        {/* Popular blogs */}
        <h1 className="text-center absolute top-10 text-3xl md:text-5xl font-bold">
          Popular Blogs
        </h1>
        <PopularBlogs posts={posts} />
      </div>

      <h1 className="p-5 pl-24 text-3xl md:text-5xl font-bold mt-8">
        Explore all
      </h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 pl-12 pr-2 md:pl-16 md:pr-4 pb-12 max-w-screen-xl mx-auto">
        {posts.map((post) => (
          <Blogs key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
