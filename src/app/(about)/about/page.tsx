import AboutCoverSection from "@/src/components/About/AboutCoverSection";
import { siteMetadata } from "@/src/utils/siteMetadata";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "About Me",
  description: `Some details about me and my work @ ${siteMetadata.title}`,
};

const About = () => {
  return <AboutCoverSection />;
};

export default About;
