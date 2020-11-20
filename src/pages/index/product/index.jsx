import React, { useState, useEffect } from "react";
import API from "components/API/api";
import style from "./index.module.less";
import banner3 from "images/banner3.jpg";

function Product(props){
  

  return(
    <div className={style.product} style={{padding:`0 ${(props.BannerWidth-1280)/2}px`}}>
      <div className={style.product_top}>
        <p> 产品中心 </p>
        <p> PRODUCT </p>
      </div>
      <p> 我们期待，未来每一台机器人的背后，都有纳博特的技术 </p>
    </div>
  )
}

export default Product;