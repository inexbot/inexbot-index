import React, { useState, useEffect } from "react";
import {Carousel,Button } from "antd";
import API from "components/API/api";
// import style from "./index.module.less";
import Banner from "./index/banner/index.jsx";
import Solution from "./index/solution/index.jsx";

function Connect(props){
  const [BannerWidth, setBannerWidth] = useState(document.body.clientWidth);
  const [BannerHeight, setBannerHeight] = useState(document.body.clientHeight);

//   window.onresize = function(){
//     setBannerWidth(document.body.clientWidth)
//     setBannerHeight(document.body.clientHeight)
//     console.log(props,"这里是子页面的props")
//   };
useEffect(()=>{
    setBannerWidth(document.body.clientWidth)
    setBannerHeight(document.body.clientHeight)
  },[document.body.clientWidth,document.body.clientHeight])
  return (
    <div>
      {/* banner图 */}
      <div className="banner"  >
        <Banner BannerHeight={BannerHeight} BannerWidth={BannerWidth} />
      </div>
      {/* 解决方案 */}
      <div className="solution"  >
        <Solution BannerHeight={BannerHeight} BannerWidth={BannerWidth} />
      </div>
    </div>
  )
}

export default Connect;