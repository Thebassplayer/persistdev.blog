import { socialLinks } from "@/src/constants/SOCIAL_LINKS";

const SocialLinks = () => {
  return (
    <div className="mt-8 flex items-center">
      {socialLinks.map(({ label, href, svg }, index) => (
        <a
          href={href}
          key={`${label}-${index}`}
          className={`mr-4 inline-block h-6 w-6 transition-transform duration-200 hover:scale-125 ${
            label === "Github" ? "fill-light dark:fill-dark" : ""
          }`}
          aria-label={`Link to ${label}`}
        >
          <span className="sr-only">{label}</span>
          {svg}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
