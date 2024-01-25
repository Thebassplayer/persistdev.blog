type DescriptionProps = {
  description: string;
};

const Description = ({ description }: DescriptionProps) => {
  return (
    <p className="mt-4 md:tex-lg sm:inline-block hidden lg:text-xl font-in">
      {description}
    </p>
  );
};

export default Description;
