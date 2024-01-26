type DescriptionProps = {
  description: string;
};

const Description = ({ description }: DescriptionProps) => {
  return (
    <p className="md:tex-lg mt-4 hidden font-in sm:inline-block lg:text-xl">
      {description}
    </p>
  );
};

export default Description;
