import React, { useRef, useState } from "react";
import "./PopularBlogs.scss";
import { useNavigate } from "react-router-dom";

const size = 3;

function useTilt(active) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current || !active) {
      return;
    }

    const state = {
      rect: undefined,
      mouseX: undefined,
      mouseY: undefined,
    };

    let el = ref.current;

    const handleMouseMove = (e) => {
      if (!el) {
        return;
      }
      if (!state.rect) {
        state.rect = el.getBoundingClientRect();
      }
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
      const px = (state.mouseX - state.rect.left) / state.rect.width;
      const py = (state.mouseY - state.rect.top) / state.rect.height;

      el.style.setProperty("--px", px);
      el.style.setProperty("--py", py);
    };

    el.addEventListener("mousemove", handleMouseMove);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
    };
  }, [active]);

  return ref;
}

const initialState = {
  slideIndex: 0,
};

const slidesReducer = (state, event) => {
  if (event.type === "NEXT") {
    return {
      ...state,
      slideIndex: (state.slideIndex + 1) % size,
    };
  }
  if (event.type === "PREV") {
    return {
      ...state,
      slideIndex: state.slideIndex === 0 ? size - 1 : state.slideIndex - 1,
    };
  }
};

function Slide({ slide, offset }) {
  const active = offset === 0 ? true : null;
  const ref = useTilt(active);

  const navigate = useNavigate();
  return (
    <div
      onClick={() =>
        navigate("/blog", { state: { data: slide.data(), id: slide.id } })
      }
      ref={ref}
      className="slide cursor-pointer"
      data-active={active}
      style={{
        "--offset": offset,
        "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1,
      }}
    >
      <div
        // className="slideBackground"
        style={{
          backgroundImage: `url('${slide.verticalPoster}')`,
        }}
      />
      <div
        className="slideContent"
        style={{
          backgroundImage: `url('${slide.data().verticalPoster}')`,
        }}
      >
        <div className="slideContentInner">
          <h2 className="slideTitle">{slide.data().moviename}</h2>
          {/* <h3 className="slideSubtitle">{slide.subtitle}</h3> */}
          <p className="slideDescription line-clamp-2">
            {slide.data().details}
          </p>
        </div>
      </div>
    </div>
  );
}

function PopularBlogs({ posts }) {
  const [state, dispatch] = React.useReducer(slidesReducer, initialState);

  const popularData = posts.slice(0, size);
  // console.log(popularData);

  return (
    <div className="slides">
      <button onClick={() => dispatch({ type: "NEXT" })}>???</button>

      {[...popularData, ...popularData, ...popularData].map((slide, i) => {
        let offset = popularData.length + (state.slideIndex - i);
        return <Slide slide={slide} offset={offset} key={i} />;
      })}
      <button onClick={() => dispatch({ type: "PREV" })}>???</button>
    </div>
  );
}

export default PopularBlogs;
