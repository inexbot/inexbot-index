import React, { useState, useEffect } from 'react';
import { useHistory } from 'umi';
import './index.module.less';

function Content(props) {
  const history = useHistory();

  useEffect(() => {
    if (props.newsContent === null) {
      return;
    }
    if (
      props.location.query.id === null ||
      props.location.query.id === undefined
    ) {
      props.setNewsListChildren(props.newsContent[0]);
    } else if (props.location.query.id === '') {
      props.setNewsListChildren(props.newsContent[0]);
      return;
    } else {
      props.newsContent.map((item, index) => {
        if (item.aid === Number(props.location.query.id)) {
          props.setNewsListChildren(item);
        }
      });
    }
  }, [props.newsContent, props.location.query]);

  return (
    <div className="newlist_children">
      <div className="title">
        {props.location.query.title ? props.location.query.title : ''}
      </div>
      <div
        className="newsContent"
        dangerouslySetInnerHTML={
          props.newsListChildren === null
            ? { __html: '<div></div>' }
            : { __html: props.newsListChildren.body }
        }
      ></div>
    </div>
  );
}

export default Content;
