import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MyPosts from "./pages/MyPosts";
import About from "./pages/About";
import Blog from "./pages/Blog";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="myposts" element={<MyPosts />} />
        <Route path="profile" element={<Profile />} />
        <Route path="about" element={<About />} />
        <Route path="blog" element={<Blog />} />
      </Routes>
    </div>
  );
}

export default App;
