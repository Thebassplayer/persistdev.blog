import Image from "next/image";
import Link from "next/link";
import profileImg from "@/public/AI-Roy.png";
import { cx } from "@/src/utils/cx";

type LogoProps = {
  showNavBar: boolean;
};

const Logo = ({ showNavBar }: LogoProps): JSX.Element => (
  <Link
    href={"/"}
    className="flex cursor-pointer items-center text-dark dark:text-light"
  >
    <div
      className={cx(
        "ease mr-2 overflow-hidden rounded-full border border-solid border-dark shadow-[rgba(0,_0,_0,_0)_0px_0px_8px]  shadow-light transition-all duration-300 dark:border-light lg:mr-4 lg:w-16",
        showNavBar ? "w-8" : "w-12",
      )}
    >
      <Image
        src={profileImg}
        alt="Roy Lopez"
        className="h-auto w-full rounded-full"
        sizes="33vw"
        priority
      />
    </div>
    <span
      className={cx(
        "text-base font-bold shadow-light transition-transform duration-300 ease-in-out text-shadow dark:text-shadow-none md:text-sm lg:text-xl",
        showNavBar ? "text-transparent" : "",
      )}
    >
      PersistDev.blog
    </span>
  </Link>
);
export default Logo;
