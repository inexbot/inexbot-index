
import React, { useState, useEffect } from "react";
import Header from "components/header/index.jsx";
import style from  "./index.module.less";

function App(props) {
  const [BannerWidth, setBannerWidth] = useState(document.body.clientWidth);

  window.onresize = function() {
    setBannerWidth(document.body.clientWidth);
    // setBannerHeight(document.body.clientHeight)
  };

  return (
    <div className="App">
      {/* 主页头部,Header组件*/}
      <div className={style.Header}>
        <Header BannerWidth={BannerWidth} />
      </div>
      {/* 中间内容 */}
      <div className="content">{props.children}</div>
    </div>

  );
}

export default App;
