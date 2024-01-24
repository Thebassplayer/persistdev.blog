import ContactForm from "@/src/components/Contact/ContactForm";
import LottieAnimation from "../../../components/Contact/LottieAnimation";
import { Metadata } from "next";
import { siteMetadata } from "@/src/utils/siteMetadata";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact me for any queries or project idea @ ${siteMetadata.email}`,
};

const Contact = (): JSX.Element => {
  return (
    <section className="w-full h-[75hv] border-b-2 border-solid border-dark flex flex-row items-center justify-center text-dark ">
      <div className="inline-block w-1/4 h-[400px] border-r-2 border-solid border-dark">
        <LottieAnimation />
      </div>
      <div className="w-3/4 flex flex-col items-start justify-center px-16 pb-8">
        <h2 className="font-bold capitalize text-6xl w-full text-center">
          Let's Connect!
        </h2>
        <ContactForm />
      </div>
    </section>
  );
};

export default Contact;
