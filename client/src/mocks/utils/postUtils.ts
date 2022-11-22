import { SearchQuery } from "@/types/search";
import { Review } from "@/types/post";

export const parsePostQueryString = (url: URL): any => {
  const searchQuery: SearchQuery = {
    tags: [],
    authors: [],
    category: "",
    reviews: 0,
    likes: 0,
    detail: "",
  };

  const tags = url.searchParams.get("tags");
  if (tags !== null) {
    searchQuery.tags?.push(...tags.split(","));
  }

  const authors = url.searchParams.get("authors");
  if (authors !== null) {
    searchQuery.authors?.push(...authors.split(","));
  }

  const category = url.searchParams.get("category") ?? "";
  searchQuery.category = category;

  const reviews = url.searchParams.get("reviews") ?? 0;
  searchQuery.reviews = Number(reviews);

  const likes = url.searchParams.get("likes") ?? 0;
  searchQuery.likes = Number(likes);

  const detail = url.searchParams.get("") ?? "";
  searchQuery.detail = detail;

  return searchQuery;
};

export const review = (id: number): Review => ({
  id: String(id),
  reviewer: {
    id: String((id + 12345) % 100),
    nickname: "reviewer-name",
    profileUrl: "",
    email: "",
  },
  content: "",
  updatedAt: "2022-11-16 12:26:56.124939",
});
