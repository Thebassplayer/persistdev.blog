"use client";
import { useEffect, useState } from "react";

type ViewCounterProps = {
  slug: string;
  noCount?: boolean;
  showCount?: boolean;
};

if (!process.env.NEXT_PUBLIC_VIEWS_API) {
  throw new Error("NEXT_PUBLIC_VIEWS_API is not defined");
}

const viewsApi = process.env.NEXT_PUBLIC_VIEWS_API;

const ViewCounter = ({
  slug,
  noCount = false,
  showCount = true,
}: ViewCounterProps) => {
  const [views, setViews] = useState<number>(0);

  useEffect(() => {
    const incrementViews = async () => {
      try {
        const response = await fetch(viewsApi, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug }),
        });

        if (response.ok) {
          const data = await response.json();
          setViews(data.count);
        }
      } catch (error) {
        console.warn("Unable to increment views.", error);
      }
    };

    if (!noCount) incrementViews();
  }, [slug, noCount]);

  useEffect(() => {
    const getViews = async () => {
      try {
        const response = await fetch(`${viewsApi}?slug=${slug}`, {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          setViews(data.count);
        }
      } catch (error) {
        console.warn("Unable to fetch views.", error);
      }
    };

    getViews();
  }, [slug]);

  if (showCount) {
    return <div>{views} views</div>;
  } else return null;
};

export default ViewCounter;
