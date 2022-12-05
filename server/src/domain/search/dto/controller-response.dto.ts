import { SearchHistory } from '../search-history.mongo';

export class searchHistoryDto {
  tags: string[];

  reviewCount: number;

  likeCount: number;

  details: string[];

  updatedAt: Date;

  constructor(entity: SearchHistory) {
    this.tags = entity.tags;
    this.reviewCount = entity.reviewCount;
    this.likeCount = entity.likeCount;
    this.details = entity.details;
    this.updatedAt = entity.updatedAt;
  }
}