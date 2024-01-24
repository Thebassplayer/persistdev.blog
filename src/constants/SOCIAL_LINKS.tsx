import { LinkedinIcon, TwitterIcon, GithubIcon } from "../components/Icons";
import { siteMetadata } from "../utils/siteMetadata";

export const socialLinks = [
  {
    label: "LinkedIn",
    href: siteMetadata.linkedin,
    svg: <LinkedinIcon />,
  },
  {
    label: "Twitter",
    href: siteMetadata.twitter,
    svg: <TwitterIcon />,
  },
  {
    label: "Github",
    href: siteMetadata.github,
    svg: <GithubIcon />,
  },
];
