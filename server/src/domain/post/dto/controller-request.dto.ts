import { Query } from '@nestjs/common';
import {
  IsInt,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class WriteDto {
  title: string;
  content: string;
  category: string;
  code: string;
  language: string;
  images: string[];
  tags: string[];
}

export class InqueryDto {
  @IsInt()
  @Min(-1, {
    message: 'lastId는 -1과 Post의 인덱스만 입력 가능합니다',
  })
  lastId: number;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @Transform(({ value }) => {
    value = value.slice(1, -1);
    let x = value.split(',');
    x = x.map((y) => y.slice(1, -1));
    return x;
  })
  tags?: string[];

  @IsOptional()
  // @Transform(({ value }) => value.split(','))
  authors?: string[];

  @IsOptional()
  @IsInt({
    message: '정수만 입력 가능합니다',
  })
  @Min(1, {
    message: '리뷰 개수 1개 이상부터 검색 가능합니다',
  }) //0인 경우는 해당 옵션을 쓸 필요가 없음
  writtenAnswer?: number;

  @IsOptional()
  @Min(1, {
    message: '추천수 1개 이상부터 검색 가능합니다',
  }) //0인 경우는 해당 옵션을 쓸 필요가 없음
  scores?: number;

  @IsOptional()
  @Transform(({ value }) => value.trim())
  search?: string;
}
