import Image from "next/image";
import RaulImg from "@/public/SearchRaul.png";

type SearchRaulIconProps = {
  size?: number;
};

const SearchRaulIcon = ({ size = 100 }: SearchRaulIconProps) => {
  return (
    <Image src={RaulImg} alt="Search Raul Icon" width={size} height={size} />
  );
};

export default SearchRaulIcon;
