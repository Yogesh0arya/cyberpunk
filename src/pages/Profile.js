import React from "react";
import GlitchClip from "react-glitch-effect/core/GlitchClip";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";

function Profile() {
  const [user] = useAuthState(auth);

  return (
    <div className="h-screen relative w-screen overflow-hidden pt-24 pl-12 md:pl-16 bg-cover bg-center bg-[url('https://images8.alphacoders.com/516/516318.jpg')]">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl md:text-5xl font-bold px-3 py-1 -skew-x-12 bg-gray-500 text-white w-max border-r-8 border-orange-700">
          Your Robot
        </h1>
        <div className="text-white text-center mr-3 md:mr-16">
          <h1 className="text-5xl md:text-7xl font-bold">01</h1>
          <p className="px-3 bg-gray-500 text-white">LEVEL</p>
        </div>
      </div>

      {/* main content */}
      <div className="ml-1 md:ml-12 lg:ml-80 mt-12">
        <div className="flex flex-col gap-2 w-64 sm:w-80 z-10 text-white">
          <div className="bg-red-700 bg-opacity-80 px-2 sm:px-5 py-1 rounded-md flex items-center gap-2">
            <img
              src="https://png.pngtree.com/png-clipart/20191206/ourmid/pngtree-robot-icon-in-neon-style-png-image_2073035.jpg"
              className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover"
            />
            <h1>Name {user?.displayName}</h1>
          </div>
          <div className="bg-red-700 bg-opacity-80 px-2 sm:px-5 py-1 rounded-md flex items-center gap-2">
            <img
              src="https://media.istockphoto.com/vectors/red-mail-icon-neon-light-on-black-wall-vector-id1143497782?k=20&m=1143497782&s=170667a&w=0&h=5jfQ3cNsE3NENO2mPu7bAlmmNuyRaX3p_U3xZgPNeNo="
              className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover"
            />
            <h1>Email {user?.email}</h1>
          </div>
          <div className="bg-red-700 bg-opacity-80 px-2 sm:px-5 py-1 rounded-md flex items-center gap-2">
            <img
              src="https://thumbs.dreamstime.com/b/group-people-neon-glow-icon-illustration-light-sign-vector-glowing-bright-transparent-symbol-221927823.jpg"
              className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover"
            />
            <h1>Followers</h1>
          </div>
          <div className="bg-red-700 bg-opacity-80 px-2 sm:px-5 py-1 rounded-md flex items-center gap-2">
            <img
              src="https://i.pinimg.com/564x/9e/6b/af/9e6baf0dd3bd7b3049ac4f84e5bb3140.jpg"
              className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover"
            />
            <h1>Posts</h1>
          </div>

          {user && (
            <button
              className="bg-white px-3 py-1 rounded-md text-black w-max"
              onClick={() => auth.signOut()}
            >
              Sign out
            </button>
          )}
        </div>
      </div>

      <div className="absolute top-48 left-0 right-0 pl-12 md:pl-24">
        {/* cyber profile foto*/}
        <img
          src="https://media.kasperskydaily.com/wp-content/uploads/sites/36/2020/12/11145502/cyberpunk-2020-netrunner-arsenal-featured.png"
          className="absolute -right-16 top-1 w-48 md:w-96 object-contain z-10"
        />

        {/* background text */}

        <div className="flex items-center justify-between opacity-60">
          <div className="flex items-center gap-5">
            <GlitchClip>
              <img
                src="https://ksr-ugc.imgix.net/assets/032/733/748/1f056a235ed7ddf77742f1476fe5580e_original.png?ixlib=rb-4.0.2&w=680&fit=max&v=1615740255&gif-q=50&lossless=true&s=90a1ff7e873f66f24d2a4dfc44471597"
                className="h-[400px] object-contain"
              />
            </GlitchClip>
            <GlitchClip>
              <img
                src="https://b.thumbs.redditmedia.com/wc8nCXnHglYjIak07et7Waht7jY20tibNQLU5U-JqhM.jpg"
                className=""
              />
            </GlitchClip>
          </div>
          <img
            src="https://luo3ms4tlu-flywheel.netdna-ssl.com/wp-content/uploads/2021/04/devsecops-roll-in-image-02.png"
            className="animate-spin w-56"
          />
          <GlitchClip>
            <img
              src="https://abload.de/img/1q8khp.gif"
              className="w-56 mr-60"
            />
          </GlitchClip>
          <img
            src="https://luo3ms4tlu-flywheel.netdna-ssl.com/wp-content/uploads/2021/04/devsecops-roll-in-image-02.png"
            className="animate-spin w-24 mt-12"
          />
        </div>
      </div>

      {/* danger sign */}
      <img
        src="https://usercontent.one/wp/www.onono.no/wp-content/uploads/2020/06/Danger-Scavenger-logo-1280.png"
        className="absolute bottom-12 md:bottom-0 right-0 h-16 md:h-24"
      />
      {/* bottom cyberpunk yellow sign */}
      <img
        src="https://media2.giphy.com/headers/cyberpunkgame/1Z3nBiR4QZsl.png"
        className="absolute -bottom-3 sm:-bottom-8 md:-bottom-12 left-0 right-0"
      />
    </div>
  );
}
export default Profile;
