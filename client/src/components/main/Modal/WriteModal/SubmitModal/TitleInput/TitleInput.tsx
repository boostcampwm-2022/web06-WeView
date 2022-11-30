import React, { ChangeEvent, useCallback } from "react";
import "./TitleInput.scss";
import useWritingStore from "@/store/useWritingStore";

const TitleInput = (): JSX.Element => {
  const { title, setTitle } = useWritingStore((state) => ({
    title: state.title,
    setTitle: state.setTitle,
  }));

  const changeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  return (
    <div className="title">
      <label className="title__label" htmlFor="title">
        제목
      </label>
      <input
        id="title"
        className="title__input"
        value={title}
        onChange={changeTitle}
      />
    </div>
  );
};

export default TitleInput;
