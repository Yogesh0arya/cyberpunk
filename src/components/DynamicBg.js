import React from "react";
import Carousel from "fade-carousel";

function DynamicBg() {
  const urls = [
    "https://images.hdqwalls.com/wallpapers/smite-neon-hero-j6.jpg",
    "https://wallpaperaccess.com/full/3565069.jpg",
    "https://www.xtrafondos.com/wallpapers/resoluciones/20/ninja-katana-sci-fi-city-neon-lights_1920x1080_5026.jpg",
    "https://images.hdqwalls.com/wallpapers/neon-abyss-game-no.jpg",
    "https://cutewallpaper.org/21/cyberpunk-2077-wallpaper-3440x1440/Wallpaper-video-games,-cyberpunk,-Cyberpunk-2077-.jpg",
  ];

  const divStyle = {
    height: "100vh",
    width: "100%",
    backgroundColor: "#f2f2f2",
  };
  const imageStyle = {
    height: "100%",
    width: "100%",
    justifySelf: "center",
  };
  const hello = () => {
    console.log("hello");
  };

  return (
    <div>
      <Carousel divStyle={divStyle} delay={4000} mode={"fade"}>
        {urls.map((url, index) => (
          <div key={index} style={imageStyle}>
            <img
              src={url}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt="asdada"
              onClick={hello}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default DynamicBg;
