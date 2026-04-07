import HomeCoverSection from "../components/Home/HomeCoverSection";
import FeaturedPost from "../components/Home/FeaturedPost";
import RecentPost from "../components/Home/RecentPosts";
import { getAllPosts } from "@/src/content/generated";

export default async function Home() {
  const allPosts = await getAllPosts();

  return (
    <main className="flex flex-col items-center justify-center">
      <HomeCoverSection posts={allPosts} />
      <FeaturedPost posts={allPosts} />
      <RecentPost posts={allPosts} />
    </main>
  );
}
