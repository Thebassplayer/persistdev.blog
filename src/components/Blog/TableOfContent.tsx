import { Blog } from "@/.contentlayer/generated";

type Heading = {
  level: "one" | "two" | "three" | "four" | "five" | "six";
  slug: string;
  text: string;
};

type TableOfContentProps = {
  blog: Blog;
};

const TableOfContent = ({ blog }: TableOfContentProps) => {
  return (
    <details
      className="sticky top-24 overflow-hidden overflow-y-auto rounded-lg border border-solid border-dark p-4 text-dark dark:border-light dark:text-light md:max-h-[80vh]"
      open
    >
      <summary className="ont-semibold cursor-pointer text-lg capitalize">
        Table of Content
      </summary>
      <ul className="mt-4 font-in text-base">
        {blog?.toc.map((heading: Heading) => {
          return (
            <li key={`#${heading.slug}`} className="py-1">
              <a
                href={`#${heading.slug}`}
                data-level={heading.level}
                className="flex  items-center justify-start border-solid border-dark/40 text-sm data-[level=two]:border-t data-[level=three]:pl-4 data-[level=two]:pl-0 data-[level=two]:pt-2 sm:text-base  sm:data-[level=three]:pl-6 md:text-lg"
              >
                {heading.level === "three" ? (
                  <span className="mr-2 flex h-1 w-1 rounded-full bg-dark">
                    &nbsp;
                  </span>
                ) : null}

                <span className="hover:underline">{heading.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </details>
  );
};

export default TableOfContent;
