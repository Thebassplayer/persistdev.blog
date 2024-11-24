import Image from "next/image";
import RaulImg from "@/public/SearchRaul.png";

const SearchRaulIcon = () => {
  return (
    <Image src={RaulImg} alt="Search Raul Icon" width={100} height={100} />
  );
};

export default SearchRaulIcon;
