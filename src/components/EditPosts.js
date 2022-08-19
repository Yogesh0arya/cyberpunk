import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa";

const EditPosts = ({ post }) => {
  const navigate = useNavigate();

  const { verticalPoster } = post.data();
  const id = post.id;

  const data = post.data();

  return (
    <div className="cursor-pointer" key={id}>
      <img
        onClick={() => navigate("/blog", { state: { data: data, id: id } })}
        src={verticalPoster}
        className="w-full md:h-96 lg:h-[500px] object-cover"
      />
      <button
        onClick={() => navigate("/editpost", { state: { data: data, id: id } })}
        className="absolute top-5 right-5 bg-white p-4 rounded-full"
      >
        <FaPen className="w-6 h-6" />
      </button>
    </div>
  );
};

export default EditPosts;
