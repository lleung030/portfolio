// "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import { Skill } from "@/typings";
// import { urlFor } from "@/sanity";

// type Props = {
//   skill: Skill;
//   directionLeft?: boolean;
// };

// function Skill({ skill, directionLeft }: Props) {
//   return (
//     <div className="group relative flex cursor-pointer">
//       <motion.img
//         initial={{
//           x: directionLeft ? -200 : 200,
//           opacity: 0,
//         }}
//         transition={{ duration: 1 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         src={urlFor(skill?.image).url()}
//         className="rounded-full border border-gray-500 object-cover w-24 h-24 md:w-28 md:h-28 xl:w-32
//         xl:h-32 filter group-hover:grayscale transition duration-300 ease-in-out"
//       />
//       <div className="absolute opacity-0 group-hover:opacity-80 transition duration-300
//       ease-in-out group-hover:bg-white h-24 w-24 md:w-28 md:h-28 xl:w-32 xl:h-32 rounded-full z-0">
//         <div className="flex items-center justify-center h-full">
//             <p className="text-3xl font-bold text-black opacity-100">{skill.progress}%</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Skill;

"use client";
import { sanityClient } from "@/sanity";
import React, { useEffect, useState } from "react";
import { groq } from "next-sanity";
import { motion } from "framer-motion";
// import { Skill } from "@/typings";
import { urlFor } from "@/sanity";
import imageUrlBuilder from '@sanity/image-url';

type Props = {
  skill: Skill;
  directionLeft?: boolean;
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

function Skillset({ skill, directionLeft }: Props) {
  const [data, setData] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = groq`
    *[_type == "skill"] 
`;
      const fetchedData = await sanityClient.fetch(query);
      setFetchedData(fetchedData);
      console.log(fetchedData)
    };

    fetchData();
  }, []);
    
  return (
    <div className="group relative flex cursor-pointer">
      <motion.img
        initial={{
          x: directionLeft ? -200 : 200,
          opacity: 0,
        }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, x: 0 }}
        src={urlFor(skill?.image).url()}
        className="rounded-full border border-gray-500 object-cover w-24 h-24 md:w-28 md:h-28 xl:w-32
        xl:h-32 filter group-hover:grayscale transition duration-300 ease-in-out"
      />
      <div
        className="absolute opacity-0 group-hover:opacity-80 transition duration-300
      ease-in-out group-hover:bg-white h-24 w-24 md:w-28 md:h-28 xl:w-32 xl:h-32 rounded-full z-0"
      >
        <div className="flex items-center justify-center h-full">
          <p className="text-3xl font-bold text-black opacity-100">
            {skill.progress}%
          </p>
        </div>
      </div>
    </div>
  );
}

export default Skillset;
