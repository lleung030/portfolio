"use client";

import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";

type Props = {};

function Hero({}: Props) {
  const [text, count] = useTypewriter({
    words: [
      "Hi, my Name is Lucas",
      "I am a Software Developer",
      "...Software Engineer",
      "...Full Stack Developer",
    ],
    loop: true,
    delaySpeed: 2000,
  });
  return (
    <div>
      <h1>
        <span>{text}</span>
        <Cursor cursorColor="#F&AB0A" />
      </h1>
    </div>
  );
}

export default Hero;
