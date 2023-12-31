"use client";
import { sanityClient } from "@/sanity";
import { Key, useEffect, useState } from "react";
import { groq } from "next-sanity";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity";
import { BrowserRouter, Link, To } from "react-router-dom";

type Props = {
  projects: Project[];
};

interface Project {
  [x: string]: To;
  _createdAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
  title: string;
  _type: "project";
  image: {
    src: string;
    alt: string;
  };
  linkToBuild: string;
  summary: string;
  technologies: Technology[];
}

interface Technology {
  _id: Key | null | undefined;
  _type: "skill";
  image: {
    src: string;
    alt: string;
  };
  progress: number;
  title: string;
}

function Projects({ projects }: Props) {
  const [data, setData] = useState<Project[]>([]);
  const [fetchedData, setFetchedData] = useState<Project[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = groq`
    *[_type == "project"] {
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
    <BrowserRouter>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="h-screen relative flex overflow-hidden flex-col text-left md:flex-row
      max-w-full justify-evenly mx-auto items-center z-0"
      >
        <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
          Projects
        </h3>

        <div
          className="relative w-full flex overflow-x-scroll overflow-y-hidden snap-x
        snap-mandatory z-20 scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80"
        >
          {fetchedData?.map((project, i) => (
            <div
            key={project._id}
              className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5
            items-center justify-center p-20 md:p-44 h-screen"
            >
              <Link to={project.linkedToBuild}>
                <motion.img
                  // initial={{ y: -300, opacity: 0 }}
                  // transition={{ duration: 1.2 }}
                  viewport={{ once: true }}
                  src={urlFor(project?.image).url()}
                  alt=""
                />

                <div className="space-y-4 px-0 md:px-10 max-w-6xl">
                  <h4 className="text-4xl font-semibold text-center">
                    <span className="underline decoration-[#F7Ab0A]/50">
                      Case Study {i + 1} of {fetchedData.length}:
                    </span>{" "}
                    {project?.title}
                  </h4>

                  <div className="flex items-center space-x-2 justify-center">
                    {project?.technologies.map((technology) => (
                      <img
                        className="h-10 w-5"
                        key={technology._id}
                        src={urlFor(technology.image).url()}
                      />
                    ))}
                  </div>
                  <p className="text-lg text-center md:text-left">
                    {project?.summary}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="w-full absolute top-[30%] bg-[#F7AB0A]/10  left-0 h-[500px] -skew-y-12"></div>
      </motion.div>
    </BrowserRouter>
  );
}

export default Projects;
