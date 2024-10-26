import { allPosts } from "contentlayer/generated";
import HomeCoverSection from "../components/Home/HomeCoverSection";
import FeaturedPost from "../components/Home/FeaturedPost";
import RecentPost from "../components/Home/RecentPosts";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <HomeCoverSection posts={allPosts} />
      <FeaturedPost posts={allPosts} />
      <RecentPost posts={allPosts} />
    </main>
  );
}
