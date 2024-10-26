import GithubSlugger, { slug } from "github-slugger";
import Category from "./Category";
import { allPosts } from "@/.contentlayer/generated";

type CategoriesProps = {
  categories: any;
  currentSlug: string;
};

const slugger = new GithubSlugger();

export async function generateStaticParams() {
  const categories: any = [];
  const paths = [{ slug: "all" }];

  allPosts.map((blog) => {
    if (blog.isPublished) {
      blog.tags?.map((tag) => {
        let slugified = slugger.slug(tag);
        console.log(slugified);
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
    <div className="mx-5 mt-10 flex flex-wrap items-start border-b-2 border-t-2 border-solid border-dark px-0 py-4 font-medium text-dark dark:border-light dark:text-light md:mx-10 md:px-10 xl:px-20">
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
