import Image from "next/image";
import React from "react";
import profileCharacter from "@/public/AI-Roy.png";

const AboutCoverSection = () => {
  return (
    <section className="flex w-full flex-col items-center justify-center border-b-2 border-solid border-dark text-dark dark:border-light dark:text-light md:h-[75vh] md:flex-row">
      <div className="flex h-[400px] w-full flex-row items-center border-r-2 border-solid border-dark dark:border-light md:w-1/2">
        <Image
          src={profileCharacter}
          alt="Roy codign in a laptop computer"
          className="h-full w-4/5 object-contain object-center xs:w-3/4 md:w-full"
          sizes="(max-width: 768px) 100vw,(max-width: 1180px) 50vw, 50vw"
        />
      </div>
      <div className="pb-a1 flex w-full flex-col items-start justify-center px-5 text-left xs:p-10 md:w-1/2 lg:px-16">
        <h2 className="text-center text-4xl font-bold capitalize xs:text-5xl lg:text-left sxl:text-6xl">
          Dream Big, Work Hard, Achieve More!
        </h2>
        <p className="mt-4 text-base font-medium capitalize">
          This Mantra Drives My Work As A Passionate Freelancer. I Blend
          Innovative Technology With Timeless Design For Captivating Digital
          Experiences. Inspired By Nature And Literature, I'm A Perpetual
          Learner Embracing Challenges. With Each Project, I Aim To Leave A
          Lasting Impact—One Pixel At A Time.
        </p>
      </div>
    </section>
  );
};

export default AboutCoverSection;
