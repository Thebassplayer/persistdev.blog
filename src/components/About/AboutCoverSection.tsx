import Image from "next/image";
import React from "react";

const AboutCoverSection = () => {
  return (
    <section className="flex w-full flex-col items-center justify-center border-b-2 border-solid border-dark text-dark dark:border-light dark:text-light md:h-[75vh] md:flex-row">
      <div className="flex h-[400px] w-full flex-row items-center justify-center border-r-2 border-solid border-dark dark:border-light md:w-1/2">
        <Image
          src={
            "https://res.cloudinary.com/dukkbmkvk/image/upload/v1712087374/persistdev.blog/uh9yenwaj89rsvi91td9.png"
          }
          alt="Roy codign in a laptop computer"
          className="h-full w-4/5 object-contain object-center xs:w-3/4 md:w-full"
          sizes="(max-width: 768px) 100vw,(max-width: 1180px) 50vw, 50vw"
          width={500}
          height={500}
        />
      </div>
      <div className="pb-a1 flex w-full flex-col items-start justify-center px-5 text-left xs:p-10 md:w-1/2 lg:px-16">
        <h2 className="text-center text-2xl font-bold xs:text-4xl lg:text-left sxl:text-6xl">
          Never stop learning, because life never stops teaching.
        </h2>
        <p className="mt-4 text-base font-medium">
          Hello! I´m Roy Lopez, a software engineer and web developer from
          Buenos Aires, Argentina. I´m passionate about technology and I love to
          learn new things every day. I´m always looking for new challenges and
          opportunities to grow as a professional.
        </p>
        <p className="my-4 text-base font-medium">
          Hope you enjoy my blog and find it useful. If you have any questions
          or suggestions, feel free to reach out to me. I´ll be happy to help
          you.
        </p>
      </div>
    </section>
  );
};

export default AboutCoverSection;
