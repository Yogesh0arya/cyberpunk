import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useState, useRef } from "react";
import { storage, db, auth } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { CgAdd } from "react-icons/cg";
import AllPosts from "../components/AllPosts";

function MyPosts() {
  // file picker ref
  const horizontalPosterRef = useRef(null);
  const verticalPosterRef = useRef(null);
  const storyPicRef = useRef(null);
  const directorPicRef = useRef(null);

  // handle input fields
  const [userInput, setUserInput] = useState({
    moviename: "",
    details: "",
    story: "",
    director: "",
  });

  const handeInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  // handle file picker
  const [selectedFile, setSelectedFile] = useState({
    horizontalPoster: null,
    verticalPoster: null,
    storyPic: null,
    directorPic: null,
  });
  const addImageToPost = (e) => {
    const name = e.target.name;
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile({ ...selectedFile, [name]: readerEvent.target.result });
    };
  };

  // upload post to firebase
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);

    // 1) create a post a add to firestore 'posts' collection
    // 2) get the post id for newly created post
    // 3) upload the images to firebase storage with newly created post id
    // 4) get a download url from firebase storage and update to original post with image

    // 1,2
    const docRef = await addDoc(collection(db, "posts"), {
      // data to push
      username: user?.displayName,
      profileImg: user?.photoURL,
      moviename: userInput.moviename,
      details: userInput.details,
      story: userInput.story,
      director: userInput.director,
      userId: user.uid,
      timestamp: serverTimestamp(),
    });

    console.log("new doc added with id", docRef.id);

    // 3
    const imageRef1 = ref(storage, `posts/${docRef.id}/image1`);
    await uploadString(
      imageRef1,
      selectedFile.horizontalPoster,
      "data_url"
    ).then(async () => {
      // 4
      const downloadURL = await getDownloadURL(imageRef1);
      await updateDoc(doc(db, "posts", docRef.id), {
        horizontalPoster: downloadURL,
      });
    });

    const imageRef2 = ref(storage, `posts/${docRef.id}/image2`);
    await uploadString(imageRef2, selectedFile.verticalPoster, "data_url").then(
      async () => {
        // 4
        const downloadURL = await getDownloadURL(imageRef2);
        await updateDoc(doc(db, "posts", docRef.id), {
          verticalPoster: downloadURL,
        });
      }
    );

    const imageRef3 = ref(storage, `posts/${docRef.id}/image3`);
    await uploadString(imageRef3, selectedFile.storyPic, "data_url").then(
      async () => {
        // 4
        const downloadURL = await getDownloadURL(imageRef3);
        await updateDoc(doc(db, "posts", docRef.id), {
          storyPic: downloadURL,
        });
      }
    );

    const imageRef4 = ref(storage, `posts/${docRef.id}/image4`);
    await uploadString(imageRef4, selectedFile.directorPic, "data_url").then(
      async () => {
        // 4
        const downloadURL = await getDownloadURL(imageRef4);
        await updateDoc(doc(db, "posts", docRef.id), {
          directorPic: downloadURL,
        });
      }
    );

    // after uploading set loading false and selected files to null
    setLoading(false);
    setSelectedFile({
      horizontalPoster: null,
      verticalPoster: null,
      storyPic: null,
      directorPic: null,
    });
    setUserInput({
      moviename: "",
      details: "",
      story: "",
      director: "",
    });
  };

  return (
    <div className="w-screen h-screen overflow-x-hidden bg-cover bg-center bg-[url('https://www.xtrafondos.com/wallpapers/resoluciones/20/ninja-katana-sci-fi-city-neon-lights_1920x1080_5026.jpg')]">
      <div className="flex flex-col gap-2 mt-24 ml-12 md:ml-24 mr-2 md:mr-4 py-5 md:py-10 px-2 md:px-5 bg-violet-300 bg-opacity-50 max-w-screen-xl rounded-lg shadow-md">
        <div className="flex justify-center gap-1 flex-wrap items-center">
          {/* horizontal poster */}
          <div
            onClick={() => horizontalPosterRef.current.click()}
            className="bg-gradient-to-tr cursor-pointer from-pink-400 rounded-lg shadow-lg to-blue-800 text-white w-56 h-36 md:w-96 md:h-52 overflow-hidden"
          >
            {selectedFile.horizontalPoster ? (
              <img
                src={selectedFile.horizontalPoster}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center">
                <CgAdd className="w-12 h-12" />
                <button>Horizontal poster</button>
              </div>
            )}
          </div>

          {/* vertical poster */}
          <div
            onClick={() => verticalPosterRef.current.click()}
            className="cursor-pointer bg-gradient-to-tr from-pink-400 rounded-lg shadow-lg to-pink-800 text-white w-24 h-36 md:w-36 md:h-56 flex flex-col items-center justify-center overflow-hidden"
          >
            {selectedFile.verticalPoster ? (
              <img
                src={selectedFile.verticalPoster}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center">
                <CgAdd className="w-12 h-12" />
                <button>Vertical poster</button>
              </div>
            )}
          </div>

          {/* story picture */}
          <div
            onClick={() => storyPicRef.current.click()}
            className="cursor-pointer bg-gradient-to-tr from-pink-400 rounded-lg shadow-lg to-violet-800 text-white w-24 h-36 md:w-36 md:h-56 flex flex-col items-center justify-center overflow-hidden"
          >
            {selectedFile.storyPic ? (
              <img
                src={selectedFile.storyPic}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center">
                <CgAdd className="w-12 h-12" />
                <button>Story Picture</button>
              </div>
            )}
          </div>

          {/* director picture */}
          <div
            onClick={() => directorPicRef.current.click()}
            className="cursor-pointer bg-gradient-to-tr from-pink-400 rounded-lg shadow-lg to-yellow-800 text-white w-24 h-36 md:w-36 md:h-56 flex flex-col items-center justify-center overflow-hidden"
          >
            {selectedFile.directorPic ? (
              <img
                src={selectedFile.directorPic}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center">
                <CgAdd className="w-12 h-12" />
                <button>Director Picture</button>
              </div>
            )}
          </div>
        </div>

        {/* all file inputs */}
        <input
          hidden
          ref={horizontalPosterRef}
          type="file"
          name="horizontalPoster"
          id="horizontalPoster"
          onChange={addImageToPost}
          placeholder="horizontal poster"
        />
        <input
          hidden
          ref={verticalPosterRef}
          type="file"
          name="verticalPoster"
          id="verticalPoster"
          onChange={addImageToPost}
          placeholder="vertical poster "
        />
        <input
          hidden
          ref={storyPicRef}
          type="file"
          name="storyPic"
          id="storyPic"
          onChange={addImageToPost}
          placeholder="story pic"
        />
        <input
          hidden
          ref={directorPicRef}
          type="file"
          name="directorPic"
          id="directorPic"
          onChange={addImageToPost}
          placeholder="Director pic"
        />

        {/*all text inputs */}
        <input
          className="outline-none p-2 rounded-md bg-black text-white"
          onChange={handeInput}
          value={userInput.moviename}
          name="moviename"
          id="moviename"
          type="text"
          placeholder="moviename"
        />

        <textarea
          className="outline-none p-2 rounded-md bg-black text-white"
          onChange={handeInput}
          value={userInput.details}
          name="details"
          id="details"
          type="text"
          placeholder="details"
        />

        <textarea
          className="outline-none p-2 rounded-md bg-black text-white"
          onChange={handeInput}
          value={userInput.story}
          name="story"
          id="story"
          type="text"
          placeholder="story"
        />

        <textarea
          className="outline-none p-2 rounded-md bg-black text-white"
          onChange={handeInput}
          value={userInput.director}
          name="director"
          id="director"
          type="text"
          placeholder="about director"
        />
        <button
          disabled={!selectedFile.horizontalPoster}
          onClick={uploadPost}
          className="bg-red-600 text-white px-8 mx-auto py-2 mt-3 rounded-md"
        >
          {loading ? "Uploading..." : "Upload Post"}
        </button>
      </div>

      <div>
        <AllPosts />
      </div>
    </div>
  );
}

export default MyPosts;
