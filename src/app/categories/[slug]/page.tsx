import { allBlogs } from "@/.contentlayer/generated";
import BlogLayoutThree from "@/src/components/Blog/BlogLayoutThree";
import Categories from "@/src/components/Blog/Categories";
import { siteMetadata } from "@/src/utils/siteMetadata";
import GithubSlugger, { slug } from "github-slugger";
import { Metadata } from "next";

type CategoryPageParams = {
  params: {
    slug: string;
  };
};

const slugger = new GithubSlugger();

export async function generateStaticParams() {
  const categories: any = [];
  const paths = [{ slug: "all" }];

  allBlogs.map((blog) => {
    if (blog.isPublished) {
      blog.tags?.map((tag) => {
        let slugified = slugger.slug(tag);
        if (!categories.includes(slugified)) {
          categories.push(slugified);
          paths.push({ slug: slugified });
        }
      });
    }
  });

  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | void> {
  return {
    title: `${params.slug.replaceAll("-", " ")} Blogs`,
    description: `Learn more about ${
      params.slug === "all" ? "Web development" : params.slug
    } from our blogs`,
  };
}

const CategoryPage = ({ params }: CategoryPageParams) => {
  const allCategories = ["all"];
  const blogs = allBlogs.filter((blog) => {
    return blog.tags?.some((tag) => {
      const slugified = slug(tag);
      if (!allCategories.includes(slugified)) {
        allCategories.push(slugified);
      }
      if (params.slug === "all") {
        return true;
      }
      return slugified === params.slug;
    });
  });
  return (
    <article className="mt-2 flex flex-col text-dark dark:text-light lg:mt-12">
      <div className=" flex flex-col px-5 sm:px-10 md:px-24 sxl:px-32">
        <h1 className="mt-6 text-2xl font-semibold md:text-4xl lg:text-5xl">
          #{params.slug}
        </h1>
        <span className="mt-2 inline-block">
          Discover more categories and expand your knowledge!
        </span>
      </div>
      <Categories categories={allCategories} currentSlug={params.slug} />
      <div className="mt-10 grid grid-cols-1 gap-8 px-8 sm:grid-cols-2 sm:gap-10 sm:px-24 lg:mt-24 lg:grid-cols-3 lg:gap-16 lg:px-32">
        {blogs.map((blog, index) => {
          return (
            <article className="relative col-span-1 row-span-1" key={index}>
              <BlogLayoutThree blog={blog} />
            </article>
          );
        })}
      </div>
    </article>
  );
};

export default CategoryPage;
