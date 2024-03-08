import React, { useEffect, useState } from "react";
import { useTransition, animated } from "@react-spring/web";

import Carousel from "../Carousel/Carousel";

import "./Hero.css";

const SLIDES = [
  "/CFA257BE-F157-4E3A-BF8C-646AFA88FA88_1_105_c.jpeg", 
  "/DE34CCA0-DF95-42C7-BD01-F4522C322F73_1_105_c.jpeg",
  "/0EA57283-F78F-4B2A-AE70-9A7E52D967EA_1_201_a.jpeg",
  "/857365E9-58A1-4164-90DD-B02014AA3FD1_1_105_c.jpeg"
];

const Hero = () => {
  const [showHeading, setShowHeading] = useState(false);

  // const [containerHeight, setContainerHeight] = useState('100vh');

  const transitions = useTransition([showHeading], {
    from: { opacity: 0, transform: "translateY(-50px)" },
    enter: { opacity: 1, transform: "translateY(0)" },
    leave: { opacity: 0, transform: "translateY(-50px)" },
    config: { duration: 1000 },
    keys: (heading) => heading,
  });

  // useEffect(() => {
  //   setShowHeading(true);
  //   const adjustHeight = () => {
  //       const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
  //       setContainerHeight(`calc(100vh - ${navbarHeight}px)`);
  //     };
  //     adjustHeight();
  //     window.addEventListener('resize', adjustHeight);
  
  //     return () => window.removeEventListener('resize', adjustHeight);
  // }, []);

  useEffect(() => {
    setShowHeading(true);
  }, []);

  return (
    <div className="hero-container" 
    // style={{ height: containerHeight, overflow: 'auto' }}
    >
      {transitions((styles, heading) => {
        return (
          <animated.div style={styles} key={heading}>
            {heading && (
              <div className="">
                <h2 className="hero-heading">
                Chart Your Path, Share Your Journey.
                </h2>
                <h4 className="hero-subheading">
                Unite, Explore, Discover: Collaboration Fuels Adventure.
                </h4>
              </div>
            )}
          </animated.div>
        );
      })}
      {/* <div className="carousel-container">
      <Carousel slides={SLIDES}/>
      </div> */}
    </div>
  );
};

export default Hero;
