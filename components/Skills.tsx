"use client";
import { sanityClient } from "@/sanity";
import { useEffect, useState } from "react";
import { groq } from "next-sanity";
import React from "react";
import { motion } from "framer-motion";
import { Skill as SkillType } from "@/typings";
import Skillset from "./Skill";
import imageUrlBuilder from "@sanity/image-url";

type Props = {
  skills: SkillType[];
};

interface Skill {
  _createdAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
  _type: "skill";
  image: {
    src: string;
    alt: string;
  };
  progress: number;
  title: string;
}

function Skills({ skills }: Props) {
  const [data, setData] = useState<Skill[]>([]);
  const [fetchedData, setFetchedData] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = groq`
    *[_type == "skill"] 
`;
      const fetchedData = await sanityClient.fetch(query);
      setFetchedData(fetchedData);
      // fetchedData.map((skill) => console.log(skill));
    };

    fetchData();
  }, []);

  // Function to build the image URL
  const builder = imageUrlBuilder(sanityClient);
  const imageUrl = (image: { asset: { _ref: string } }) => {
    return builder.image(image).url();
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen flex relative flex-col text-center md:text-left
  xl:flex-row max-w-[2000px] xl:px-10 min-h-screen justify-center xl:space-y-0 mx-auto items-center"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Skills
      </h3>
      <h3 className="absolute top-36 uppercase tracking-[3px] text-gray-500 text-sm">
        Hover over a skill for current proficiency
      </h3>

      <div className="grid grid-cols-4 gap-5">
        {fetchedData.map((skill) => (
          <Skillset key={skill._id} skill={skill}          
          />
        ))}
      </div>
    </motion.div>
  );
}

export default Skills;
