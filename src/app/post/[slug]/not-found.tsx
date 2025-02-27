import SearchRaulIcon from "@/src/components/SearchRaulIcon/SearchRaulIcon";

const NotFound = () => {
  return (
    <div className="*:font-mono flex grow flex-col items-center justify-center gap-2">
      <SearchRaulIcon size={150} />
      <h1 className=" text-white">404 - Page not found</h1>
      <a href="/" className="text-blue-400">
        Return Home
      </a>
    </div>
  );
};

export default NotFound;
