import React, { useState, useEffect } from "react";
import API from "API/api";
import intl from "react-intl-universal";
import Header from "components/header/index.jsx";
import style from  "./index.module.less";
const locales = {
  "en-US": require("../locales/en-US.json"),
  "zh-CN": require("../locales/zh-CN.json"),
  null: require("../locales/zh-CN.json"),
};
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
  const loadLocales = () => {
    // react-intl-universal 是单例模式, 只应该实例化一次
    intl
      .init({
        currentLocale: localStorage.getItem("lang") || "zh-CN", // TODO: determine locale here
        locales,
      })
      .then(() => {
        setInitDone(true);
      });
  };
  useEffect(()=>{
    loadLocales()
  },[])

  return (
    initDone && (
      <div className="App">
        {/* 主页头部,Header组件*/}
        <div className={style.Header}>
          <Header BannerWidth={BannerWidth} />
        </div>
        {/* 中间内容 */}
        <div className="content">{props.children}</div>
        {/* {React.Children.map(props.children, child => {
           return React.cloneElement(child, { BannerWidth:BannerWidth,BannerHeight:BannerHeight })
          })}     */}
      </div>
    )
  );
}

export default App;
