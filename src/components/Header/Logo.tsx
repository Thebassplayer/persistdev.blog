import Image from "next/image";
import Link from "next/link";
import profileImg from "@/public/AI-Roy.png";

const Logo = () => (
  <Link href={"/"} className="flex items-center text-dark dark:text-light">
    <div className="mr-2 w-12 overflow-hidden rounded-full border border-solid border-dark dark:border-light md:mr-4 md:w-16">
      <Image
        src={profileImg}
        alt="Roy Lopez"
        className="h-auto w-full rounded-full"
      />
    </div>
    <span className="text-lg font-bold md:text-xl">Persist.dev</span>
  </Link>
);
export default Logo;
