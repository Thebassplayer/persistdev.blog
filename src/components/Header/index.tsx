import Logo from "./Logo";
import { socialLinks } from "@/src/constants/SOCIAL_LINKS";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="w-full p-4 px-5 sm:px-10 flex items-center justify-between">
      <Logo />
      <Nav />
      <div>
        {socialLinks.map(({ label, href, svg }, index) => (
          <a
            href={href}
            key={`${label}-${index}`}
            className="inline-block h-6 w-6 mr-4"
          >
            {svg}
          </a>
        ))}
      </div>
    </header>
  );
};

export default Header;
