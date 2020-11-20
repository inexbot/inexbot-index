import React, { useState, useEffect } from "react";
import API from "API/api";
import intl from "react-intl-universal";
import Header from "components/header/index.jsx";
import style from  "./index.module.less";

function App(props) {
  const [BannerWidth, setBannerWidth] = useState(document.body.clientWidth);
  const [BannerHeight, setBannerHeight] = useState(document.body.clientHeight);
  const [initDone, setInitDone] = useState(false);

  // useEffect(()=>{
  //   setBannerWidth(document.body.clientWidth)
  //   console.log(document.body.clientWidth)
  // },[document.body.clientWidth])
  
  window.onresize = function(){
    setBannerWidth(document.body.clientWidth)
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
