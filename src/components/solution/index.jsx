import React, { useState, useEffect } from "react";
import {Carousel,Button } from "antd";
import API from "API/api";
import style from "./index.module.less";


function Solution(props){

  return(
    <div className={style.solution} style={{padding:`0 ${(props.BannerWidth-1280)/2}px`}}>
      <div className={style.solution_top}>
        <p> 解决方案 </p>
        <p> solution </p>
        <p> 我们期待，未来每一台机器人的背后，都有纳博特的技术 </p>
      </div>
    </div>
  )
}

export default Solution