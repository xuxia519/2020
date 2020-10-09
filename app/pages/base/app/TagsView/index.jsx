import React from "react";
import TagList from "./components/TagList";
import "./index.less";
import { construct } from "core-js/fn/reflect";

const TagsView = (props) => {
  return (
    <div className="tagsView-container">
      <TagList history={props.history}/>
    </div>
  );
};

export default TagsView;
