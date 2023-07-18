"use client";

import React, {useEffect, useState} from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroundCircles from "./BackgroundCircles";
import Link from "next/link";
// import { PageInfo } from "@/typings";
import { urlFor } from "@/sanity";
import { sanityClient } from "@/sanity";
import { groq } from "next-sanity";

type Props = {
  pageInfo: PageInfo
};

interface PageInfo {
  _createdAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
  _type: "pageInfo";
  address: string;
  backgroundInformation: string;
  email: string;
  role: string;
  heroImage: string;
  name: string;
  phoneNumber: string;
  profilePic: string;
}

function Hero({pageInfo}: Props) {
  const [data, setData] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  
  useEffect(() => {
  const fetchData = async () => {
    // Fetch data from Sanity
    const query = groq`
    *[_type == "pageInfo"][0]
`
    const fetchedData = await sanityClient.fetch(query);
    setFetchedData(fetchedData);
  };

  fetchData();
}, []);

  const [text, count] = useTypewriter({
    words: [
      `Hi, my Name is ${fetchedData.name}`,
      "Welcome to my Portfolio.tsx",
      "<!Enjoy your stay! />",
    ],
    loop: true,
    delaySpeed: 2000,
  });
  return (
    <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden">
      <BackgroundCircles />
      <img
        className="relative rounded-full h-32 w-32 mx-auto object-cover"
        // src={urlFor(pageInfo?.heroImage).url()}
        src='https://cdn.sanity.io/images/cmmr35q9/production/a49b9d7352402d3d0842b34b621656bf549fe4a1-1080x2220.png'
        // src={fetchedData?.heroImage}
        alt=""
      />
      <div className="z-20">
        <h2 className="text-sm uppercase text-gray-500 pb-2 tracking-[15px]">
          {pageInfo?.role}
        </h2>
        <h1 className="text-5xl lg:text-6xl font-semibold px-10">
          <span className="mr-3">{text}</span>
          <Cursor cursorColor="#F&AB0A" />
        </h1>
        <div className="pt-5">
          <Link href="#about">
            <button className="heroBtn">About</button>
          </Link>
          <Link href="#experience">
            <button className="heroBtn">Experience</button>
          </Link>
          <Link href="#skills">
            <button className="heroBtn">Skills</button>
          </Link>
          <Link href="#projects">
            <button className="heroBtn">Projects</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;

