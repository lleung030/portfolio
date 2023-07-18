"use client";
import React, { useEffect, useState } from "react";
import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";
import Link from "next/link";
// import { Social } from "@/typings";
import { sanityClient } from "@/sanity";
import { groq } from "next-sanity";

type Props = {
  socials: Social[];
};

interface Social {
  _createdAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
  _type: "social";
  title: string;
  url: string;
}

function Header({socials}: Props) {
  const [data, setData] = useState<Social[]>([]);
  const [fetchedData, setFetchedData] = useState<Social[]>([]);
  
  useEffect(() => {
  const fetchData = async () => {
    // Fetch data from Sanity
    const query = '*[_type == "social"]';
    const fetchedData = await sanityClient.fetch(query);
    setFetchedData(fetchedData);
  };

  fetchData();
}, []);

  return (
    <header className="sticky top-0 p-5 flex justify-between max-w-7xl mx-auto z-20 items-center">
      <motion.div
        initial={{
          x: -500,
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
        }}
        className="flex flex-row items-center"
      >
        {fetchedData.map((social) => (
        <SocialIcon
        key={social._id}
          url={social.url}
          fgColor="gray"
          bgColor="transparent"
        />
        ))}
      </motion.div>

      <motion.div
        initial={{
          x: 500,
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{ duration: 1.5 }}
        className="flex flex-row items-center text-gray-300 cursor-pointer"
      >
        <SocialIcon
          className="cursor-pointer"
          network="email"
          fgColor="gray"
          bgColor="transparent"
        />
        <Link href="#contact">
          <p className="uppercase hidden md:inline-flex text-sm text-gray-400">
            Get in touch
          </p>
        </Link>
      </motion.div>
    </header>
  );
}

export default Header;
