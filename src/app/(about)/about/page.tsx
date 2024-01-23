import AboutCoverSection from "@/src/components/About/AboutCoverSection";
import Skills from "@/src/components/About/Skills";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <AboutCoverSection />
      <Skills />
      <h2 className="mt-8 font-semibold text-2xl self-start mx-20 text-dark">
        Have a project in mind? Reach out to me 📞 from{" "}
        <Link
          href="/contact"
          className="!underline underline-offset-2 text-red-700"
        >
          here
        </Link>{" "}
        and let's make it happen.
      </h2>
    </>
  );
};

export default page;
