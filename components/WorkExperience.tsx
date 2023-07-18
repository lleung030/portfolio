"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import { groq } from "next-sanity";
import { sanityClient } from "@/sanity";

type Props = {
  experiences: Experience[];
};

interface Experience {
  _createdAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
  _type: "experience";
  company: string;
  companyImage: {
    src: string;
    alt: string;
  };
  dateStarted: Date;
  dateEnded: Date;
  isCurrentlyWorkingHere: boolean;
  jobTitle: string;
  points: string[];
  technologies: Technology[];
}

interface Technology {
  _type: "skill";
  image: {
    src: string;
    alt: string;
  };
  progress: number;
  title: string;
}

function WorkExperience({ experiences }: Props) {
  const [data, setData] = useState<Experience[]>([]);
  const [fetchedData, setFetchedData] = useState<Experience[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = groq`
      *[_type == "experience"] {
          ...,
          technologies[]->
      }
`;
      const fetchedData = await sanityClient.fetch(query);
      setFetchedData(fetchedData);
      // fetchedData.map((skill) => console.log(skill));
    };

    fetchData();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen flex relative overflow-hidden flex-col text-left md:flex-row max-x-full px-10 justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Experience
      </h3>
      <div
        className="w-full flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory
      scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80"
      >
        {fetchedData.map((experience) => (
          <ExperienceCard key={experience._id} experience={experience} />
        ))}
      </div>
    </motion.div>
  );
}

export default WorkExperience;
