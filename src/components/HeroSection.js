import React from "react";
import { useStopwatch } from "react-timer-hook";
import GlitchClip from "react-glitch-effect/core/GlitchClip";
import GlitchText from "react-glitch-effect/core/GlitchText";
import Typed from "react-typed";
import DynamicBg from "./DynamicBg";

export default function HeroSection() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);
  const { seconds, minutes, hours, days } = useStopwatch({ autoStart: true });

  return (
    <>
      <div className="relative h-screen w-full overflow-hidden">
        <DynamicBg className="absolute top-0 bottom-0 left-0 right-0 z-0" />
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-20 flex flex-col items-center pr-14 justify-center text-white pb-4">
          <GlitchClip>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-extrabold">
              CYPER PUNK
            </h1>
          </GlitchClip>
          <Typed
            strings={[
              "CYBER PUNK",
              "HERE AND NOW FUTURE",
              "DIVIDE YOUR UNIQUIENESS",
            ]}
            typeSpeed={40}
            backSpeed={50}
            loop
          />
          <GlitchText>
            <h1 className="text-3xl md:text-6xl font-bold ">BLOGS</h1>
          </GlitchText>
        </div>

        <div
          className="sticky bottom-0 text-white rotate-180 justify-evenly py-24 ml-auto text-center"
          style={{ writingMode: "vertical-rl" }}
        >
          <p className="tracking-[25px] md:tracking-[30px]">MY CYBERPUNK</p>
          <h1 className="text-8xl md:text-9xl text-transparent font-extrabold bg-clip-text bg-gradient-to-l from-blue-600 to-gray-700">
            DESIGN
          </h1>
        </div>
      </div>
    </>
  );
}
