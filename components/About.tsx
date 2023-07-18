'use client';

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

function About({pageInfo}: Props) {
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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col relative h-screen text-center md:text-left md:flex-row
    max-w-7xl px-10 justify=evenly mx-auto items-center"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        About
      </h3>

      <motion.img
        initial={{
          x: -200,
          opacity: 0,
        }}
        transition={{
          duration: 1.2,
        }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        // src={urlFor(pageInfo?.profilePic).url}
        src='https://cdn.sanity.io/images/cmmr35q9/production/7fde2088d8edad913b50931f05ab9f6c6e10eea2-2688x1512.jpg'
        className="-mb-20 md:mb-0 flex-shrink-0 w-56 h-56 rounded-full object-cover md:rounded-lg md:w-64 md:h-95 xl:w-[500px] xl:h-[600px]"
      />

      <div className="space-y-10 px-0 md:px-10">
        <h4 className="text-4xl font-semibold">
          Here is a{" "}
          <span className="underline decoration-[#F7AB0A]/50">little</span>{" "}
          background
        </h4>
        <p className="text-base">
          {fetchedData.backgroundInformation}
        </p>
      </div>
    </motion.div>
  );
}

export default About;
