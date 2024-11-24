import { Post } from "@/.contentlayer/generated";
import { FuseResult } from "fuse.js";

const highlightText = (
  fuseSearchResults: FuseResult<Post>[],
  highlightClassName: string = "bg-accent dark:bg-accentDark dark:text-dark",
  minMatchLength: number = 3, // Add this parameter
) => {
  const generateHighlightedText = (
    inputText: string,
    regions: [number, number][] = [],
  ) => {
    let content = "";
    let nextUnhighlightedRegionStartingIndex = 0;

    regions.forEach(([start, end]) => {
      // Only highlight if the match length is greater than or equal to minMatchLength
      if (end - start + 1 >= minMatchLength) {
        content += [
          inputText.substring(nextUnhighlightedRegionStartingIndex, start),
          `<span class="${highlightClassName}">`,
          inputText.substring(start, end + 1),
          "</span>",
        ].join("");
        nextUnhighlightedRegionStartingIndex = end + 1;
      }
    });

    content += inputText.substring(nextUnhighlightedRegionStartingIndex);
    return content;
  };

  return fuseSearchResults
    .filter(({ matches }) => matches && matches.length)
    .map(({ item, matches }) => {
      const highlightedItem: any = { ...item };
      matches?.forEach((match) => {
        if (match?.key) {
          highlightedItem[match.key as keyof Post] = generateHighlightedText(
            match.value || "",
            match.indices as [number, number][],
          );
        }
      });
      return highlightedItem;
    });
};

export const getHighlightedContent = (
  fuseSearchResults: FuseResult<Post>[],
  contentKey: string,
) => {
  const highlightedResults = highlightText(fuseSearchResults);

  return highlightedResults.map((result) => {
    const highlightedContent = result[contentKey];
    if (highlightedContent) {
      return (
        <span
          key={result._id || result.title} // Ensure a unique key
          dangerouslySetInnerHTML={{ __html: highlightedContent }}
        />
      );
    }
    return null;
  });
};
