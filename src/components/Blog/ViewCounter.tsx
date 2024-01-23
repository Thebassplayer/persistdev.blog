"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

type ViewCounterProps = {
  slug: string;
  noCount?: boolean;
  showCount?: boolean;
};

const supabase = createClientComponentClient();
const ViewCounter = ({
  slug,
  noCount = false,
  showCount = true,
}: ViewCounterProps) => {
  const [views, setViews] = useState<number>(0);

  useEffect(() => {
    const incrementViews = async () => {
      try {
        let { error } = await supabase.rpc("increment", {
          slug_text: slug,
        });
        if (error) console.error(error);
      } catch (error) {
        console.error("An error ocurred while incrementing views: ", error);
      }
    };
    if (!noCount) incrementViews();
  }, [slug, noCount]);
  useEffect(() => {
    const getViews = async () => {
      try {
        let { data, error } = await supabase
          .from("views")
          .select("count")
          .match({ slug: slug })
          .single();

        if (error) console.error(error);

        setViews(data ? data.count : 0);
      } catch (error) {
        console.error("An error ocurred while incrementing views: ", error);
      }
    };
    getViews();
  }, [slug, , views]);
  if (showCount) {
    return <div>{views} views</div>;
  } else return null;
};

export default ViewCounter;
