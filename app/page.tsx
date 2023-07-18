import Head from "next/head";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WorkExperience from "@/components/WorkExperience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import ContactMe from "@/components/ContactMe";
import Link from "next/link";
import { Experience, PageInfo, Skill, Project, Social } from "@/typings";
import React from 'react';


type Props = {
    pageInfo: PageInfo;
    experiences: Experience[];
    skills: Skill[];
    projects: Project[];
    socials: Social[];
}

const Home = ({ pageInfo, experiences, skills, projects, socials }: Props) => {
  return (
    <div
      className="bg-[rgb(36,36,36)] text-white h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0
    scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80"
    >
      <Head>
        <title>{pageInfo?.name} Portfolio</title>
      </Head>
      <Header socials={socials} />
      <section id="hero" className="snap-center">
        <Hero pageInfo={pageInfo}/>
      </section>
      <section id="about" className="snap-center">
        <About pageInfo={pageInfo}/>
      </section>
      <section id="experience" className="snap-center">
        <WorkExperience experiences={experiences}/>
      </section>
      <section id="skills" className="snap-start">
        <Skills skills={skills}/>
      </section>
      <section id="projects" className="snap-start">
        <Projects projects={projects}/>
      </section>
      <section id="contact" className="snap-start">
        <ContactMe />
      </section>
      <Link href="#hero">
        <footer className="sticky bottom-5 w-full cursor-pointer">
          <div className="flex items-center justify-center">
            <img
              className="h-10 w-10 rounded-full filter grayscale hover:grayscale-0 cursor-pointer"
              src="https://i.imgur.com./e2yvD64.png"
              alt=""
            />
          </div>
        </footer>
      </Link>
    </div>
  );
};

  export default Home;

