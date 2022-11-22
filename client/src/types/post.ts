// GET /api/post API 명세를 보고 만든 타입
export interface User {
  id: string;
  nickname: string;
  profileUrl: string;
  email: string;
}

export interface Review {
  id: string;
  reviewer: User;
  content: string;
  updatedAt: string;
}

export interface Image {
  src: string;
  name: string;
}

interface AdditionalPostInfo {
  category?: string;
  likes?: number;
}

export interface PostInfo extends AdditionalPostInfo {
  id: string;
  title: string;
  content: string;
  code: string;
  language: string;
  images: Image[];
  updatedAt: string;
  author: User;
  tags: string[];
  reviews: Review[];
}

export interface PostScroll {
  posts: PostInfo[];
  lastId: number;
  isLast: boolean;
}

export interface WritingResponse {
  message: string;
}

export interface Writing {
  title: string;
  category: string;
  content: string;
  code: string;
  language: string;
  images: string[];
  tags?: string[];
}
