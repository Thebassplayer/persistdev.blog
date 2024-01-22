import LottieAnimation from "./LottieAnimation";

const Contact = () => {
  return (
    <section className="w-full h-[75hv] border-b-2 border-solid border-dark flex flex-row items-center justify-center text-dark ">
      <div className="inline-block w-2/5 h-full border-r-2 border-solid border-dark">
        <LottieAnimation />
      </div>
      <div className="w-3/5 flex flex-col items-start justify-center px-16 pb-8">
        <h2 className="font-bold capitalize text-4xl">Let's Connect!</h2>
      </div>
    </section>
  );
};

export default Contact;
