"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { sanityClient, urlFor } from "@/sanity";
import { groq } from "next-sanity";
type Props = {
  experience: Experience;
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

function ExperienceCard({ experience }: Props) {
  const [data, setData] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);

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
    };

    fetchData();
  }, []);
  return (
    <article
      className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0
    w-[500px] md:w-[600px] xl:w-[900px] snap-center bg-[#292929] p-10 hover:opacity-100 opacity-40
    cursor-pointer transition-opacity duration-200 overflow-hidden"
    >
      <motion.img
        initial={{
          y: -100,
          opacity: 0,
        }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px]
      object-cover object-center"
        src={urlFor(experience?.companyImage).url()}
        alt=""
      />
      <div className="px-0 md:px-10">
        <h4 className="text-4xl font-light">
          Software Engineer Intern of Volt Equity
        </h4>
        <p className="font-bold text-2xl mt-1">Volt Equity</p>
        <div className="flex space-x-2 my-2">
          {experience.technologies.map((technoloy) => (
            <img
              key={technoloy._id}
              className="h-10 w-10 rounded-full"
              src={urlFor(technoloy.image).url()}
            />
          ))}
        </div>
        <p className="uppercase py-5 text-gray-300">
          {new Date(experience.dateStarted).toDateString()} - {" "} 
          {experience.isCurrentlyWorkingHere
            ? "Present"
            : new Date(experience.dateEnded).toDateString()}
        </p>
        <ul className="list-disc space-y-4 ml-5 text-lg max-h-96 pr-5 overflow-y-scroll scrollbar-thin scrollbar-track-black scrollbar-thumb-[#F7AB0A]/80">
          {/* {fetchedData.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))} */}
        </ul>
      </div>
    </article>
  );
}

export default ExperienceCard;
