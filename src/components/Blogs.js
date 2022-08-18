import React from "react";
import { useNavigate } from "react-router-dom";

function Blogs({ post }) {
  const navigate = useNavigate();

  const { verticalPoster } = post.data();
  const id = post.id;

  const data = post.data();

  return (
    <div
      key={id}
      className="cursor-pointer"
      onClick={() => navigate("/blog", { state: { data: data, id: id } })}
    >
      <img
        src={verticalPoster}
        className="w-full md:h-96 lg:h-[500px] object-cover"
      />
    </div>
  );
}

export default Blogs;
