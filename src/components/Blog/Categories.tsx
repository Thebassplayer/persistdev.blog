import GithubSlugger, { slug } from "github-slugger";
import Category from "./Category";
import { allBlogs } from "@/.contentlayer/generated";

type CategoriesProps = {
  categories: any;
  currentSlug: string;
};

const slugger = new GithubSlugger();

export async function generateStaticParams() {
  const categories: any = [];
  const paths = [{ slug: "all" }];

  allBlogs.map(blog => {
    if (blog.isPublished) {
      blog.tags?.map(tag => {
        let slugified = slugger.slug(tag);
        if (!categories.includes(slugified)) {
          categories.push(slugified);
          paths.push({
            slug: slugified,
          });
        }
      });
    }
  });
  return paths;
}

const Categories = ({ categories, currentSlug }: CategoriesProps) => {
  return (
    <div className="px-0 md:px-10 xl:px-20 mt-10 border-t-2 text-dark dark:text-light border-b-2 border-solid border-dark dark:border-light py-4 flex items-start flex-wrap font-medium mx-5 md:mx-10">
      {categories.map((category: any) => {
        const isCurrentSlug = currentSlug === slug(category);
        return (
          <Category
            key={category}
            name={category}
            link={`/categories/${category}`}
            active={isCurrentSlug}
          />
        );
      })}
    </div>
  );
};

export default Categories;
