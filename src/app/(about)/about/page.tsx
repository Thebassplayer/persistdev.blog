import AboutCoverSection from "@/src/components/About/AboutCoverSection";
import Skills from "@/src/components/About/Skills";
import { siteMetadata } from "@/src/utils/siteMetadata";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "About Me",
  description: `Some details about me and my work @ ${siteMetadata.title}`,
};

const About = () => {
  return (
    <>
      <AboutCoverSection />
      <Skills />
      <h2 className="mx-20 mt-8 self-start text-2xl font-semibold text-dark">
        Have a project in mind? Reach out to me 📞 from{" "}
        <Link
          href="/contact"
          className="text-red-700 !underline underline-offset-2"
        >
          here
        </Link>{" "}
        and let's make it happen.
      </h2>
    </>
  );
};

export default About;
