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
    <section className="flex w-full flex-col items-center justify-center border-b-2 border-solid border-dark text-dark dark:border-light dark:text-light md:h-[75vh] md:flex-row">
      <div className="mt-16 flex w-3/4 flex-col items-start justify-center px-16 pb-8">
        <h2 className="w-full text-center text-4xl font-bold capitalize xs:text-5xl lg:text-left sxl:text-6xl">
          Let's Connect!
        </h2>
        <ContactForm />
      </div>
    </section>
  );
};

export default Contact;
