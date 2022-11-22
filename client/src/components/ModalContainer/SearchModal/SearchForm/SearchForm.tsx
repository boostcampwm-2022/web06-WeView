import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { isEnterKey, isSubmitKey } from "@/utils/pressedKeyCheck";
import SearchLabel from "@/components/ModalContainer/SearchModal/SearchForm/SearchLabel/SearchLabel";
import { Label } from "@/types/search";
import { SEPARATOR } from "@/constants/search";
import { fetchPost } from "@/apis/post";
import { SearchQuery } from "@/types/post";

const SearchForm = (): JSX.Element => {
  const [word, setWord] = useState("");
  const [labels, setLabels] = useState<Label[]>([]);

  const createLabel = (word: string): Label => {
    const separator = word[0];
    const value = word.slice(1);
    const type = SEPARATOR[separator] ?? "detail";

    if (type === "detail") {
      return { type, value: word };
    }

    return { type, value };
  };

  const createSearchQuery = (inputLabels: Label[]): SearchQuery => {
    return inputLabels.reduce(
      (prev: SearchQuery, { type, value }: Label) => {
        switch (type) {
          case "tag":
            prev.tags?.push(value);
            break;
          case "category":
            prev.category = value;
            break;
          case "author":
            prev.authors?.push(value);
            break;
          case "reviews":
            prev.reviews = Number(value);
            break;
          case "likes":
            prev.likes = Number(value);
            break;
          case "detail":
            prev.detail = value;
            break;
        }
        return prev;
      },
      {
        lastId: "-1",
        tags: [],
        authors: [],
        category: "",
        reviews: 0,
        likes: 0,
        detail: "",
      }
    );
  };

  const handleLabelClick =
    (index: number): (() => void) =>
    () => {
      setLabels((labels) => labels.filter((item, idx) => idx !== index));
    };

  const handleWordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setWord(e.target.value);
  };

  const handlePressedKey = (e: KeyboardEvent<HTMLInputElement>): void => {
    const key = e.key;
    const newLabel = createLabel(word);
    if (isSubmitKey(key) && word.length > 0) {
      setLabels((labels) => [...labels, newLabel]); // <- 여기서 어떻게 전처리를 한번 해주는게?
      setWord("");
    }
    if (isEnterKey(key)) {
      fetchPost(createSearchQuery([...labels, newLabel]))
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <span className="search-form">
      {labels.map((label, index) => (
        <SearchLabel
          key={index}
          label={label}
          onClick={handleLabelClick(index)}
        />
      ))}
      <input
        type="text"
        className="search-form__input"
        placeholder="검색어를 입력해주세요."
        value={word}
        onChange={handleWordChange}
        onKeyUp={handlePressedKey}
      />
    </span>
  );
};

export default SearchForm;
