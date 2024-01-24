import { LinkedinIcon, TwitterIcon, GithubIcon } from "../components/Icons";
import { siteMetadata } from "../utils/siteMetadata";

const socialLinksClasses = "hover:scale-125 transition-all ease duration-200";

export const socialLinks = [
  {
    label: "LinkedIn",
    href: siteMetadata.linkedin,
    svg: <LinkedinIcon className={socialLinksClasses} />,
  },
  {
    label: "Twitter",
    href: siteMetadata.twitter,
    svg: <TwitterIcon className={socialLinksClasses} />,
  },
  {
    label: "Github",
    href: siteMetadata.github,
    svg: <GithubIcon className={socialLinksClasses} />,
  },
];
