import React, { useContext } from "react";
import { PostContext } from "@/components/main/PostScroll/Post/Post";
import TimeStamp from "@/components/commons/TimeStamp/TimeStamp";
import "./PostBody.scss";

const PostBody = (): JSX.Element => {
  const { title, content, updatedAt } = useContext(PostContext);

  return (
    <div className="post__body">
      <div className="post__body__title">
        <div className="post__body__title--title">{title}</div>
        <TimeStamp
          updatedAt={updatedAt}
          className={"post__body__title--time-stamp"}
        />
      </div>
      <div className="post__body--content">{content}</div>
    </div>
  );
};

export default PostBody;
