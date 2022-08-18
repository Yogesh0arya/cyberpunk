import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GlitchText from "react-glitch-effect/core/GlitchText";
import ParticleEffectButton from "react-particle-effect-button";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Navbar() {
  const [user, loading] = useAuthState(auth);

  const [particle, setParticle] = useState(false);
  const [anime, setAnime] = useState(false);

  useEffect(() => {
    setParticle(false);
  }, [anime]);

  const animCom = () => {
    setAnime(!anime);
  };

  const handleClick = () => {
    signInWithPopup(auth, provider);
    setParticle(true);
  };

  return (
    <>
      <div className="fixed group z-50 top-0 left-0 right-0 flex justify-between px-6 py-5 text-white bg-gradient-to-b from-purple-600/50 to-blue-900/50">
        <Link to="/">
          <GlitchText>
            <h1 className="text-xl md:text-3xl font-extrabold -skew-x-12 cursor-pointer group-hover:text-orange-500">
              CYBER{" "}
              <span className="text-orange-500 group-hover:text-white">
                PUNK
              </span>
            </h1>
          </GlitchText>
        </Link>

        {!user && (
          <div className="relative">
            <div className="absolute bg-pink-600 -inset-2 rounded-full blur" />
            <ParticleEffectButton
              color="#121019"
              hidden={particle}
              // duration={2000}
              onComplete={animCom}
            >
              <button
                onClick={handleClick}
                className="relative leading-none bg-black rounded-full px-3 py-2"
              >
                SIGN IN
              </button>
            </ParticleEffectButton>
          </div>
        )}
      </div>

      <div
        className="z-40 fixed text-white rotate-180 py-24 h-screen"
        style={{ writingMode: "vertical-rl" }}
      >
        <GlitchText>
          <div className="flex justify-between bg-black bg-opacity-50 pr-3 md:pr-6 pl-2 py-3 ">
            <Link to="/">
              <a className="cursor-pointer hover:scale-105 hover:text-orange-500">
                HOME
              </a>
            </Link>
            {user && (
              <Link to="myposts">
                <a className="cursor-pointer hover:scale-105 hover:text-orange-500">
                  MY POSTS
                </a>
              </Link>
            )}
            <Link to="profile">
              <a className="cursor-pointer hover:scale-105 hover:text-orange-500">
                PROFILE
              </a>
            </Link>
            <Link to="about">
              <a className="cursor-pointer hover:scale-105 hover:text-orange-500">
                ABOUT
              </a>
            </Link>
          </div>
        </GlitchText>
      </div>
    </>
  );
}

export default Navbar;
