type DescriptionProps = {
  description: string;
};

const Description = ({ description }: DescriptionProps) => {
  return <p className="inline-block mt-4 text-xl font-in">{description}</p>;
};

export default Description;
