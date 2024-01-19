import { LinkedinIcon, TwitterIcon, GithubIcon } from "../components/Icons";

const socialLinksClasses = "hover:scale-125 transition-all ease duration-200";

export const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/roylopezdev/",
    svg: <LinkedinIcon className={socialLinksClasses} />,
  },
  {
    label: "Twitter",
    href: "https://twitter.com/roylopezdev",
    svg: <TwitterIcon className={socialLinksClasses} />,
  },
  {
    label: "Github",
    href: "https://github.com/Thebassplayer",
    svg: <GithubIcon className={socialLinksClasses} />,
  },
];
