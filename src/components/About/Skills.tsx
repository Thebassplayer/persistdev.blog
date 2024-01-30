const SkillList = [
  "next.js",
  "tailwind css",
  "figma",
  "javaScript",
  "web design",
  "Gatsby.js",
  "strapi",
  "firebase",
  "generative AI",
  "wireframing",
  "SEO",
  "framer motion",
  "sanity",
];

const Skills = () => {
  return (
    <section className="flex w-full flex-col border-b-2 border-solid border-dark p-5 text-dark dark:border-light dark:text-light xs:p-10 sm:p-12 md:p-16 lg:p-20">
      <span className="text-lg font-semibold text-accent dark:text-accentDark sm:text-3xl md:text-4xl">
        I'm confortanble in...
      </span>
      <ul className="mt-8 flex flex-wrap justify-center xs:justify-start">
        {SkillList.map((skill, index) => (
          <li
            key={index}
            className="ease mb-3 mr-3 inline-block cursor-pointer rounded border-2 border-solid border-dark px-4 py-2 text-base font-semibold capitalize transition-all duration-200 hover:scale-105 dark:border-light dark:font-normal xs:mb-4 xs:mr-4 xs:px-6 xs:py-3 xs:text-lg sm:px-8 sm:py-4 sm:text-xl md:mb-6 md:mr-6 md:text-2xl lg:px-12 lg:py-5"
          >
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;
